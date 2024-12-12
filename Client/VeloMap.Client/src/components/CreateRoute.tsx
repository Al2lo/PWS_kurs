import {RouteTitle } from '../models/models';
import '../styles/CreateRouteStyles.css'
import RouteInput from "./RouteInput";

interface ModalProps {

  routes: RouteTitle[];
  setRoutes: (routes: RouteTitle[]) => void;
  isOpen: () => boolean;
  onClose: () => void;
  createRouteClick: () => void;
  setId:(id:string)=>void;
  setIsGetLocation:(b: boolean) => void;
  routeInfo:{titleText:string, setTitleRoute:(title:string) => void, descriptionText: string, setDescriptionRoute:(descr:string) => void};
}

const generateUniqueNumber = (): number => {
  return Math.floor(Math.random() * 1_000_000_000_000) + 1;
};

const CreateRoute: React.FC<ModalProps> = ({ routes, isOpen, setRoutes, onClose, setIsGetLocation, createRouteClick, setId, routeInfo}) => {

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
        <div className="modal-container">
          <div className='info-container'>
          <div className='input-Title-container'>
            <label className='label' htmlFor="title">Title:</label>
            <input className='input-text' style={{ color: '#000000'}}type="text" value={routeInfo.titleText} onChange={(e) => {routeInfo.setTitleRoute(e.target.value)}} id="title" placeholder="Введите заголовок" />
          </div>
          <div>
            <label className='label' htmlFor="description">Description:</label>
            <textarea value={routeInfo.descriptionText} onChange={(e) => {routeInfo.setDescriptionRoute(e.target.value)}} className='input-text' id="description" placeholder="Введите описание" rows="4"></textarea>
          </div>
          </div>
          <div className='coord-container'>
            <div className='name-of-block'>
              Coordinates:
            </div>
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
        </div>
        <div className='buttonsAdd-container'>
          <button onClick={createRouteClick} className='createRoute-button'>create route</button>
          <button onClick={addRoute} className='addRoute-button'>+</button>
        </div>
      </div>
    </div>
  );
};

export default CreateRoute;