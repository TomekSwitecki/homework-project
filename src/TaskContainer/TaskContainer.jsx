import React from "react";
import Button from "../Button/Button";
import ActionBar from "../Task/ActionBar";
import TaskItem from "../Task/TaskItem";
import TaskAdd from "../Task/TaskAdd";
import Heading from "../Heading/Heading";
import styles from "../TaskContainer/TaskContainer.module.css"
const TaskContainer=(props)=>
{




  return (
    <div className={styles.TaskContainer_Wrapper}>
        <div className={styles.Heading_container}>
            <Heading small Heading="Manage Tasks" Subheading="Manage your existing tasks or create new."  ></Heading>
            <Button onClick={props.TaskPopUpVisibility} size="small"  type="submit" color="green" text="+ Add New Task "  />
        </div>
       
        <div className={styles.TaskItem__Container}>
        <table className={styles.TaskItem__Table}>
        <ActionBar a={"Task Title"} b={"Date"} c={"Status"}/>
        {props.filteredTasks.map((e, index) => (
        <TaskItem
            Created_by={e.Created_by}
            Task_date={e.Task_date}
            Task_description={e.Task_description}
            Task_file_URL={e.Task_file_URL}
            Task_subject={e.Task_subject}
            Task_title={e.Task_title}
            chosenSubject={props.selectedSubject}
            onTaskSelected={props.onTaskSelectedDataHandler}
        />
        ))}
      </table>
        </div>
        {/* {props.rola === "TEACHER" ? (
        <TaskAdd onClick={props.TaskPopUpVisibility} />
        ) : null} */}
      </div>
  );
}

export default TaskContainer;