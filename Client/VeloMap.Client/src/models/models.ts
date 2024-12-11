export interface RouteObj {
    lon: number;
    lat: number;
}

export interface MapInterface {
    routeObjs: RouteObj[];
    setClickLocation: (coord: { lat: number; lon: number }) => void;
    isGetLocation: boolean;
    setIsGetLocation: (b: boolean) => void;
}

export interface Route {
    id: string;
    text: string;
  }