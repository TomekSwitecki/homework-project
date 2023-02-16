import React from "react";
import button from "../Button/Button.module.css";
import { Link } from "react-router-dom";
import active_indicator from './Underline.svg';


function Button(props) {


  if (props.linkTo) {
    return (
      <div className={`${[`expander__${props.size}`]}`}>
        <div className={button.button_container}>
          {props.icon != null ? <img className={button.button_icon_prepend} src={props.icon} alt="icon"></img> : null}
          <Link to={props.linkTo} state={props.state}>
            <button type={props.type} className={`${button.btn_wrapper} ${button[`btn_${props.color}`]}`} onClick={props.onClick}>
              {props.text}
            </button>
          </Link>
        </div>
{/* 
        <div className={button.button_ghost__active_indicator}>
          {props.active && props.color == "ghost" ? <img alt="active_indicator" src={active_indicator}></img> : null}
        </div> */}



      </div>
    );
  }
  else {
    return (
      <div className={`${[`expander__${props.size}`]}`}>
        <div className={button.button_container}>
          {props.icon != null ? <img className={button.button_icon_prepend} src={props.icon} alt="button_icon"></img> : null}
          <button type={props.type} className={`${button.btn_wrapper} ${button[`btn_${props.color}`]}`} onClick={props.onClick}>
            {props.text}
          </button>
        </div>
        <div className={button.button_ghost__active_indicator}>
          {props.active && props.color == "ghost" ? <img src={active_indicator} alt="button_icon"></img> : null}
        </div>
      </div>
    );
  }

}

export default Button;
