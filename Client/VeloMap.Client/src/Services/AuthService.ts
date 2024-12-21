import { instance } from "../api/axios.api";
import { LoginUser, RegisterUser, User } from "../models/models";

export const AuthService ={

    async registerUser(
      registerUser: RegisterUser ): Promise<any>{
      const {data} = await instance.post('auth/register', registerUser);      
      return data;
  },

  async loginUser(loginUser: LoginUser): Promise<User> {
    const { data } = await instance.get('auth/login', {
        params: loginUser,
    });
    return data;
    },

    async logout(): Promise<any> {
        const { data } = await instance.get('auth/logout');
        return data;
    },

    async getProfile() : Promise<User | undefined> {
        const {data} = await instance.get<User>('auth/profile')
        if(data) return data
    },
}