export interface RouteObj {
    lon: number;
    lat: number;
}

export interface MapInterface {
    userLocation: RouteObj;
    routeObjs: RouteObj[];
}