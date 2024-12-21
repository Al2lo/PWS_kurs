import { instance } from "../api/axios.api";
import { UpdateUserDto } from "../models/models";

export const UserService ={
    async getUserName(userId: number) : Promise<string> {
        const { data } = await instance.get('users', {
            params: {userId},
        });
        return data
    },

    async updateUser(user: UpdateUserDto) : Promise<any> {
        const { data } = await instance.put('users', user );
        return data
    }
}