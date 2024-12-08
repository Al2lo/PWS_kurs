import { useEffect, useState } from "react";
import { MapInterface } from "../models/models";

const MyMap: React.FC<MapInterface> = ({ userLocation, routeObjs }) => {
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [userPlacemark, setUserPlacemark] = useState<any>(null);

  // Инициализация карты
  const init = () => {
    const map = new window.ymaps.Map('map-test', {
      center: [userLocation.lat, userLocation.lon],
      zoom: 12,
    });

    // Убираем элементы управления
    map.controls.remove('geolocationControl');
    map.controls.remove('searchControl');
    map.controls.remove('trafficControl');
    map.controls.remove('fullscreenControl');
    map.controls.remove('zoomControl');
    map.controls.remove('rulerControl');

    // Устанавливаем карту в состояние
    setMapInstance(map);
  };

  // Функция для добавления метки
  const addUserPlacemark = (location: { lat: number; lon: number }) => {
    if (mapInstance) {
      if (userPlacemark) {
        mapInstance.geoObjects.remove(userPlacemark);
      }

      const placemark = new window.ymaps.Placemark(
        [location.lat, location.lon],
        {
          hintContent: 'Ваше местоположение',
          balloonContent: 'Это ваше текущее местоположение',
        },
        {
          preset: 'islands#icon',
          iconColor: '#0095b6', // Цвет иконки
        }
      );

      // Добавляем метку на карту
      mapInstance.geoObjects.add(placemark);

      // Обновляем состояние метки
      setUserPlacemark(placemark);
    }
  };

  const buildRoute = (points: Array<{ lat: number; lon: number }>) => {
    if (mapInstance) {
      const multiRoute = new window.ymaps.multiRouter.MultiRoute({
        referencePoints: points.map(point => [point.lat, point.lon]),
        params: {
          routingMode: 'bicycle',
        }
      }, {
        boundsAutoApply: true,
      });

      mapInstance.geoObjects.add(multiRoute);
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=0cf0dba2-0bf2-44cd-a1a5-355bca25bf28'; // Ваш API ключ
    script.onload = () => {
      if (window.ymaps) {
        window.ymaps.ready(() => init());
      }
    };
    script.onerror = () => {
      console.error('Ошибка загрузки скрипта Яндекс.Карт');
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (mapInstance) {
      addUserPlacemark(userLocation);
    }
  }, [userLocation, mapInstance]);

  useEffect(() => {
    if (mapInstance) {
      buildRoute(routeObjs);
    }
  }, [routeObjs, mapInstance]); 

  return (
    <div className="map-container">
      <div id="map-test" className="map"></div>
    </div>
  );
};

export default MyMap;
