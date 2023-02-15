
import React, { useState } from "react";
import navbarButton from "../Navbar/NavbarButton.module.css"
let ChosenSubject = "";
const NavbarButton = (props) => {
  //Data danego przedmiotu z App.jsx przekazywana przez propsy.
  let ChosenSubjectData = {
    id: props.id,
    name: props.name,
    description: props.description,
    addedStudents: props.addedStudents
  };


  const SelectSubject = (event) => {
    ChosenSubject = props.name;
    props.onSubjectSelected(ChosenSubjectData);
    console.log(props.key);
  };


  return (

    <div className={navbarButton.NavbarButton_container}>
      <button
        id={props.id}
        title={"Subject Description : " + props.description}
        className={
          props.name === ChosenSubject 
            ? navbarButton["btn-subject-active"]
            : navbarButton["btn-subject"]
        }
        onClick={!props.logout ? SelectSubject : props.logout}
      >
        {props.name + " "}
      </button>
    </div>

  );
};

export default NavbarButton;
