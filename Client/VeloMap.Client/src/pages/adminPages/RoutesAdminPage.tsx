import { FC, useEffect, useState } from "react";
import "../../styles/RoutesAdminPage.css"
import { FullInfoRoute } from "../../models/models";
import { RouteService } from "../../Services/RouteService";
import { toast } from "react-toastify";

const RoutesAdminPage: FC = () => {
  const [routes, setRoutes] = useState<FullInfoRoute[]>([]);
  const [isUpdte, setIsUpdate] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(()=>{
        const fetchAllRoutes =async () => {
          setIsLoading(true)
            try{
                var data = await RouteService.getAllRoutes();
                setRoutes(data);
            }
            catch(e)
            {
                toast.error("error");
            }
            finally
            {
              setIsLoading(false)
            }
        }

        fetchAllRoutes();
    },[isUpdte])

  const handleDelete = (id: number) => {
        RouteService.deleteRoute(id)
        .then(()=>{
            toast.success("Route was delete")
            setIsUpdate(!isUpdte)
        })
        .catch(()=>{
            toast.error("Unknown error")
        })
        
  };

  return (
    <div className="routes-admin">
      <div className="routes-admin__container">
        <h2 className="routes-admin__header">Admin Routes</h2>
        {isLoading ? ( 
          <div className="loading-indicator">Loading...</div> 
        ) : (
        <ul className="routes-admin__list">
          {routes.map((route) => (
            <li key={route.id} className="routes-admin__list-item">
              <h3 className="routes-admin__list-item-title">{route.title}</h3>
              <p className="routes-admin__list-item-description">
                <strong>Description:</strong> {route.description}
              </p>
              <p className="routes-admin__list-item-distance">
                <strong>Distance:</strong> {route.distance}
              </p>
              <p className="routes-admin__list-item-date">
                <strong>Create Date:</strong> {route.createDate}
              </p>
              <p className="routes-admin__list-item-public">
                <strong>Public:</strong> {route.isPublic ? "Yes" : "No"}
              </p>
              <p className="routes-admin__list-item-like">
                <strong>Liked:</strong> {route.isLike ? "Yes" : "No"}
              </p>
              <button
                onClick={() => handleDelete(route.id)}
                className="routes-admin__delete-button"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        )}
      </div>
    </div>
  );
};

export default RoutesAdminPage;
