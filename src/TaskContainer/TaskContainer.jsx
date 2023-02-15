import React from "react";
import Button from "../Button/Button";
import ActionBar from "../Task/ActionBar";
import TaskItem from "../Task/TaskItem";
import Heading from "../Heading/Heading";
import taskContainer from "../TaskContainer/TaskContainer.module.css"
import Placeholder from "../Placeholder/Placeholder";
import task_placeholder from "../Ilustrations/placeholder_task.svg";


const TaskContainer = (props) => {
  let TaskContainer_Teacher_Content =
    <div className={taskContainer.TaskContainer_Wrapper}>
      <div className={taskContainer.Heading_container}>
        <Heading small Heading="Manage Tasks" Subheading="Manage your existing tasks or create new."  ></Heading>
        <Button onClick={props.TaskPopUpVisibility} size="small" type="submit" color="green" text="+ Add New Task " />
      </div>
      <div className={taskContainer.TaskItem__Container}>
        <table className={taskContainer.TaskItem__Table}>
          <ActionBar a={"Task Title"} b={"Date"} c={"Status"} />
          {props.filteredTasks.map((e, index) => (
            <TaskItem
              id={index}
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
    </div>;

  let TaskContainer_Teacher_Empty =
    <div className={taskContainer.TaskContainer_Wrapper}>
      <div className={taskContainer.Heading_container}>
        <Heading small Heading="No Tasks Created" Subheading="Create new task."  ></Heading>
        <Button onClick={props.TaskPopUpVisibility} size="small" type="submit" color="green" text="+ Add New Task " /> 
      </div>
      <div className={taskContainer.TaskItem__Container__full}>
        <table className={taskContainer.TaskItem__Table}>
          <ActionBar a={"Task Title"} b={"Date"} c={"Status"} />
          {props.filteredTasks.map((e, index) => (
            <TaskItem
            id={index}
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
      <Placeholder Heading="No tasks created" Subheading="This subject doesn’t have any tasks created yet." img={task_placeholder}></Placeholder>
    </div>;

    let TaskContainer_Student_Content=   
    <div className={taskContainer.TaskContainer_Wrapper}>
    <div className={taskContainer.Heading_container}>
    <Heading small Heading="View Tasks" Subheading="Explore tasks assigned to selected subject."  ></Heading>
    </div>
    <div className={taskContainer.TaskItem__Container__full}>
      <table className={taskContainer.TaskItem__Table}>
        <ActionBar a={"Task Title"} b={"Date"} c={"Status"} />
        {props.filteredTasks.map((e, index) => (
          <TaskItem
            id={index}
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
    </div>;
    
    
    let TaskContainer_Student_Empty=
    <div className={taskContainer.TaskContainer_Wrapper}>
      <div className={taskContainer.Heading_container}>
        <Heading small Heading="No Tasks Available" Subheading="No tasks have been created in this subject."  ></Heading>
      </div>
      <div className={taskContainer.TaskItem__Container__full}>
        <table className={taskContainer.TaskItem__Table}>
          <ActionBar a={"Task Title"} b={"Date"} c={"Status"} />
          {props.filteredTasks.map((e, index) => (
            <TaskItem
            id={index}
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
      <Placeholder Heading="No tasks created" Subheading="This subject doesn’t have any tasks created yet." img={task_placeholder}></Placeholder>
    </div>;    
    
  if( props.role == "TEACHER" )
  {
    if (props.filteredTasks.length != 0) 
    {
      return (TaskContainer_Teacher_Content);
    }
    else
    {
      return (TaskContainer_Teacher_Empty);
    }
  }
  else
  {
    if (props.filteredTasks.length != 0) 
    {
      return (TaskContainer_Student_Content);
    }
    else
    {
      return (TaskContainer_Student_Empty);
    }

  }



}

export default TaskContainer;