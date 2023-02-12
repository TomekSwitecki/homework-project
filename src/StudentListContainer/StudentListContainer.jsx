import React from "react";
import Button from "../Button/Button";
import ActionBar from "../Task/ActionBar";
import TaskItem from "../Task/TaskItem";
import TaskAdd from "../Task/TaskAdd";
import Heading from "../Heading/Heading";
import styles from "../StudentListContainer/StudentListContainer.module.css"
import StudentItem from "../Students/StudentItem";
const StudentListContainer=(props)=>
{




  return (
    <div className={styles.StudentContainer_Wrapper}>
        <div className={styles.Heading_container}>
        <Heading small Heading="Student List" Subheading="View your student list."></Heading>
        </div>
       
        <div className={styles.StudentItem__Container}>
        <table className={styles.StudentItem__Table}>
        <ActionBar a={"Name"} b={"Submition Date"} c={"Status"} />
        {props.filteredStudents.map((e, index) => (
              <StudentItem
                //id={e.index}
                selectedTask={props.selectedTask}
                f_name={e.f_name}
                l_name={e.l_name}
                mail={e.email}
                // date={e.Date}
                // status={e.Status}
              />
        ))}
      </table>
        </div>
  </div>
  );
}

export default StudentListContainer;