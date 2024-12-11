import '../styles/RouterInputStyles.css'
import searchInputImg from '../assets/searchOnMap.png'
import basketImg from '../assets/basket.png'


interface RouteInputProps {
    initialText: string; 
    onClickDelete: () => void;
    onChange: (text: string) => void;
    setId: () => void;
    setIsGetLocation: () => void;
  }
  
  const RouteInput: React.FC<RouteInputProps> = ({ initialText, onClickDelete,setIsGetLocation, onChange, setId }) => {
  
    const setLocation = () => {
      setId();
      setIsGetLocation();
    }

    return (
      <div className="routeInput-container">
          <input type="text" value={initialText} onChange={(e) => onChange(e.target.value)} />
          <button type="submit" className='getCoordOnMap-button' onClick={setLocation}><img className='img-button' src={searchInputImg}/></button>
          <button type="submit" className='delete-button' onClick={onClickDelete}><img className='img-button' src={basketImg}/></button>
      </div>
    );
  };
  
  export default RouteInput;