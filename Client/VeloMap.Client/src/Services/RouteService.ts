import { instance } from "../api/axios.api";
import { CreateRoute, FavoriteRoute, FullInfoRoute, UpdateRoute, RouteAlias, Comment, CreateCommentDto } from "../models/models";

export const RouteService ={

    async createRoute(
        routeData: CreateRoute
    ): Promise<{id: number}>{
        const {data} = await instance.post('routes', routeData);
        return data;
    },

    async updateRoute(
        routeData: UpdateRoute
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
      },

      async createFavoriteRoute(
        favoriteRoute: FavoriteRoute
    ): Promise<any>{
        const {data} = await instance.post('routes/favorite', favoriteRoute);
        return data;
    },

    async deleteFavoriteRoute(
      favoriteRoute: FavoriteRoute
  ): Promise<any>{
      const {data} = await instance.delete('routes/favorite', {
        params: {
          UserId: favoriteRoute.userId,
          RouteId: favoriteRoute.routeId
        },
      });      
      return data;
  },

  async deleteRoute( routeId: number): Promise<any>{
    const {data} = await instance.delete('routes', {
      params: {
        routeId: routeId 
      },
    });      
    return data;
},

async getComments(routeId: number): Promise<Comment[]> {
  const { data } = await instance.get(`routes/${routeId}/comments`,);
  return data;
},
  
async createComments(routeId: number, comment: CreateCommentDto): Promise<any> {
  const { data } = await instance.post(`routes/${routeId}/comments`, comment);
  return data;
},
}