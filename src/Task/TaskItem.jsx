import React, { useState } from "react";
import Tag from "../Tag/Tag";
import styles from "./TaskItem.module.css";
import inprogress_icon from "../icons/icon_inprogress.svg";
import completed_icon from "../icons/icon_completed.svg";
let ChosenTask = "";

const TaskItem = (props) => {


  let ChosenSubjectData = {
    Created_by:props.Created_by,
    Task_date:props.Task_date,
    Task_description:props.Task_description,
    Task_file_URL:props.Task_file_URL,
    Task_subject:props.Task_subject,
    Task_title:props.Task_title,
  };

  const SelectTask = () => {
    ChosenTask = props.Task_title;
    props.onTaskSelected(ChosenSubjectData);
  };


  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const date_YYMMDD = [year, month, day].join(".");
  //console.log(date_YYMMDD);

  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const firstDate = new Date();
  //console.log(firstDate.toLocaleDateString());
  const dueDate = new Date(props.Task_date);
  //console.log(dueDate);
  var diffDays = Math.round((firstDate - dueDate) / oneDay) * -1;
  //console.log(diffDays.toLocaleString());
  // const diffHours = (diffDays % 1) * 24;
  //console.log(diffHours);






  return (
    <React.Fragment>
      <button
        onClick={SelectTask}
        className={
          props.Task_title === ChosenTask
            ? styles["TaskItem__active"]
            : styles["TaskItem"]
        }
        // className={styles.TaskItem__active}
      >
        {/* {props.id + " "} */}
        <div className={styles.TaskItemWrapper}>
          <div className={styles.TaskItemTitleContainer}>
            <span className={styles.TaskName}>
              {" "}
              {props.Task_title + " "}
            </span>

          </div>

          <div className={styles.TaskItemDateContainer}>
            <span className={styles.TaskDeadlineDate}>
              {props.Task_date + " "}
            </span>
            <span className={styles.TaskDaysRemaining}>
              {/* condition1 ? result1 : condition2 ? result3 : result4 */}
              {diffDays > 0
                ? diffDays + " days remaining"
                : diffDays < 0
                ? null
                : diffDays == 0
                ? "Today"
                : ""}
            </span>
          </div>
          {diffDays > 0 ? (
            <Tag icon={inprogress_icon}  text={"In progress"} color="blue"></Tag>
            // <box-icon name="time" type="solid" color="#F69400"></box-icon>
          ) : diffDays < 0 ? (
            <Tag icon={completed_icon} text={"Completed"} color="green"></Tag>
            // <box-icon
            //   name="check-square"
            //   type="solid"
            //   color="#7FE789"
            // ></box-icon>
          ) : diffDays == 0 ? (
            <Tag icon={inprogress_icon} text={"Completed"} color="blue"></Tag>
            // <box-icon name="time-five" type="solid" color="#FF6635"></box-icon>
          ) : (
            ""
          )}
        </div>

        {/* {props.description + " "} */}
      </button>
    </React.Fragment>
  );
};

export default TaskItem;
