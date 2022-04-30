import React, { useState } from "react";
import styles from "./TaskItem.module.css";

let ChosenTask = "";

const TaskItem = (props) => {


  let ChosenSubjectData = {
    id: 1,
    subject: props.subject,
    name: props.name,
    description:props.description,
    deadline: props.deadline
  };

  const SelectTask = () => {
    ChosenTask = props.name;
    props.onTaskSelected(ChosenSubjectData);
  };


  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const date_YYMMDD = [year, month, day].join(".");
  console.log(date_YYMMDD);

  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const firstDate = new Date();
  //console.log(firstDate.toLocaleDateString());
  const dueDate = new Date(props.deadline);
  //console.log(dueDate);
  var diffDays = Math.round((firstDate - dueDate) / oneDay) * -1;
  //console.log(diffDays.toLocaleString());
  // const diffHours = (diffDays % 1) * 24;
  //console.log(diffHours);






  return (
    <div>
      <button
        onClick={SelectTask}
        className={
          props.name === ChosenTask
            ? styles["TaskItem__active"]
            : styles["TaskItem"]
        }
        // className={styles.TaskItem__active}
      >
        {/* {props.id + " "} */}
        <div className={styles.TaskItemContainer}>
          <div>
            <box-icon name="file" type="solid" color="#b7b3b3"></box-icon>
          </div>
          <div className={styles.TaskItemTitleContainer}>
            <span className={styles.TaskName}> {props.name + " "}</span>
            <span className={styles.TaskSubject}> {props.subject + " "} </span>
          </div>

          <div className={styles.TaskItemDateContainer}>
            <span className={styles.TaskDeadlineDate}>
              {props.deadline + " "}
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
            <box-icon name="time" type="solid" color="#F69400"></box-icon>
          ) : diffDays < 0 ? (
            <box-icon
              name="check-square"
              type="solid"
              color="#7FE789"
            ></box-icon>
          ) : diffDays == 0 ? (
            <box-icon name="time-five" type="solid" color="#FF6635"></box-icon>
          ) : (
            ""()
          )}
        </div>

        {/* {props.description + " "} */}
      </button>
    </div>
  );
};

export default TaskItem;
