import { useEffect, useState } from "react";
import { CreateCommentDto, FullInfoRoute, Point } from "../models/models";
import '../styles/RouteInfoStyles.css'
import { RouteService } from "../Services/RouteService";
import { useDispatch } from "react-redux";
import { deleteCurrentRoute, updateIsLike, updateRoute } from "../store/route/routeSlice";
import { toast } from "react-toastify";
import { useUser } from "../hooks/userHooks";
import { Comment } from "../models/models";
import CommentComponent from "./CommentComponent";
import { useRoute } from "../hooks/routeHooks";

interface ModalProps {
    routeId: number | null;
    isOpen: boolean;
    onClose: () => void;
    closeOutRoutesWindow: () => void;
  }

  const createRouteAsync = async (routeId: number, createCommentDto: CreateCommentDto): Promise<any> => {
    try {
          await RouteService.createComments(routeId, createCommentDto);
          toast.success("Comment was create")
      } catch (error) {
          toast.error('Error: can not create comment');
        }
  };

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

const getRouteCommentsAsync = async (routeId: number): Promise<Comment[]> => {
    try {
          const comments = await RouteService.getComments(routeId);
          return comments;
      } catch (error) {
          toast.error('Error getting comments:'+ error);
          return [];
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
    const route = useRoute();
    const user = useUser();
    const [routeInfo, setRouteInfo] = useState<FullInfoRoute | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [textComment, setTextComment] = useState<string>("");

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
            deleteRouteAsync(routeInfo?.id)
        .then(()=>{
            if(routeInfo?.id == route?.Id)
            {
                dispatch(deleteCurrentRoute());
                dispatch(updateIsLike(false));
            }
        })

        closeOutRoutesWindow();
        onClose();
    }

    const fetchRouteCommentsAsync = async (RouteId: number) => {
        const comments = await getRouteCommentsAsync(RouteId)
        setComments(comments);
    };

        useEffect(() => {
            const fetchGetRouteAsync = async (RouteId: number, UserId: number) => {
                    const route = await getRouteAsync(RouteId, UserId)
                    setRouteInfo(route);
            };

                if(routeId != null && user != null){
                    fetchGetRouteAsync(routeId, user.id)
                    .then(()=>fetchRouteCommentsAsync(routeId))
                    .catch(e => toast.error('error: ' + e));
                }
        }, [routeId]);

        const onAddChildComment = (parentCommentId: number, text: string) => {
            setComments((prevComments) => {
              const addCommentRecursively = (comments: Comment[]): Comment[] => {
                return comments.map((comment) => {
                  if (comment.id === parentCommentId) {
                    return {
                      ...comment,
                      childComments: [
                        ...comment.childComments,
                        { id: Date.now(), text, parentCommentId, userId: user?.id ?? 1, childComments: [] },
                      ],
                    };
                  }
                  if (comment.childComments.length > 0) {
                    return { ...comment, childComments: addCommentRecursively(comment.childComments) };
                  }
                  return comment;
                });
              };
              if(routeInfo != null && user != null)
              {
                createRouteAsync(routeInfo.id,
                    {text: text,
                    parentCommentId: parentCommentId,
                    userId: user.id
                }).then( () => {
                    fetchRouteCommentsAsync(routeInfo.id)
                    .then(()=>{
                        return comments;
                    })
                })
              }
              // НАДО ДОСМОТРЕТЬ!
              return addCommentRecursively(prevComments);
            });
          };

    const CreateParentComment = () => {
        if(routeInfo != null && user != null)
            {
              createRouteAsync(routeInfo.id,
                  {text: textComment,
                  parentCommentId: null,
                  userId: user.id
              })
              .then(()=> {
                fetchRouteCommentsAsync(routeInfo.id)
              })
            }
    }

    useEffect(() => {
        setTextComment("");
    },[comments])

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
                                <CommentComponent key={comment.id} comment={comment} onAddChildComment={onAddChildComment} />
                            ))}
                            <div className="reply-area">
                                <textarea 
                                    className="reply-area-input"
                                    value={textComment}
                                    onChange={(e) => setTextComment(e.target.value)}
                                    placeholder="Напишите ваш ответ..."
                                    rows="3" // Устанавливаем начальное количество строк
                                />
                                    <button className="submit-reply-button" onClick={CreateParentComment}>Отправить</button>
                            </div>
                        </div>
                    </div>
                </div>
          </div>
        );
    };

export default RouteInfo;