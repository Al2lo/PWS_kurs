import { FC, useEffect, useRef, useState } from "react";
import { Event } from "../../models/models";
import EventComponent from "../../components/Event";
import "../../styles/Event.css"
import CreateEvent from "../../components/CreateEvent";
import { EventService } from "../../Services/EventService";
import { toast } from "react-toastify";

const EventPage: FC = () => {
    const [page, setPage] = useState<number>(0); 
    const [events, setEvents] = useState<Event[]>([]);
    const [updateEventRef, setUpdateEventRef] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handleUpdateEvents = () => {
        setUpdateEventRef(!updateEventRef);
    };

    useEffect( () => {
        const fetchEvents = async () => {
            setIsLoading(true)
            try{
                var data = await EventService.GetOpenedEvents();
                console.log(data)
                setEvents(data);
            }
            catch(e){
                toast.error('error: ' + e)
            }
            finally{
                setIsLoading(false)
            }
        }

        fetchEvents();
    }, [updateEventRef])

    return (
        <div className="event-container">
            <div className="filters-container">Events:</div>

            {isLoading ? ( 
          <div className="loading-indicator">Loading...</div> 
        ) : (
            <div className="events-block">
                {events.slice(page * 3, 3 * page + 3).map((event) => (
                    <EventComponent event={event} updateEvents={handleUpdateEvents} />
                ))}
            </div>
        )}

            <div className="buttons-scroll-container">
                <button 
                    className="scroll-button scroll-left" 
                    onClick={() => setPage(page - 1)} 
                    disabled={page === 0}
                    >
                    &#8592;
                </button>
                <button 
                    className="scroll-button scroll-right" 
                    onClick={() => setPage(page + 1)}
                    disabled={(page + 1) * 3 >= events.length}
                    >
                    &#8594;
                </button>
            </div>
            
           <CreateEvent updateEvents={handleUpdateEvents}></CreateEvent>
        </div>
    );
};

export default EventPage;