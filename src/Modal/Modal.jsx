import React from "react";
import modal from "../Modal/Modal.module.css"


function Modal({ props, children }) {
  return (

    <div className={modal.modal_container}>
      {children}
    </div>
  );
}

export default Modal;






