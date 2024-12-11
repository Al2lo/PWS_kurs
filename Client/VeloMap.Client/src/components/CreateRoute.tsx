import { Route } from '../models/models';
import '../styles/CreateRouteStyles.css'
import RouteInput from "./RouteInput";

interface ModalProps {
  routes: Route[];
  setRoutes: (routes: Route[]) => void;
  isOpen: () => boolean;
  onClose: () => void;
  createRouteClick: () => void;
  setId:(id:string)=>void;
  setIsGetLocation:(b: boolean)=>void;
}

const generateUniqueNumber = (): number => {
  return Math.floor(Math.random() * 1_000_000_000_000) + 1;
};

const CreateRoute: React.FC<ModalProps> = ({ routes, isOpen, setRoutes, onClose, setIsGetLocation, createRouteClick, setId }) => {

  const addRoute = () => {
    setRoutes([...routes, { id: generateUniqueNumber().toString() , text: "" }]); // Создаем маршрут с уникальным ID
  };

  const deleteRoute = (id: string) => {
    setRoutes(routes.filter(route => route.id !== id)); // Удаляем маршрут по ID
  };

  const updateRoute = (id: string, newText: string) => {
    setRoutes( routes.map((route) =>
        route.id === id ? { ...route, text: newText } : route
      )
    );
  }

  if (!isOpen()) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content-createRoute">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <button onClick={addRoute} className='addRoute-button'>+</button>
        <div className="modal-container">
        {routes.map((route) => (
          <RouteInput
              key={route.id}
              initialText={route.text}
              onClickDelete={() => deleteRoute(route.id)}
              onChange={(newText: string) => updateRoute(route.id, newText)}
              setId={() => setId(route.id)}
              setIsGetLocation={()=>{setIsGetLocation(true)}}
            />
          ))}
        </div>
        <button onClick={createRouteClick} className='createRoute-button'>create route</button>
      </div>
    </div>
  );
};

export default CreateRoute;