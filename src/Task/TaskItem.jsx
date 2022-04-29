import React from "react";
import styles from "./TaskItem.module.css";

let ChosenTask = "";

const TaskItem = (props) => {
  // console.log(new Date().toLocaleDateString());
  // console.log(props.deadline);
  // const firstDate = new Date().toLocaleDateString();
  // const deadline = props.deadline;
  // // To calculate the time difference of two dates
  // var Difference_In_Time = firstDate.getTime() - deadline.getTime();
  // var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

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
              {"2 days remaining"}
            </span>
          </div>

          <box-icon name="check-square" type="solid" color="#7fe789"></box-icon>
        </div>

        {/* {props.description + " "} */}
      </button>
    </div>
  );
};

export default TaskItem;
