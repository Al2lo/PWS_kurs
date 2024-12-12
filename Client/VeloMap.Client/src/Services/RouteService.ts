import { instance } from "../api/axios.api";
import { Route } from "../models/models";

export const RouteService ={

    async createRoute(
        routeData: Route
    ): Promise<any>{
        const {data} = await instance.post('routes', routeData);
        return data;
    }
}