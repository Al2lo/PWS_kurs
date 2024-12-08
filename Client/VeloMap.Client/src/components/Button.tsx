import React from "react";
import "../styles/ButtonStyles.css";

interface ButtonProps {
  text: string;
  buttonImg: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, buttonImg, onClick }) => {
  return (
    <div className="button-block">
        <button className="custom-button" onClick={onClick}>
            <span className="button-text">{text}</span>
            <span className="button-icon"></span>
        </button>
        <img className="button-img" src={buttonImg}/>
    </div>
  );
};

export default Button;
