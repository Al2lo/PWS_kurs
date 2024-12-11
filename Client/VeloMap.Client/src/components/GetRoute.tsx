import React, { useState } from "react";
import '../styles/GetRouteStyles.css'


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
  }

  interface GetRoute{

  }

const GetRoute: React.FC<ModalProps> = ({isOpen, onClose}) => {

    const [routes, setRoutes] = useState<GetRoute[]>([]);

    if (!isOpen) return null;
  
    return (
        <div className="modal-overlay">
        <div className="modal-content">
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
          <div className="content-container">
            <div className="category-route-container">
                <button className="category-button">my routes</button>
                <button className="category-button">public routes</button>
                <button className="category-button">favorite routes</button>
            </div>
            <div className="routes-result-container">

            </div>
          </div>
        </div>
      </div>
  );
};

export default GetRoute;
