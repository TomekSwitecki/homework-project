
import styles from "../buttons.module.css"
import React, { useState } from "react";

let ChosenSubject = "";
const SubjectItem = (props) => {
  //Data danego przedmiotu z App.jsx przekazywana przez propsy.
  let ChosenSubjectData = {
    id: props.id,
    name: props.name,
    description: props.description,
    addedStudents:props.addedStudents
  };

 
  const SelectSubject = (event) => {

    ChosenSubject = props.name;
    props.onSubjectSelected(ChosenSubjectData);
    console.log(ChosenSubjectData);

  };


  return (
    <button
      title={"Subject Description : " + props.description}
      className={
        props.name === ChosenSubject
          ? styles["btn-subject-active"]
          : styles["btn-subject"]
      }
      onClick={SelectSubject}
    >
      {props.name + " "}
    </button>
  );
};

export default SubjectItem;
