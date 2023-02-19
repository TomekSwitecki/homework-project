import React from "react";
import { Link } from "react-router-dom";
import inputfield from "../Inputfield/Inputfield.module.css"


function Inputfield(props) {
  let input_className = inputfield.form__input;
  let container_className = inputfield.Inputfield_container;
  if (props.type == "code") {
    input_className = inputfield.code_input;
    container_className = inputfield.Inputfield_container__code;
  }
  else if (props.type == "file") {
    input_className = inputfield.file_input;
    container_className = inputfield.Inputfield_container__file;
  }
  else {
    input_className = inputfield.form__input;
    container_className = inputfield.Inputfield_container;
  }

  return (
    <div className={container_className}>
      <div className={props.label ? inputfield.Inputfield_labels_container : inputfield.Inputfield_labels_container__empty}>
        <span className={inputfield.Inputfield_label}>{props.label}</span>
        {props.sublabel ? <Link state={props.state} to={props.LinkTo} className={"link"}>{props.LinkText}</Link> : null}
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
// className={`${inputfield.form__input} ${inputfield.form__input__code}`}