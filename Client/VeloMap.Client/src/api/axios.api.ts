import axios from 'axios'

export const instance = axios.create({
    baseURL: 'https://localhost:7076/api',
    withCredentials: true,
})