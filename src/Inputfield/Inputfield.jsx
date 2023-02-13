import React from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import inputs from "../Inputfield/inputs.module.css"
import buttons from "../buttons.module.css";

function Inputfield(props) {
  let input_className=inputs.form__input;
  let container_className=inputs.Inputfield_container;
  if(props.type=="code" )
  {
    input_className=inputs.code_input;
    container_className=inputs.Inputfield_container__code;
  }
  else if( props.type=="file")
  {
    input_className=inputs.file_input;
    container_className=inputs.Inputfield_container__file;
  }
  else
  {
    input_className=inputs.form__input;
    container_className=inputs.Inputfield_container;
  }

  return (
    <div className={container_className}>
     <div className={props.label ? inputs.Inputfield_labels_container : inputs.Inputfield_labels_container__empty}>
        <span className={inputs.Inputfield_label}>{props.label}</span>
        {props.sublabel ? <Link to={props.LinkTo} className={"link"}>{props.LinkText}</Link> : null}
    </div> 
    <input
    maxlength={props.maxLength}
    type={props.type}
    className={input_className}
    onChange={props.onChange}
    value={props.value}
    placeholder={props.placeholder}
    min={props.min}
    max={props.max}
    id={props.id}
    name={props.name}
  />
  </div>
  );
}

export default Inputfield;
// className={`${inputs.form__input} ${inputs.form__input__code}`}