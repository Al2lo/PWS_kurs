import { useEffect, useState } from "react";
import { User, UpdateUserDto, UserEvent, RouteAlias } from "../../models/models";
import "../../styles/ProfilePage.css"
import { useUser } from "../../hooks/userHooks";
import { UserService } from "../../Services/UserService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateUser } from "../../store/user/userSlice";
import { EventService } from "../../Services/EventService";
import { RouteService } from "../../Services/RouteService";

const ProfilePage: React.FC = () => {
    const dispatch = useDispatch();
    const user = useUser();
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [chacherUser, setChangerUser] = useState<{email: string, name: string}>({name: "", email: ""});
    const [events, setEvents] = useState<UserEvent[]>([]);
    const [routes, setRoutes] = useState<RouteAlias[]>([]);

    const handleChange = (field: keyof User, value: string) => {
        setChangerUser((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const updateUserAsync =(updatedUserDto: UpdateUserDto) =>{
        UserService.updateUser(updatedUserDto)
        .then(()=>{
            if(user != null)
            {
                dispatch(updateUser({
                    name:   chacherUser.name,
                    email: chacherUser.email,
                    role: user.role,
                    id: user.id,
                }))
                toast.success("Profile was changed")
            }
        })
        .catch((e)=>{
            let erroeMessage = JSON.parse(e.response.data).Message;
            if(erroeMessage == null)
                toast.error('error')

            toast.error(JSON.parse(e.response.data).Message)
        })
    }
    
    const toggleEdit = () => {
        if(isEditing)
        {
            updateUserAsync({Name: chacherUser.name, Email: chacherUser.email});
        }
        setIsEditing(!isEditing);
    };

    useEffect(() =>{
        const fetchEventsAsync = async () => {
            try{
                const data = await EventService.GetUserEvents();
                setEvents(data);
            }
            catch(e)
            {
                let erroeMessage = JSON.parse(e.response.data).Message;
                console.log(erroeMessage);
            }
        }

        const fetchRoutesAsync = async () => {
            try{
                if(user != null)
                {
                    const data = await RouteService.getMyRoutes(user.id);
                    setRoutes(data);
                }
            }
            catch(e)
            {
                let erroeMessage = JSON.parse(e.response.data).Message;
                console.log(erroeMessage);
            }
        }

        if(user != null)
            setChangerUser({email: user.email, name: user.name});

        fetchEventsAsync();
        fetchRoutesAsync();
    }, []);

    return (
        user == null ? null : 
        <div className="profile-page">
                {/* Левая часть: список маршрутов */}
                <div className="profile-page__sidebar">
                    <h3 className="profile-page__section-title">Your Routes: </h3>
                    <ul className="profile-page__list">
                        {routes.map((route) => (
                            <li className="profile-page__list-item" key={route.id}>
                                <h4 className="profile-page__list-item-title">Title: <span className="profile-info-span">{route.title}</span></h4>
                                <h6 className="profile-page__list-item-description">Create date: <span className="profile-info-span">{route.createDate}</span></h6>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Центральная часть: список событий */}
                <div className="profile-page__main">
                    <h3 className="profile-page__section-title">Your Events:</h3>
                    <ul className="profile-page__list">
                        {events.map((event) => (
                           <li className="profile-page__list-item" key={event.id}>
                           <h4 className="profile-page__list-item-title">Title: <span className="profile-info-span">{event.title}</span></h4>
                           <h6 className="profile-page__list-item-description">Description: <span className="profile-info-span">{event.description}</span></h6>
                           <h6 className="profile-page__list-item-description">Start time: <span className="profile-info-span">{event.startTime}</span></h6>
                           <h6 className="profile-page__list-item-description">Capacity: <span className="profile-info-span">{event.count}/{event.capasity}</span></h6>
                           <h6 className="profile-page__list-item-description">You participant: <span className="profile-info-span">{event.participant ? "Yes" : "No"}</span></h6>
                           <h6 className="profile-page__list-item-description">Accepted : <span className="profile-info-span">{event.isAccepted ? "Yes" : "No"}</span></h6>
                       </li>
                        ))}
                    </ul>
                </div>

                {/* Правая часть: информация о пользователе с редактированием */}
                <div className="profile-page__profile-info">
                    <h3 className="profile-page__section-title">User Information</h3>
                    <div className="profile-page__field">
                        <label className="profile-page__label">
                            Name:
                                <span className="profile-page__value">{user.name}</span>
                        </label>
                    </div>
                    <div className="profile-page__field">
                        <label className="profile-page__label">
                            Email:
                                <span className="profile-page__value">{user.email}</span>
                        </label>
                    </div>
                    {isEditing ? null : (<button className="profile-page__button" onClick={toggleEdit}>
                        {isEditing ? "Save" : "Edit"}
                    </button>)}
                    {isEditing ? 
                    (<div className="update-profile-container">
                        <label className="profile-page__label">Name: </label>
                        <input
                            className="profile-page__input"
                            type="text"
                            value={chacherUser.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                        />
                        <label className="profile-page__label">Email: </label>
                        <input
                            className="profile-page__input"
                            type="email"
                            value={chacherUser.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                        />

                         <button className="profile-page__button" onClick={toggleEdit}>
                        {isEditing ? "Save" : "Edit"}
                    </button>
                    </div>) : null}
                </div>
        </div>
    );
};

export default ProfilePage;
