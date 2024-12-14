import { instance } from "../api/axios.api";
import { FullInfoRoute, Route, RouteAlias } from "../models/models";

export const RouteService ={

    async createRoute(
        routeData: Route
    ): Promise<any>{
        const {data} = await instance.post('routes', routeData);
        return data;
    },

    async updateRoute(
        routeData: Route
    ): Promise<any>{
        const {data} = await instance.put('routes', routeData);
        return data;
    },

    async getMyRoutes(userId: number): Promise<RouteAlias[]> {
        const { data } = await instance.get('routes/user', {
          params: {
            userId: userId,
          },
        });
        return data;
      },

      async getPublicRoutes(): Promise<RouteAlias[]> {
        const { data } = await instance.get('routes/public', {
        });
        return data;
      },

      async getFavoriteRoutes(userId: number): Promise<RouteAlias[]> {
        const { data } = await instance.get('routes/favorities', {
          params: {
            userId: userId,
          },
        });
        return data;
      },
      
      async getRoute(id: number, userId: number): Promise<FullInfoRoute> {
        const { data } = await instance.get('routes', {
          params: {
            id: id,
            userId: userId,
          },
        });
        return data;
      }
}