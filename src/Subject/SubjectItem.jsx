import React from "react";
import styles from "../buttons.module.css"
let ChosenSubject = "";

const SubjectItem = (props) => {
  //Data danego przedmiotu z App.jsx przekazywana przez propsy.
  let ChosenSubjectData = {
    id: props.id,
    name: props.name,
    description: props.description
  };

  const SelectSubject = () => {
    ChosenSubject = props.name;
    props.onSubjectSelected(ChosenSubjectData);
    console.log(ChosenSubjectData);
  };

  return (
    <button
      className={
        props.name === ChosenSubject ? styles['btn-subject-active'] : styles['btn-subject']
      }
      onClick={SelectSubject}
    >
      {props.name + " "}
    </button>
  );
};

export default SubjectItem;
