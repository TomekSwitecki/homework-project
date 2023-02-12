import React from "react"
import buttons from "../buttons.module.css";

function SubjectCreate(props) {
  return (
    <button
      className={`${buttons.btn_wrapper} ${buttons.btn_orange}`}
      onClick={props.onClick}
    >
      Create Class
    </button>
  );
}

export default SubjectCreate;