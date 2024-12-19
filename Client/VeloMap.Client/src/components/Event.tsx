import React from "react";
import {Event} from '../models/models'

interface EventBlockProps {
  event: Event;
}

const EventComponent: React.FC<EventBlockProps> = ({ event }) => {
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
          <strong>Capacity:</strong> {event.capacity}
        </p>
        <p>
          <strong>Status:</strong> {event.isAccepted ? "Accepted" : "Pending"}
        </p>
    </div>
  );
};

export default EventComponent;