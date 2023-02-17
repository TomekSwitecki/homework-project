import React from "react";
import button from "../Button/Button.module.css";

function IconButton(props) {
    return (
            <button  className={button.button__icon_container}  onClick={props.onClick}>
             <img className={button.button__icon}  src={props.icon}></img>
            </button>
    );
}

export default IconButton;
