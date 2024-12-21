import { instance } from "../api/axios.api";
import { CreateEvent, Event, UserEvent} from "../models/models";

export const EventService ={

    async RegisterUser(eventId: number): Promise<any> {
        const { data } = await instance.post(
            'events/register', 
            JSON.stringify(eventId), // Сериализация данных
            {
                headers: {
                    'Content-Type': 'application/json', // Укажите ожидаемый тип контента
                },
            }
        );
        return data;
    },

    async CheckOutUser(eventId: number): Promise<any> {
        const { data } = await instance.post(
            'events/checkOut', 
            JSON.stringify(eventId), // Сериализация данных
            {
                headers: {
                    'Content-Type': 'application/json', // Укажите ожидаемый тип контента
                },
            }
        );
        return data;

        return data;
    },

    async GetOpenedEvents(): Promise<Event[]>{
        const {data} = await instance.get('events/open');      
        return data;
    },

  async CreateEvent(event : CreateEvent): Promise<any>{
    const {data} = await instance.post('events', event);      
    return data;
},

async GetUserEvents(): Promise<UserEvent[]>{
    const {data} = await instance.get('events/user');      
    return data;
},


}