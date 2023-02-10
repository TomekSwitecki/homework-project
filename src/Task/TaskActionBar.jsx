import React from "react";
import styles from "./TaskActionBar.module.css";
const TaskActionBar=()=>
{
return (

  <tr className={styles.actionBar_container}>
  <th className={styles.actionBar_header}>Task Title</th>
  <th className={styles.actionBar_header}>Date</th>
  <th className={styles.actionBar_header}>Status</th>
</tr>

);

}

export default TaskActionBar;