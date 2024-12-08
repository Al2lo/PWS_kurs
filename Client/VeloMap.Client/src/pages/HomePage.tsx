import { FC, useEffect, useState } from "react";
import MyMap from "../components/Map";
import '../styles/HomeStyles.css';
import Button from "../components/Button";
import createRouteImg from '../assets/createRoute.png';
import completeRouteImg from '../assets/completeRoutes.png';
import CreateRoute from "../components/CreateRoute";

const HomePage: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);    

    const [coordinates, setCoordinates] = useState<{ lat: number; lon: number }>({ lat: 53.906, lon: 27.5308 });

    useEffect(() => {
        // Функция для получения текущего местоположения
        const fetchLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setCoordinates({ lat: latitude, lon: longitude });
                    },
                    (err) => {
                        console.error(`Ошибка получения местоположения: ${err.message}`);
                    }
                );
            } else {
                console.error('Geolocation не поддерживается вашим браузером.');
            }
        };

        // Первое получение местоположения
        fetchLocation();

        // Установка интервала для обновления местоположения каждые 15 секунд
        const intervalId = setInterval(fetchLocation, 15000);

        // Очистка интервала при размонтировании компонента
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="container">
            <div className="mapBolck">
                <MyMap userLocation={coordinates} routeObjs={[{ lat: 53.906, lon: 27.5308 }, { lat: 53.706, lon: 27.3308 }, { lat: 53.8606, lon: 27.5108 }]} />
            </div>
            <div className="infoBlock">
                <Button text="add route" buttonImg={createRouteImg} onClick={() => openModal()} />
                <Button text="add route" buttonImg={completeRouteImg} onClick={() => alert('add route')} />
                <CreateRoute isOpen={isModalOpen} onClose={closeModal} />
                <div className="textContainer"></div>
                <div className="resultContainer"></div>
            </div>
        </div>
    );
};

export default HomePage;
