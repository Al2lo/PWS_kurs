import { FC, useEffect, useRef, useState } from "react";
import { Event } from "../../models/models";
import EventComponent from "../../components/Event";
import "../../styles/Event.css"

const EventPage: FC = () => {
    const [page, setPage] = useState<number>(0); 
    const [events, setEvents] = useState<Event[]>([
        {
            id: 1,
            title: "Cycling Marathon",
            description: "A fun cycling event for all ages.",
            location: "Central Park",
            startTime: "2023-12-20T10:00:00",
            ownerId: 2,
            capacity: 100,
            isAccepted: true,
        },
        {
            id: 2,
            title: "Yoga in the Park",
            description: "Join us for a peaceful yoga session.",
            location: "Downtown Park",
            startTime: "2023-12-22T08:00:00",
            ownerId: 3,
            capacity: 50,
            isAccepted: false,
        },
        {
            id: 2,
            title: "Yoga in the Park",
            description: "Join us for a peaceful yoga session.",
            location: "Downtown Park",
            startTime: "2023-12-22T08:00:00",
            ownerId: 3,
            capacity: 50,
            isAccepted: false,
        },
        {
            id: 2,
            title: "Yoga in the Park",
            description: "Join us for a peaceful yoga session.",
            location: "Downtown Park",
            startTime: "2023-12-22T08:00:00",
            ownerId: 3,
            capacity: 50,
            isAccepted: false,
        },
    ]);

    return (
        <div className="event-container">
            <div className="filters-container">Events:</div>

            <div className="events-block">
                {events.slice(page * 3, 3 * page + 3).map((event) => (
                    <EventComponent event={event} />
                ))}
            </div>

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
            
            <div className="create-event">
                <button className="create-event">Create Event</button>
            </div>
        </div>
    );
};

export default EventPage;