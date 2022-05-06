import React from "react";
import TaskItem from "./TaskItem";
import inputs from "../inputs.module.css";
import buttons from "../buttons.module.css";
import styles from "./TaskDescription.module.css";
const TaskDescription = (props) => 
{
    if (Object.keys(props.selectedTask).length !== 0)
    {
      return (
        <React.Fragment>
          <div className="TaskDescriptionContainer">
            <h1 className="Container_titles">Task Description</h1>

            <h1 className={styles.title}> Task :</h1>
            <TaskItem
              Created_by={props.selectedTask.Created_by}
              Task_date={props.selectedTask.Task_date}
              Task_description={props.selectedTask.Task_description}
              Task_file_URL={props.selectedTask.Task_file_URL}
              Task_subject={props.selectedTask.Task_subject}
              Task_title={props.selectedTask.Task_title}
            />
            <h1 className={styles.title}> Description :</h1>
            <div className={styles.description}>
              {props.selectedTask.Task_description}
            </div>
            <h1 className={styles.title}> File Attachements :</h1>
            <a target="_blank" href={props.selectedTask.Task_file_URL}>
              {props.selectedTask.Task_file_URL}
            </a>

            <h1 className={styles.title}> File Upload :</h1>
            <input
              //onChange={fileHandler}
              type="file"
              className={inputs.drop_file}
              id="file_input"
              name="file"
            ></input>
            <div className={styles.center}>
              <button
                type="submit"
                className={` ${buttons.btn_long} ${buttons.btn_green} ${buttons.btn_submition}`}
              >
                Submit
              </button>
            </div>
          </div>
        </React.Fragment>
      );
    }
    else
    {      return (
      <React.Fragment>
        <div className="TaskDescriptionContainer">
          <h1 className="Container_titles">Task Description</h1>
        </div>
      </React.Fragment>
    );
        
    }
}

export default TaskDescription;