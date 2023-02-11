import React from "react";
import style from "./Tag.module.css";


function Tag(props) {

  return (
    <div className={`${style[`tag_container__${props.color}`]}`}>
        <img src={props.icon}></img>
        {props.text}
    </div>
  );
}

export default Tag;