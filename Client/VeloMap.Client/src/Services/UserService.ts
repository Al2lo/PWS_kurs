import { instance } from "../api/axios.api";
import { AdminUsers, UpdateUserDto } from "../models/models";

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
    },

    async GetAllUsers() : Promise<AdminUsers[]> {
        const { data } = await instance.get('users/all');
        return data
    },

    async BlockUser(userId: number, block: boolean) : Promise<string> {
        console.log(userId)
        console.log(block)
        const { data } = await instance.put('users/block',null, {
            params: {
                userId: userId,
                block: block
            },
        });
        return data
    },

    async DeleteUser(userId: number) : Promise<string> {
        const { data } = await instance.delete('users', {
            params: {userId},
        });
        return data
    },

}