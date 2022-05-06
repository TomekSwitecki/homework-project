import React from "react";
import styles from "./StudentItem.module.css";
const StudentItem = (props) => {
  return (
    <div className={styles.student_item}>
      <div>
        <input type="checkbox" id="selected" className="checkbox" />
      </div>
      <div>
        <img
          draggable="false"
          className={styles.user_profile_picture}
          src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
        ></img>
      </div>
      <div>{props.f_name + " " + props.l_name}</div>
      <div>{props.mail}</div>
      <div>{props.date}</div>
      <div className={styles.statusbar}>
        {/* <box-icon className={styles.statusbar} name="polygon" type="solid" color="#08f70d"></box-icon> */}
      </div>
    </div>
  );
};

export default StudentItem;
