import React, { useEffect, useState } from "react";
import {Event} from '../models/models'
import { EventService } from "../Services/EventService";
import { toast } from "react-toastify";
import { UserService } from "../Services/UserService";

interface EventBlockProps {
  event: Event;
  updateEvents: () => void;
}

const EventComponent: React.FC<EventBlockProps> = ({ event, updateEvents }) => {
  const [isRegiser, setIsRegister] = useState<boolean>(event.participant);
  const [freePlace, setFreePlace] = useState<boolean>(false);
  const [ownerName, setOwnerName] = useState<string>("");

  const unregister = () => {
    EventService.CheckOutUser(event.id)
    .then(() => {
      setIsRegister(false);
      updateEvents();
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
      updateEvents();
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
  }, [event])


  useEffect(() => {
    const getUserName = async (userId: number) => {
      try{
        var userName = await UserService.getUserName(userId);
        setOwnerName(userName)
      }
      catch(e){
        toast.error("user not found");
        console.log(e)
      }
    }
    
    getUserName(event.ownerId);
  }, [])

  return (
    <div key={event.id} className="event-card">
      <h3>{event.title}</h3>
      <p>{event.description}</p>
        <p>
          <strong>Location:</strong> {event.location}
        </p>
        <p>
          <strong>Owner name:</strong> {ownerName}
        </p>
        <p>
          <strong>Start at:</strong> {new Date(event.startTime).toLocaleString()}
        </p>
        <p>
          <strong>Capacity:</strong> {event.count}/{event.capasity}
        </p>
        <div className="event-buttons-container">
          <p className="status-text">STATUS: <strong>{!isRegiser ? 'Unregister': 'Register'}</strong></p>
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