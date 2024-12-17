export interface Point {
    Lon: number;
    Lat: number;
}

export interface MapInterface {
    routeInfo: {titleRoute: string, descriptionRoute: string};
    points: Point[];
    setClickLocation: (coord: { lat: number; lon: number }) => void;
    isGetLocation: boolean;
    setIsGetLocation: (b: boolean) => void;
}

export interface RouteTitle {
    id: string;
    text: string;
  }

export interface Route{
    Id: number;
    Title: string;
    Description:string;
    Distance: string;
    CreateDate: Date;
    IsPublic: boolean;
    UserId: number;
    Points: Point[];
}
export interface UpdateRoute{
    Id: number;
    Title: string;
    Description:string;
    Distance: string;
    CreateDate: Date;
    IsPublic: boolean;
    UserId: number;
}

export interface CreateRoute{
    Title: string;
    Description:string;
    Distance: string;
    CreateDate: Date;
    IsPublic: boolean;
    UserId: number;
    Points: Point[];
}

export interface RouteAlias{
    id:number;
    title: string;
    createDate: string;
}

export interface PointRouteInfo {
    lon: string;
    lat: string;
}

export interface FullInfoRoute{
    id: number
    title: string;
    description:string;
    distance: string;
    createDate: string;
    isPublic: boolean;
    userId: number;
    isLike: boolean;
    points: PointRouteInfo[];
}


export interface FavoriteRoute{
    userId: number;
    routeId: number;
}

export interface RegisterUser{
    Email: string;
    Name: string;
    Password: string;
}

export interface LoginUser{
    email: string;
    password: string;
}

export interface User{
    name: string;
    email: string;
    role: number;
    id: number;
}
