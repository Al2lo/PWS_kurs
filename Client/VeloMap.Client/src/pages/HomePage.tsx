import { FC, useEffect, useRef, useState } from "react";
import MyMap from "../components/Map";
import '../styles/HomeStyles.css';
import Button from "../components/Button";
import createRouteImg from '../assets/createRoute.png';
import completeRouteImg from '../assets/completeRoutes.png';
import CreateRoute from "../components/CreateRoute";
import { FavoriteRoute, Point, RouteTitle } from "../models/models";
import GetRoute from "../components/GetRoute";
import { useRoute, useRouteLike } from "../hooks/routeHooks";
import { RouteService } from "../Services/RouteService";
import { useAppDispathc } from "../store/hooks";
import { updateIsLike, updateRoute } from "../store/route/routeSlice";
import { toast } from "react-toastify";
import { useUser } from "../hooks/userHooks";

const HomePage: FC = () => {
    const user = useUser();
    const dispatch = useAppDispathc();
    const isLIke = useRouteLike();
    const route = useRoute();
    const [routeId, setRouteId] = useState<number | null>(null);
    const [isModalCreateRouteOpen, setIsModalCreateRouteOpen] = useState(false);
    const [isModalGetRouteOpen, setIsModalGetRouteOpen] = useState(false);
    const [inputRoutes, setInputRoutes] = useState<RouteTitle[]>([{id: "1", text: ""}, {id: "2", text: ""}]);
    const inputRoutesLoc = useRef<Point[]>([

      ]);
    const idInputRouteRef = useRef("");
    const [isGetLocation, setIsGetLocation] = useState<boolean>(false);
    const [titleRoute, setTitleRoute] = useState<string>("");
    const [descriptionRoute, setDescriptionRoute] = useState<string>("");
    const [isLiked, setIsLiked] = useState(isLIke);
    const [isPublic, setIsPublic] = useState(route != null? route.IsPublic: false);
    const [titleRouteUpdate, setTitleRouteUpdate] = useState<string>(route != null? route.Title: "");
    const [descriptionRouteUpdate, setTitleDescriptionUpdate] = useState<string>(route != null ? route.Description: "");
    const [updateButtonEnable, setUpdateButtonEnable] = useState<boolean>(false);

    const openModal = () => setIsModalCreateRouteOpen(true);
    const closeModal = () => setIsModalCreateRouteOpen(false);  
    const openModalGetRoute = () => setIsModalGetRouteOpen(true);
    const closeModalGetRoute = () => setIsModalGetRouteOpen(false); 

    const handleTitleRouteUpdate = (title: string) => {
        if(route != null && user != null && route.UserId == user.id)
            setTitleRouteUpdate(title);
    };

    const handleDescriptionRouteUpdate = (title: string) => {
        if(route != null && user != null && route.UserId == user.id)
            setTitleDescriptionUpdate(title);
    };

    const handleToggleLike = () => {
        if(route != null && route.UserId != null && user != null)
        {   
            var favoriteRoute : FavoriteRoute = { userId: Number(user.id), routeId: route.Id };
            if(isLiked)
            {
                RouteService.deleteFavoriteRoute(favoriteRoute)
                .then(()=>{dispatch(updateIsLike(!isLiked));})
                .catch(()=>toast.error('error'));
            }
            else
            {
                RouteService.createFavoriteRoute(favoriteRoute)
                .then(()=>{dispatch(updateIsLike(!isLiked));})
                .catch(()=>toast.error('error'));
            }
        }
    };

    const handleTogglePublic = () => {
        if(route != null && user != null && route.UserId == user.id)
            setIsPublic(!isPublic);
    };

    const setIdInputRoute = (id: string) => {
        idInputRouteRef.current = id;
    };

    const CreateRouteFunc = () => {
        if(user == null)
        {
            toast.error("Incorrect user!")
            return;
        }

        var route = {
          Title: titleRoute,
          Description: descriptionRoute,
          Distance: '17',
          CreateDate: new Date(),
          IsPublic: false,
          UserId: user.id,
          Points: inputRoutesLoc.current,
        };
  
        RouteService.createRoute(route)
        .then((response) => {
        const id = response.id;
        dispatch(updateRoute({
        Id: id, 
        Title: titleRoute,
        Description: descriptionRoute,
        Distance: '17',
        CreateDate: new Date(),
        IsPublic: false,
        UserId: user.id,
        Points: inputRoutesLoc.current,
      }));

      toast.success("Route was created")
    })
    .catch((error) => {
      toast.error(JSON.parse(error.response.data).Message);
    });
    }

    const GetIsOpenCreateRouteModal = () => {
        if(isModalCreateRouteOpen && isGetLocation)
            return false;

        if(isModalCreateRouteOpen && !isGetLocation)
            return true;

        if(!isModalCreateRouteOpen)
            return false;

        return false;
    }

    const setClickLocation = (coord: { lat: number; lon: number }) => {
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
            inputRoutesLoc.current = []; 
    
            const promises = inputRoutes.map(async (router) => {
                const address = router.text;
    
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

            inputRoutesLoc.current = results;

            if(isModalCreateRouteOpen)
            {
                CreateRouteFunc();
            }
            
            closeModal();
        } catch (error) {
            toast.error("Error: " + error);
        }
    };

    useEffect(() => {
        if (route) {
          setIsPublic(route.IsPublic);
          setTitleRouteUpdate(route.Title);
          setTitleDescriptionUpdate(route.Description);
          inputRoutesLoc.current = route.Points;
          setRouteId(route.Id);
          setUpdateButtonEnable(false);
        }
      }, [route]);

      useEffect(() => {
        setIsLiked(isLIke)
      }, [isLIke]);

      useEffect(() => {
        if(route != null && (route.IsPublic != isPublic || route.Title != titleRouteUpdate || route.Description != descriptionRouteUpdate))
            setUpdateButtonEnable(true)
        else
            setUpdateButtonEnable(false)

      }, [isLiked, isPublic, titleRouteUpdate, descriptionRouteUpdate]);

      const callUpdateRoute = () => {
        if (routeId != null && user != null)
        { 
            let updatRoute = {
                Id: routeId,
                Title: titleRouteUpdate,
                Description: descriptionRouteUpdate,
                Distance: route != null ? route.Distance : '17',
                CreateDate: route != null ? route.CreateDate : new Date(),
                IsPublic: isPublic,
                UserId: user.id,
            };
            
            let upRoute = {
                Id: routeId,
                Title: titleRouteUpdate,
                Description: descriptionRouteUpdate,
                Distance: route != null ? route.Distance : '17',
                CreateDate: route != null ? route.CreateDate : new Date(),
                IsPublic: isPublic,
                UserId: user.id,
                Points: route != null ? route.Points : inputRoutesLoc.current,
            };
            
            RouteService.updateRoute(updatRoute)
            .then(() => {
                toast.success('Route was updated');
                dispatch(updateRoute(upRoute))
            })
            .catch((error) => {
               toast.error('error: ' + error);
            });
        }
      }

    return (
        <div className="container">
            <div className="mapBolck">
                <MyMap 
                points={inputRoutesLoc.current}
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
                    routeInfo={{titleText: titleRoute, setTitleRoute, descriptionText: descriptionRoute, setDescriptionRoute}}
                    />
                <GetRoute isOpen={isModalGetRouteOpen} onClose={closeModalGetRoute}></GetRoute>
                <div className="textContainer">
                    <div className="title-container">
                        <label className='label' htmlFor="title">Title:</label>
                        <input className='.description-container-input-text' value={titleRouteUpdate} onChange={(e) => handleTitleRouteUpdate(e.target.value)} style={{ fontSize: '20px'}}type="text"  id="title" placeholder="Введите заголовок" />
                    </div>
                    <div className="description-container">
                        <label className='label' htmlFor="description">Description:</label>
                        <textarea className='description-container-input-text' value={descriptionRouteUpdate} onChange={(e) => handleDescriptionRouteUpdate(e.target.value)} id="description" placeholder="Введите описание" rows="6"></textarea>
                    </div>
                    <div className="manipulate-container">
                    <button 
                        className={`like-button ${isLiked ? 'liked' : ''}`} 
                        onClick={handleToggleLike} 
                        aria-label={isLiked ? 'Unlike' : 'Like'}
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            className="heart-icon"
                        >
                            <path
                                className="heart-path"
                                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6.42 3.42 5 5.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5 18.58 5 20 6.42 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                stroke="#e63946"
                                strokeWidth="2"
                            />
                            </svg>
                    </button>
                    <button
                            className={`toggle-button ${isPublic ? 'public' : 'private'}`}
                            onClick={handleTogglePublic}
                        >
                            <span className="circle"></span>
                     </button>
                    </div>
                    <button disabled={!updateButtonEnable} onClick={()=> {callUpdateRoute()}} className="save-button">Save</button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
