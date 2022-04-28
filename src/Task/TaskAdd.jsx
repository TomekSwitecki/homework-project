import React from "react"
import buttons from "../buttons.module.css";
import styles from "./TaskItem.module.css"
function TaskAdd(props)
{
return (
  <button
    className={`${styles.btn_task} ${buttons.btn_normal} ${buttons.btn_green}  `}
    onClick={props.onClick}
  >
    Create Task
  </button>
);

}

export default TaskAdd;