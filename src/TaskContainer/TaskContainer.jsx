import React from "react";
import Button from "../Button/Button";
import ActionBar from "../Task/ActionBar";
import TaskItem from "../Task/TaskItem";
import TaskAdd from "../Task/TaskAdd";
import Heading from "../Heading/Heading";
import styles from "../TaskContainer/TaskContainer.module.css"
import Placeholder from "../Placeholder/Placeholder";
import task_placeholder from "../Ilustrations/placeholder_task.svg";
import FlexContainer from "../FlexContainer/FlexContainer";
const TaskContainer=(props)=>
{

  if(props.filteredTasks.length!=0)
  {
    return (
      <div className={styles.TaskContainer_Wrapper}>
         <div className={styles.Heading_container}>
             <Heading small Heading="Manage Tasks" Subheading="Manage your existing tasks or create new."  ></Heading>
             {props.role=="TEACHER" ? <Button onClick={props.TaskPopUpVisibility} size="small"  type="submit" color="green" text="+ Add New Task "  /> : null}
         </div>
        
         <div className={props.role=="TEACHER" ? styles.TaskItem__Container : styles.TaskItem__Container__full}>
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
       </div>
   );
  }
  else
  {
    return (
      <div className={styles.TaskContainer_Wrapper}>
      <div className={styles.Heading_container}>
          <Heading small Heading="No Tasks Created" Subheading="Create new task."  ></Heading>
          {props.role=="TEACHER" ? <Button onClick={props.TaskPopUpVisibility} size="small"  type="submit" color="green" text="+ Add New Task "  /> : null}
      </div>
      <FlexContainer props={{ gap: "16", direction:"column", height:"auto", align:"center" }}>
      </FlexContainer>
      </div>
    
    
    
    );
  }

}

export default TaskContainer;