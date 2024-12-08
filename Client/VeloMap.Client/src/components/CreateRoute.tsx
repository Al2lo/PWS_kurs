import React from "react";
import '../styles/CreateRouteStyles.css'


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateRoute: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div>
          dfkjdl
        </div>
      </div>
    </div>
  );
};


export default CreateRoute;
