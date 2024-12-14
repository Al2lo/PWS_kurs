import { useEffect, useState, useRef } from "react";
import { MapInterface } from "../models/models";
import getMyLocation from '../assets/getMyLocation.png';
import myLocation from '../assets/myLocation.png';
import { RouteService } from "../Services/RouteService";
import { useAppDispathc } from "../store/hooks";
import { updateRoute } from "../store/route/routeSlice";

const MyMap: React.FC<MapInterface> = ({ points, routeInfo, setClickLocation ,setIsGetLocation }) => {
  const dispatch = useAppDispathc();
  const [userPlacemark, setUserPlacemark] = useState<any>(null); 
  const [currentRoute, setCurrentRoute] = useState<any>(null); 
  const [location, setLocation] = useState<{ lat: number; lon: number }>({ lat: 53.906, lon: 27.5308 }); 

  const mapInstanceRef = useRef<any>(null); 
  const isScriptLoaded = useRef<boolean>(false); 

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setLocation({ lat, lon });
          console.log(location)
          if (mapInstanceRef.current) {
            mapInstanceRef.current.setCenter([lat, lon]);
            mapInstanceRef.current.setZoom(12);
          }
        },
        (error) => {
          console.error("Ошибка получения местоположения: ", error);
        }
      );
    } else {
      console.error("Geolocation не поддерживается в этом браузере");
    }
  };


  useEffect(() => {
    if (!isScriptLoaded.current) {
      const loadMapScript = () => {
        const script = document.createElement("script");
        script.src =
          "https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=0cf0dba2-0bf2-44cd-a1a5-355bca25bf28";
        script.onload = () => {
          if (window.ymaps && !mapInstanceRef.current) {
            window.ymaps.ready(() => {
              mapInstanceRef.current = new window.ymaps.Map("map-test", {
                center: [location.lat, location.lon],
                zoom: 12,
              });
  
              mapInstanceRef.current.controls.remove("geolocationControl");
              mapInstanceRef.current.controls.remove("searchControl");
              mapInstanceRef.current.controls.remove("trafficControl");
              mapInstanceRef.current.controls.remove("fullscreenControl");
              mapInstanceRef.current.controls.remove("zoomControl");
              mapInstanceRef.current.controls.remove("rulerControl");
              
              mapInstanceRef.current.events.add('click', function (e: any) {

                  const coords = e.get('coords');
                  setClickLocation({ lat: coords[0], lon: coords[1] });
                  console.log({ lat: coords[0], lon: coords[1] })

                setIsGetLocation(false);
              });

            });
          }
        };
        script.onerror = () => {
          console.error("Ошибка загрузки скрипта Яндекс.Карт");
        };
        document.head.appendChild(script);
      };
  
      if (!isScriptLoaded.current) {
        loadMapScript();
        isScriptLoaded.current = true; 
      }
    }
  
    return () => {
      const existingScript = document.querySelector(`script[src="https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=0cf0dba2-0bf2-44cd-a1a5-355bca25bf28"]`);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [location, points]);
  
  useEffect(() => {
    if (mapInstanceRef.current && location) {
      if (userPlacemark) {
        mapInstanceRef.current.geoObjects.remove(userPlacemark);
      }

      const placemark = new window.ymaps.Placemark(
        [location.lat, location.lon],
        {
          hintContent: "Ваше местоположение",
          balloonContent: "Это ваше текущее местоположение",
        },
        {
          iconLayout: "default#image",
          iconImageHref: myLocation, 
          iconImageSize: [40, 40], 
          iconImageOffset: [-15, -30],
        }
      );

      mapInstanceRef.current.geoObjects.add(placemark);
      setUserPlacemark(placemark);
    }
  }, [location]); 

  // Построение маршрута
  useEffect(() => {
    if (mapInstanceRef.current && points) {
      console.log(points)
      if (currentRoute) {
        mapInstanceRef.current.geoObjects.remove(currentRoute);
      }

      const multiRoute = new window.ymaps.multiRouter.MultiRoute(
        {
          referencePoints: points.map((point) => [point.Lat, point.Lon]),
          params: {
            routingMode: "bicycle",
          },
        },
        {
          boundsAutoApply: true,
        }
      );

      const route = {
        Title: routeInfo.titleRoute,
        Description: routeInfo.descriptionRoute,
        Distance: '17', // Убедитесь, что у вас есть правильная дистанция
        CreateDate: new Date(),
        IsPublic: true,
        UserId: 0,
        Points: points,
      };

      if (points.length > 0) {
        RouteService.createRoute(route)
          .then(() => {
            alert('Route saved');
            dispatch(updateRoute(route))
          })
          .catch((error) => {
            console.error(error);
          });
      }

      mapInstanceRef.current.geoObjects.add(multiRoute);
      setCurrentRoute(multiRoute);
    }
  }, [points]); // Следим за изменениями в маршруте

  return (
    <div className="map-container">
      <div id="map-test" className="map"></div>
      <button className="location-button" onClick={getUserLocation}><img className="img-location-button" src={getMyLocation}></img></button>
    </div>
  );
};

export default MyMap;
