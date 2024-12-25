import { FC, useEffect, useState } from "react";
import "../../styles/RoutesAdminPage.css";
import { UserEvent } from "../../models/models";
import { EventService } from "../../Services/EventService";
import { toast } from "react-toastify";
import "../../styles/EventsAdminPage.css";

const EventsAdminPage: FC = () => {
    const [events, setEvents] = useState<UserEvent[]>([]);
    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchAllEvents = async () => {
    setIsLoading(true);
    try {
      const data = await EventService.GetAllEvents();
      setEvents(data);
    } catch (error) {
      toast.error("Error loading events");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id: number) => {
    EventService.DeleteEvent(id)
      .then(() => {
        setIsUpdate(!isUpdate);
        toast.success("Event deleted successfully");
      })
      .catch(() => {
        toast.error("Error deleting event");
      });
  };

  const handleAccept = (id: number) => {
    EventService.AcceptEvent(id)
      .then(() => {
        setIsUpdate(!isUpdate);
        toast.success("Event accepted successfully");
      })
      .catch(() => {
        toast.error("Error accepting event");
      });
  };

  useEffect(() => {
    fetchAllEvents();
  }, [isUpdate]);

  return (
    <div className="events-admin">
      <div className="events-admin__container">
        <h2 className="events-admin__header">Admin Events</h2>
        {isLoading ? ( 
          <div className="loading-indicator">Loading...</div> 
        ) : (
          <ul className="events-admin__list">
            {events.map((event) => (
              <li key={event.id} className="events-admin__list-item">
                <h3 className="events-admin__list-item-title">{event.title}</h3>
                <p className="events-admin__list-item-description">
                  <strong>Description:</strong> {event.description}
                </p>
                <p className="events-admin__list-item-location">
                  <strong>Location:</strong> {event.location}
                </p>
                <p className="events-admin__list-item-time">
                  <strong>Start Time:</strong> {event.startTime}
                </p>
                <p className="events-admin__list-item-capacity">
                  <strong>Capacity:</strong> {event.capasity}
                </p>
                <p className="events-admin__list-item-count">
                  <strong>Participants:</strong> {event.count}
                </p>
                <p className="events-admin__list-item-status">
                  <strong>Accepted:</strong> {event.isAccepted ? "Yes" : "No"}
                </p>
                <div className="events-admin-buttons-container">
                  {event.isAccepted ? null : (
                    <button
                      onClick={() => handleAccept(event.id)}
                      className="events-admin__accept-button"
                    >
                      Accept
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="events-admin__delete-button"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EventsAdminPage;
