import React from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import inputs from "../Inputfield/inputs.module.css"
import buttons from "../buttons.module.css";

function Inputfield(props) {

  return (
    <div className={inputs.Inputfield_container}>
    <div className={inputs.Inputfield_labels_container}>
        <span className={inputs.Inputfield_label}>{props.label}</span>
        {props.sublabel ? <Link to={props.LinkTo} className={"link"}>{props.LinkText}</Link> : null}
    </div>
    <input
    className={`${inputs.form__input}`}
    onChange={props.onChange}
    value={props.value}
    type={props.type}
    placeholder={props.placeholder}
  />
  </div>
  );
}

export default Inputfield;
