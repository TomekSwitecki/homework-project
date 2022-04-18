import React from "react";
import styles from "./StudentItem.module.css";
const StudentItem = (props) => {
  return (
    <div className={styles.student_item}>
      <div>
        <input type="checkbox" id="selected" className="checkbox" />
      </div>
      <div>
        <box-icon name="male" color="#090a09"></box-icon>
      </div>
      <div>{props.name}</div>
      <div>{props.mail}</div>
      <div>{props.date}</div>
      <div>
        <box-icon name="polygon" type="solid" color="#08f70d"></box-icon>
      </div>
    </div>
  );
};

export default StudentItem;
