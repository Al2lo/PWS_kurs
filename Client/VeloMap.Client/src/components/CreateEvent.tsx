import React, { useState, ChangeEvent, FormEvent } from "react";
import "../styles/CreateEvent.css"
import { EventService } from "../Services/EventService";
import { toast } from "react-toastify";

interface EventData {
    id: string;
    title: string;
    description: string;
    location: string;
    startTime: string;
    ownerId: string;
    capacity: string;
    isAccepted: boolean;
}

interface ModalProps {
    updateEvents: () => void;
}

const CreateEventButton: React.FC<ModalProps> = ({updateEvents}) => {
    const [isFormVisible, setFormVisible] = useState<boolean>(false);
    const [eventData, setEventData] = useState<EventData>({
        id: "",
        title: "",
        description: "",
        location: "",
        startTime: "",
        ownerId: "",
        capacity: "",
        isAccepted: false,
    });


    const toggleForm = () => {
        setFormVisible(!isFormVisible);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEventData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Event Created:", eventData);
        setEventData({
            id: "",
            title: "",
            description: "",
            location: "",
            startTime: "",
            ownerId: "",
            capacity: "",
            isAccepted: false,
        });
        setFormVisible(false);
    };

    const CreateEvent = () => {
        const createEventAsync = async () => {
            
            if(eventData.title.trim().length === 0 ||
             eventData.description.trim().length === 0 || 
             eventData.location.trim().length === 0 ||
             eventData.startTime == null ||
             isNaN(Number(eventData.capacity)) ||
             Number(eventData.capacity) == 0)
                return

            let createEventDto = {
                Title: eventData.title,
                Description: eventData.description,
                Location: eventData.location,
                StartTime: new Date(eventData.startTime),
                Capasity: Number(eventData.capacity)
            }

            await EventService.CreateEvent(createEventDto)
            .then(()=>{
                toggleForm();
                updateEvents();
                toast.success("Youre request has been sent");
            })
            .catch(() => {
                toast.error("Error when you create event")
            })
        }
       
        createEventAsync();
    }

    return (
        <div className="create-event-container">
            <button
                className={`create-event-button ${isFormVisible ? "moved-down" : ""}`}
                onClick={toggleForm}
            >
                {isFormVisible ? "Hidden" : "Create Event"}
            </button>
            {isFormVisible && (
                <form className="event-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="event-form-label">Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={eventData.title}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={eventData.description}
                            onChange={handleInputChange}
                            required
                            rows={6}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label>Location:</label>
                        <input
                            type="text"
                            name="location"
                            value={eventData.location}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Date start:</label>
                        <input
                            type="datetime-local"
                            name="startTime"
                            value={eventData.startTime}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Capacity:</label>
                        <input
                            type="number"
                            name="capacity"
                            value={eventData.capacity}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="submit-button" onClick={() => CreateEvent()}>
                            Send
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default CreateEventButton;
