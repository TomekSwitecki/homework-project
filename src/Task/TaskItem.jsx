import { child, get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import Tag from "../Tag/Tag";
import styles from "./TaskItem.module.css";
import inprogress_icon from "../icons/icon_inprogress.svg";
import completed_icon from "../icons/icon_completed.svg";
import late_icon from "../icons/icon_late.svg";
import negative_icon from "../icons/icon_x.svg";
import { getSubmitionDate } from '../utilities/StudentDatabase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
let ChosenTask = "";

const TaskItem = (props) => {

  let ChosenSubjectData = {
    id: props.id,
    Created_by:props.Created_by,
    Task_date:props.Task_date,
    Task_description:props.Task_description,
    Task_file_URL:props.Task_file_URL,
    Task_subject:props.Task_subject,
    Task_title:props.Task_title,
  };

  const SelectTask = () => {
    // console.log(ChosenTask);
    ChosenTask = props.Task_title;
    props.onTaskSelected(ChosenSubjectData);
    // console.log(props.id);
    // console.log(ChosenTask);
  };


  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const date_YYMMDD = [year, month, day].join(".");
  //console.log(date_YYMMDD);

  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const firstDate = new Date();

  const dueDate = new Date(props.Task_date);

  var diffDays = Math.round((firstDate - dueDate) / oneDay) * -1;


  const [SubmitionDate, setSubmitionDate] = useState("-");

  useEffect(() => {
    if (ChosenSubjectData && Object.keys(ChosenSubjectData).length !== 0) {
      getSubmitionDate(ChosenSubjectData, getAuth().currentUser.email).then((date) => {
        setSubmitionDate(date);
        
      });
    }
  }, [ChosenSubjectData, getAuth().currentUser.email]);

  let tag;


    if(props.role=="STUDENT")
    {
      if (props.Task_date > SubmitionDate && SubmitionDate != "-") {
        tag = <Tag icon={completed_icon} text={"Submitted"} color="green"></Tag>
      }
      else if (props.Task_date < SubmitionDate && SubmitionDate != "-") {
        tag = <Tag icon={late_icon} text={"Overdue"} color="yellow"></Tag>
      }
      else if (SubmitionDate === "-") {
        tag = <Tag icon={negative_icon} text={"Not submitted"} color="red"></Tag>
      }
    }
    else
    {
      if(diffDays > 0)
      {
        tag= <Tag icon={inprogress_icon}  text={"In progress"} color="blue"></Tag>
      }
      else if (diffDays < 0)
      {
        tag=<Tag icon={completed_icon} text={"Completed"} color="green"></Tag>
      }
      else if (diffDays == 0)
      {
        tag= <Tag icon={inprogress_icon} text={"Completed"} color="blue"></Tag>
      }
    }



  return (
    <React.Fragment>
      <tr onClick={SelectTask}         
      className={
          props.Task_title === ChosenTask
            ? styles["TaskItem__active"]
            : styles["TaskItem"]
        }>
      <td className={styles.title_cell}>
        {props.Task_title}
      </td>
      <td className={styles.deadline_cell}>    
        <span className={styles.TaskDeadlineDate}>
            {props.Task_date + " "}
          </span></td>
      <td className={styles.tag_cell}> 
      {tag}
        {/* {diffDays >= 0 ? (
            <Tag icon={inprogress_icon}  text={"In progress"} color="blue"></Tag>
          ) : diffDays < 0 ? (
            <Tag icon={completed_icon} text={"Completed"} color="green"></Tag>
          ) : (
            ""
          )} */}
          </td>
      </tr>
    </React.Fragment>
  );
};

export default TaskItem;
