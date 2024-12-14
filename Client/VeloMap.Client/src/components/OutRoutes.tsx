import { useState } from 'react';
import { RouteAlias } from '../models/models';
import '../styles/OutRoutes.css'
import RouteInfo from './RouteInfo';

interface OutRoutesProps {
    routes: RouteAlias[];
    closeOutRoutesWindow: () => void;
  }
  
  const OutRoutes: React.FC<OutRoutesProps> = ({ routes, closeOutRoutesWindow }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [routeId, setRouteId] = useState<number |null>(null);
  
    return (
      <div className="list-container">
        <RouteInfo
          routeId={routeId}
          isOpen={isOpen} 
          onClose={()=>{setIsOpen(false)}}
          closeOutRoutesWindow={closeOutRoutesWindow}
        />
        <ul className="item-list">
           {routes.map((route) => (
            <li
              key={route.id}
              className="list-item"
              onDoubleClick={() => {setRouteId(route.id);alert(route.id); setIsOpen(true);}}
            >
                <span className="item-id">{route.id}</span>
                <span className="item-title">{route.title}</span>
                <span className="item-date">{route.createDate}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default OutRoutes;
  