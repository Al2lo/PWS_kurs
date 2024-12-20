import React, { useEffect, useState } from "react";
import {Event} from '../models/models'
import { EventService } from "../Services/EventService";
import { toast } from "react-toastify";

interface EventBlockProps {
  event: Event;
}

const EventComponent: React.FC<EventBlockProps> = ({ event }) => {
  const [isRegiser, setIsRegister] = useState<boolean>(event.participant);
  const [freePlace, setFreePlace] = useState<boolean>(false);

  const unregister = () => {
    EventService.CheckOutUser(event.id)
    .then(() => {
      setIsRegister(false);
      toast.success("You success check out of" + event.title);
    })
    .catch((e) => {
      toast.error(e)
    })
  }

  const register = () => {
    EventService.RegisterUser(event.id)
    .then(() => {
      setIsRegister(true);
      toast.success("You success register on" + event.title);
    })
    .catch((e) => {
      toast.error(e)
    })
  };

  useEffect(()=>{
    if(event.count == event.capasity && isRegiser == false)
      setFreePlace(false);
    else if(event.count == event.capasity && isRegiser == true)
      setFreePlace(true);
    else if(event.count < event.capasity)
      setFreePlace(true);
  }, [isRegiser])

  return (
    <div key={event.id} className="event-card">
      <h3>{event.title}</h3>
      <p>{event.description}</p>
        <p>
          <strong>Location:</strong> {event.location}
        </p>
        <p>
          <strong>Starts at:</strong> {new Date(event.startTime).toLocaleString()}
        </p>
        <p>
          <strong>capasity:</strong> {event.count}/{event.capasity}
        </p>
        <div className="event-buttons-container">
          <p className="status-text"><strong>{!isRegiser ? 'UNREGISTER': 'REGISTER'}</strong></p>
          {freePlace 
          ? <button className="button-register"
              onClick={isRegiser ? () =>{unregister()} : () => {register()}}>{isRegiser ? 'Unregister': 'Register'}
            </button> 
          : null
          }
        </div>
    </div>
  );
};

export default EventComponent;