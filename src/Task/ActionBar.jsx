import React from "react";
import styles from "./ActionBar.module.css";
const ActionBar = (props) => {
  return (

    <tr className={styles.actionBar_container}>
      <th className={styles.actionBar_header}>{props.a}</th>
      <th className={styles.actionBar_header}>{props.b}</th>
      <th className={styles.actionBar_header}>{props.c}</th>
    </tr>

  );

}

export default ActionBar;