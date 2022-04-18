import React from "react"
import styles from "./TaskItem.module.css";
function TaskAdd(props)
{
return (
  <button className={styles.btn_task} onClick={props.onClick}>
    Create Task
  </button>
);

}

export default TaskAdd;