import React, { useState, ChangeEvent, FormEvent } from "react";
import "../styles/CreateEvent.css"

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

const CreateEventButton: React.FC = () => {
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

    return (
        <div className="create-event-container">
            <button
                className={`create-event-button ${isFormVisible ? "moved-down" : ""}`}
                onClick={toggleForm}
            >
                {isFormVisible ? "Оставить заявку" : "Создать событие"}
            </button>
            {isFormVisible && (
                <form className="event-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Название события:</label>
                        <input
                            type="text"
                            name="title"
                            value={eventData.title}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Описание:</label>
                        <textarea
                            name="description"
                            value={eventData.description}
                            onChange={handleInputChange}
                            required
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label>Локация:</label>
                        <input
                            type="text"
                            name="location"
                            value={eventData.location}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Время начала:</label>
                        <input
                            type="datetime-local"
                            name="startTime"
                            value={eventData.startTime}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Количество мест:</label>
                        <input
                            type="number"
                            name="capacity"
                            value={eventData.capacity}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="submit-button">
                            Отправить
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default CreateEventButton;
