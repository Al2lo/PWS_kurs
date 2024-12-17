import { useEffect, useState } from "react";
import { FullInfoRoute, Point } from "../models/models";
import '../styles/RouteInfoStyles.css'
import { RouteService } from "../Services/RouteService";
import { useDispatch } from "react-redux";
import { updateIsLike, updateRoute } from "../store/route/routeSlice";
import { toast } from "react-toastify";
import { useUser } from "../hooks/userHooks";

interface ModalProps {
    routeId: number | null;
    isOpen: boolean;
    onClose: () => void;
    closeOutRoutesWindow: () => void;
  }

  interface Comment {
    id: number;
    text: string;
    parentCommentId: number | null;
    userId: number;
    childComments: Comment[];
  }

const getRouteAsync = async (id: number, userId: number): Promise<FullInfoRoute | null> => {
  try {
        const routes = await RouteService.getRoute(id, userId);
        toast.success("Route was downloaded")
        return routes;
    } catch (error) {
        toast.error('Error fetching routes:'+ error);
        return null;
      }
    };

    const deleteRouteAsync = async (routeId: number): Promise<any> => {
        try {
              const routes = await RouteService.deleteRoute(routeId);
              toast.success("Route was deleted")
              return routes;
          } catch (error) {
              toast.error('Error: '+ error);
              return null;
    }};

const RouteInfo: React.FC<ModalProps> = ({routeId, isOpen, onClose, closeOutRoutesWindow }) => {
    const dispatch = useDispatch();
    const user = useUser();
    const [routeInfo, setRouteInfo] = useState<FullInfoRoute | null>(null);
    const [comments, setComments] = useState<Comment[]>([
        {id: 1,
        text: 'vsfvsdfvsdfvas',
        parentCommentId: 0,
        userId: 1,
        childComments: [{
            id: 1,
        text: 'vsfvsdfvsdfvas',
        parentCommentId: 0,
        userId: 1,
        childComments:[]
        }]
    },
    {id: 1,
        text: 'vsfvsdfvsdfvas',
        parentCommentId: 0,
        userId: 1,
        childComments: [{
            id: 1,
        text: 'vsfvsdfvsdfvas',
        parentCommentId: 0,
        userId: 1,
        childComments:[]
        }]
    }]);

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

    const deleteRoute =() => {
        if(routeInfo != null)
            deleteRouteAsync(routeInfo?.id);

        closeOutRoutesWindow();
        onClose();
    }

        useEffect(() => {
            const fetchGetRouteAsync = async (RouteId: number, UserId: number) => {
                    const route = await getRouteAsync(RouteId, UserId)
                    setRouteInfo(route);
                };
                if(routeId != null && user != null){
                    fetchGetRouteAsync(routeId, user.id)
                    .then()
                    .catch(e => toast.error('error: ' + e));
                }
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
                        <div className="buttons-container">
                            {user != null && 
                                (routeInfo.userId == user?.id || user.role == 0) && 
                                <button className="deleteRoute-button" onClick={() => deleteRoute()}>delete</button>
                            }
                            <button className="select-button" onClick={() => selectRoute()}>select</button>
                        </div> 
                        <div className="comments-container">
                            {comments.map((comment) => (
                            <div className="comment" key={comment.id}>
                                <div className="comment-header">
                                    <strong>Пользователь {comment.userId}</strong>
                                </div>
                                <div className="comment-body">{comment.text}</div>
                                {comment.childComments.length > 0 && (
                                    <div className="comment-children">
                                    {comment.childComments.map((child) => (
                                        <div className="comment" key={child.id}>
                                            <div className="comment-header">
                                                <strong>Пользователь {child.userId}</strong>
                                            </div>
                                            <div className="comment-body">{child.text}</div>
                                        </div>
                                    ))}
                                </div>
                             )}
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
          </div>
        );
    };

export default RouteInfo;