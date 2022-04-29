import React from "react";
import styles from "./TaskActionBar.module.css";
const TaskActionBar=()=>
{
return (
  <div className={styles.actionBar_container}>
    <div className={styles.title_container}>Task Title </div>
    <div>Date</div>
    <div>Status</div>
  </div>
);

}

export default TaskActionBar;