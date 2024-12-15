import { useEffect, useState } from "react";
import { FullInfoRoute, Point } from "../models/models";
import '../styles/RouteInfoStyles.css'
import { RouteService } from "../Services/RouteService";
import { useDispatch } from "react-redux";
import { updateIsLike, updateRoute } from "../store/route/routeSlice";
import { useRoute } from "../hooks/routeHooks";

interface ModalProps {
    routeId: number | null;
    isOpen: boolean;
    onClose: () => void;
    closeOutRoutesWindow: () => void;
  }
const userId = 1;

const getRouteAsync = async (id: number, userId: number): Promise<FullInfoRoute | null> => {
  try {
        const routes = await RouteService.getRoute(id, userId);
        return routes;
    } catch (error) {
        console.error('Error fetching routes:', error);
        return null;
      }
    };

const RouteInfo: React.FC<ModalProps> = ({routeId, isOpen, onClose, closeOutRoutesWindow }) => {
    const dispatch = useDispatch();
    const [routeInfo, setRouteInfo] = useState<FullInfoRoute | null>(null);

    const selectRoute = () => {
        if(routeInfo != null)
        {
            let points: Point[] = routeInfo.points.map(point => {
                return { 
                    Lat: Number(point.lat.replace(',', '.')), 
                    Lon: Number(point.lon.replace(',', '.')) 
                  };                  
              });
            let date = new Date(routeInfo.createDate);
            let route = {
                Id: routeInfo.id,
                Title: routeInfo.title,
                Description:routeInfo.description,
                Distance: routeInfo.distance,
                CreateDate: date,
                IsPublic: routeInfo.isPublic,
                UserId: routeInfo.userId,
                Points: points
            }

            dispatch(updateRoute(route))
            dispatch(updateIsLike(routeInfo.isLike))
        }
        closeOutRoutesWindow();
        onClose();
    }

        useEffect(() => {
            const fetchGetRouteAsync = async () => {
                if(routeId != null){
                    const route = await getRouteAsync(routeId, userId)
                    setRouteInfo(route);
                }
              };

            fetchGetRouteAsync()
            .then()
            .catch(e => alert(e));
        }, [routeId]);

    if (!isOpen || routeId == null || routeInfo == null) return null;

    return (
        <div className="RouteInfo-modal-overlay" onClick={onClose}>
            <div className="RouteInfo-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="RouteInfo-close-button" onClick={onClose}>×</button>
                    <div className="RouteInfo-info-container">
                        <div className="info-row">
                            <strong>ID:</strong> <span>{routeInfo.id}</span>
                        </div>
                        <div className="info-row">
                            <strong>Title:</strong> <span>{routeInfo.title}</span>
                        </div>
                        <div className="info-row">
                            <strong>Description:</strong> <span>{routeInfo.description}</span>
                        </div>
                        <div className="info-row">
                            <strong>Distance:</strong> <span>{routeInfo.distance}</span>
                        </div>
                        <div className="info-row">
                            <strong>Create Date:</strong> <span>{routeInfo.createDate}</span>
                        </div>
                        <div className="info-row">
                            <strong>Public:</strong> <span>{routeInfo.isPublic ? 'Yes' : 'No'}</span>
                        </div>
                        <div className="info-row">
                            <strong>User ID:</strong> <span>{routeInfo.userId}</span>
                        </div>
                        <div className="info-row">
                            <strong>Liked:</strong> <span>{routeInfo.isLike ? 'Yes' : 'No'}</span>
                        </div>
                        <div className="info-row">
                            <strong>Points:</strong>
                            <ul>
                                {routeInfo.points.map((point) => (
                                    <li>Latitude: {point.lat}, Longitude: {point.lon}</li>
                                ))}
                            </ul>
                        </div>
                        <button className="select-button" onClick={() => selectRoute()}>select</button>
                    </div>
                </div>
          </div>
        );
    };

export default RouteInfo;