import React, { useEffect, useState } from "react";
import '../styles/GetRouteStyles.css'
import OutRoutes from "./OutRoutes";
import { RouteAlias } from "../models/models"
import { RouteService } from "../Services/RouteService";
import { toast } from "react-toastify";
import { useUser } from "../hooks/userHooks";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
  }
  
  const GetRoute: React.FC<ModalProps> = ({isOpen, onClose}) => {
    const user = useUser(); 
    const [myRoutes, setMyRoutes] = useState<RouteAlias[]>([]);
    const [publicRoutes, setPublicRoutes] = useState<RouteAlias[]>([]);
    const [favoriteRoutes, setFavoriteRoutes] = useState<RouteAlias[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<'my' | 'public' | 'favorite'>('my');
    const [isLoadingMyRoutes, setIsLoadingMyRoutes] = useState<boolean>(true);
    const [isLoadingPublicRoutes, setIsLoadingPublicRoutes] = useState<boolean>(true);
    const [isLoadingFavoriteRoutes, setIsLoadingFavoriteRoutes] = useState<boolean>(true);

    const getMyRoutes = async (UserId: number): Promise<RouteAlias[]> => {
      try {
        setIsLoadingMyRoutes(true)
        const routes = await RouteService.getMyRoutes(UserId);
        return routes;
      } catch (error) {
        toast.error('Error fetching routes:' + error);
        return [];
      }
      finally{
        setIsLoadingMyRoutes(false)
      }
    };
  
    const getPublicRoutes = async (): Promise<RouteAlias[]> => {
      try {
        setIsLoadingPublicRoutes(true);
        const routes = await RouteService.getPublicRoutes();
        return routes;
      } catch (error) {
        toast.error('Error fetching routes:'+ error);
        return [];
      }
      finally{
        setIsLoadingPublicRoutes(false);
      }
    };
  
    const getFavoriteRoutes = async (UserId: number): Promise<RouteAlias[]> => {
      setIsLoadingFavoriteRoutes(true)
      try {
        const routes = await RouteService.getFavoriteRoutes(UserId);
        return routes;
      } catch (error) {
        toast.error('Error fetching routes:' + error);
        return [];
      }
      finally{
        setIsLoadingFavoriteRoutes(false)
      }
    };

    const handleCategoryClick = (category: 'my' | 'public' | 'favorite') => {
      setSelectedCategory(category);
    };

    let routesToDisplay: RouteAlias[] = [];
    switch (selectedCategory) {
      case 'my':
        routesToDisplay = myRoutes;
        break;
      case 'public':
        routesToDisplay = publicRoutes;
        break;
      case 'favorite':
        routesToDisplay = favoriteRoutes;
        break;
    }

    useEffect(() => {
      const fetchMyRoutes = async (UserId: number) => {
        const routes = await getMyRoutes(UserId);
        setMyRoutes(routes);
      };

      const fetchPublicRoutes = async () => {
        const routes = await getPublicRoutes();
        setPublicRoutes(routes);
      };

      const fetcFavoritehRoutes = async (UserId: number) => {
        const routes = await getFavoriteRoutes(UserId);
        setFavoriteRoutes(routes);
      };
    
      if(isOpen && user != null)
      {
        fetchMyRoutes(user.id);
        fetchPublicRoutes();
        fetcFavoritehRoutes(user.id);
      }

    }, [isOpen]);


    if (!isOpen) return null;
  
    return (
        <div className="modal-overlay">
        <div className="modal-content">
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
          <div className="content-container">
            <div className="category-route-container">
                <button className={`category-button ${selectedCategory === 'my' ? 'active' : ''}`} onClick={() => handleCategoryClick('my')}>my routes</button>
                <button className={`category-button ${selectedCategory === 'public' ? 'active' : ''}`} onClick={() => handleCategoryClick('public')}>public routes</button>
                <button className={`category-button ${selectedCategory === 'favorite' ? 'active' : ''}`} onClick={() => handleCategoryClick('favorite')}>favorite routes</button>
            </div>
            <div className="routes-result-container">
            {isLoadingMyRoutes || isLoadingPublicRoutes ||  isLoadingFavoriteRoutes ? ( 
                <div className="loading-indicator">Loading...</div> 
              ) : (
              <OutRoutes
                routes={routesToDisplay}
                closeOutRoutesWindow={onClose}
              ></OutRoutes>
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

export default GetRoute;
