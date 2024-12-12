import { FC, useRef, useState } from "react";
import MyMap from "../components/Map";
import '../styles/HomeStyles.css';
import Button from "../components/Button";
import createRouteImg from '../assets/createRoute.png';
import completeRouteImg from '../assets/completeRoutes.png';
import CreateRoute from "../components/CreateRoute";
import { Point, RouteTitle } from "../models/models";
import GetRoute from "../components/GetRoute";



const HomePage: FC = () => {
    const [isModalCreateRouteOpen, setIsModalCreateRouteOpen] = useState(false);
    const [isModalGetRouteOpen, setIsModalGetRouteOpen] = useState(false);
    const [inputRoutes, setInputRoutes] = useState<RouteTitle[]>([{id: "1", text: "fdsf"}, {id: "2", text: "fdsf"}]);
    const [inputRoutesLoc, setInputRoutesLoc] = useState<Point[]>([{ Lat: 53.906, Lon: 27.5308 }, { Lat: 53.706, Lon: 27.1308 }]);
    const idInputRouteRef = useRef("");
    const [isGetLocation, setIsGetLocation] = useState<boolean>(false);
    const [titleRoute, setTitleRoute] = useState<string>("");
    const [descriptionRoute, setDescriptionRoute] = useState<string>("");

    const openModal = () => setIsModalCreateRouteOpen(true);
    const closeModal = () => setIsModalCreateRouteOpen(false);  
    const openModalGetRoute = () => setIsModalGetRouteOpen(true);
    const closeModalGetRoute = () => setIsModalGetRouteOpen(false); 

    const setIdInputRoute = (id: string) => {
        console.log('Setting idInputRoute:', id);
        idInputRouteRef.current = id;
        console.log(idInputRouteRef.current)
      };

    const GetIsOpenCreateRouteModal = () => {
        console.log('sfd')
        console.log(isModalCreateRouteOpen)
        console.log(isGetLocation)
        if(isModalCreateRouteOpen && isGetLocation)
            return false;

        if(isModalCreateRouteOpen && !isGetLocation)
            return true;

        if(!isModalCreateRouteOpen)
            return false;

        return false;
    }

    const setClickLocation = (coord: { lat: number; lon: number }) => {
        console.log('location')
        console.log(isGetLocation)
        let strAddress = coord.lat + ", " + coord.lon;

        setInputRoutes((inputRoutes) =>
            inputRoutes.map((route) =>
              route.id === idInputRouteRef.current ? { ...route, text: strAddress} : route
            )
          );

        setIsGetLocation(false);
    }

    const getRouteCoord = async () => {
        try {
            setInputRoutesLoc([]); // Очищаем только один раз перед началом процесса
            console.log('length: ' + inputRoutesLoc.length);
    
            const promises = inputRoutes.map(async (router) => {
                const address = router.text;
                console.log(address);
    
                if (!address.trim()) {
                    throw new Error("Адрес не может быть пустым.");
                }
    
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`
                );
    
                if (!response.ok) {
                    throw new Error(`Ошибка запроса: ${response.status}`);
                }
    
                const data = await response.json();
                const geoObject = data[0];
                if (!geoObject) {
                    throw new Error("Не удалось найти координаты для данного адреса.");
                }
    
                return {
                    Lat: parseFloat(geoObject.lat),
                    Lon: parseFloat(geoObject.lon),
                };
            });

            const results = await Promise.all(promises);

            setInputRoutesLoc(results);
            console.log('All coordinates added:', results);
            
            closeModal();
        } catch (error) {
            alert('error: ' + error)
            console.log('Error:', error);
        }
    };

    return (
        <div className="container">
            <div className="mapBolck">
                <MyMap 
                points={inputRoutesLoc}
                routeInfo={{titleRoute: titleRoute, descriptionRoute:descriptionRoute}} 
                setClickLocation={setClickLocation} 
                isGetLocation={isGetLocation} 
                setIsGetLocation={setIsGetLocation}
                />
            </div>
            <div className="infoBlock">
                <Button text="Create Route" buttonImg={createRouteImg} onClick={() => openModal()} />
                <Button text="Get Route" buttonImg={completeRouteImg} onClick={() => openModalGetRoute()} />
                <CreateRoute
                    routes={inputRoutes}
                    isOpen={GetIsOpenCreateRouteModal}
                    setRoutes={setInputRoutes}
                    setIsGetLocation={setIsGetLocation} 
                    onClose={closeModal} 
                    createRouteClick={getRouteCoord} 
                    setId={setIdInputRoute} 
                    routeInfo={{titleText: titleRoute ,setTitleRoute, descriptionText: descriptionRoute, setDescriptionRoute}}
                    />
                <GetRoute isOpen={isModalGetRouteOpen} onClose={closeModalGetRoute}></GetRoute>
                <div className="textContainer"></div>
                <div className="resultContainer"></div>
            </div>
        </div>
    );
};

export default HomePage;
