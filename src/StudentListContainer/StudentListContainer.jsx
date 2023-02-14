import React from "react";
import Button from "../Button/Button";
import ActionBar from "../Task/ActionBar";
import TaskItem from "../Task/TaskItem";
import TaskAdd from "../Task/TaskAdd";
import Heading from "../Heading/Heading";
import styles from "../StudentListContainer/StudentListContainer.module.css"
import StudentItem from "../Students/StudentItem";
import Placeholder from "../Placeholder/Placeholder";
import students_placeholder from "../Ilustrations/placeholder_students.svg";
const StudentListContainer=(props)=>
{



  if(props.filteredStudents.length!=0)
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
  );}
  else
  {
    return (

      <div className={styles.StudentItem__Container}>
        <div className={styles.Heading_container}>
        <Heading small Heading="Student List" Subheading="View your student list."></Heading>
        </div>
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
     
    <Placeholder Heading="No students added yet" Subheading="No student has joined this class yet. Once they join, they will be listed here!" img={students_placeholder}></Placeholder>
    </div>);
  }
}

export default StudentListContainer;