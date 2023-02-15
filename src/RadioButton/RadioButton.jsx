import React from "react";
import radioButton from "./RadioButton.module.css";


function RadioButton(props) {


  if (!props.checked) {
    return (
      <label className={`${radioButton[`label_${props.color}`]}`}>
        <input type="radio" id={props.id} name={props.name} value={props.value} onChange={props.onChange} defaultChecked={props.isDefaultChecked}></input>{props.label}
      </label>
    );
  }

}

export default RadioButton;
