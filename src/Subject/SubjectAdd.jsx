import React from "react";
import buttons from "../buttons.module.css";

function SubjectAdd(props) {
  return (
    <button
      className={`${buttons.btn_wrapper} ${buttons.btn_orange}`}
      onClick={props.onClick}
    >
      Add Class
    </button>
  );
}

export default SubjectAdd;
