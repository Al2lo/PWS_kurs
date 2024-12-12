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
    Title: string;
    Description:string;
    Distance: string;
    CreateDate: Date;
    IsPublic: boolean;
    UserId: number;
    Points: Point[];
}


