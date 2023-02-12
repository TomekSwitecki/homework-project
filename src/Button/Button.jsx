import React from "react";
import buttons from "../buttons.module.css";

import { Link } from "react-router-dom";

import active_indicator from './Underline.svg';


function Button(props) {


  if(props.linkTo)
  {
    return (
      <div className={`${[`expander__${props.size}`]}`}>
        <div className={buttons.button_container}>
        {props.icon!=null ? <img className={buttons.button_icon_prepend} src={props.icon}></img> : null}
        <Link to={props.linkTo} state={props.state}>
        <button type={props.type}  className={`${buttons.btn_wrapper} ${buttons[`btn_${props.color}`]}`} onClick={props.onClick}>
            {props.text}
        </button>
        </Link>
        </div>
        
        <div className={buttons.button_ghost__active_indicator}>
         {props.active && props.color=="ghost" ? <img src={active_indicator}></img> : null} 
       </div> 
  
       
  
      </div>
    );
  }
  else
  {
    return (
      <div className={`${[`expander__${props.size}`]}`}>
        <div className={buttons.button_container}>
        {props.icon!=null ? <img className={buttons.button_icon_prepend} src={props.icon}></img> : null}
        <button type={props.type} className={`${buttons.btn_wrapper} ${buttons[`btn_${props.color}`]}`} onClick={props.onClick}>
            {props.text}
        </button>
        </div>
        <div className={buttons.button_ghost__active_indicator}>
         {props.active && props.color=="ghost" ? <img src={active_indicator}></img> : null} 
       </div> 
      </div>
    );
  }

}

export default Button;
