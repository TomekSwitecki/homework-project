import React from "react";
import TaskItem from "./TaskItem";
import inputs from "../inputs.module.css";
import buttons from "../buttons.module.css";
import styles from "./TaskDescription.module.css";
import { useState } from "react";
import fire from "../config/fire";
import { getAuth, onAuthStateChanged, auth } from "firebase/auth";
import { getDatabase, ref as dRef, child, get, push, set } from "firebase/database";
import Heading from "../Heading/Heading";
import Inputfield from "../Inputfield/Inputfield";
import {
  ref,
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import DownloadContent from "../DownloadContent/DownloadContent";
import Divider from "../Divider/Divider";
import FlexContainer from "../FlexContainer/FlexContainer";
import Button from "../Button/Button";
import Placeholder from "../Placeholder/Placeholder";
import students_placeholder from "../Ilustrations/placeholder_students.svg";
import task_placeholder from "../Ilustrations/placeholder_task.svg";
const _ = require("lodash"); 
// import {
//   getStorage,
//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
// } from "firebase/storage";

const TaskDescription = (props) => 
{


  async function fetchTaskAnswer(file_url) {
              const TaskAnswer = {
                [props.userEmail.split(".")[0]]: {
                  Student_Email:props.userEmail,
                  Task_file_URL: file_url,
                  Task_Status: "unreviewed",
                  Task_Submition_Date:new Date().toISOString().split('T')[0]
                },
              };
    console.log(props.selectedTask);
    console.log(props.userEmail);
    const dbRef = dRef(getDatabase());
    get(child(dbRef, `task/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
        Object.entries(snapshot.val()).forEach(([key, value]) => {
          //console.log(_.isEqual(value, props.selectedTask));
          //rozwiazanie tymczasowe baaardzo kiepskie
          if (
            value.Task_subject == props.selectedTask.Task_subject &&
            value.Task_description == props.selectedTask.Task_description
          ) {
            console.log("znalazlem");
            console.log("Fetching created subject data to database");
            const database = getDatabase();
            push(dRef(database, "task/" + key + "/answers"), TaskAnswer);
                      if (document.querySelector("#file_input").value != "") {
                        document.querySelector("#file_input").value = "";
                      }
                      alert("Succesfully uploaded");
          }
          // console.log(key, value);
          // console.log(value);
        });
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    

  }




    const fileUploadHandler = () => {
      const storage = getStorage();
      console.log(file);
      // Create the file metadata
      /** @type {any} */

      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(storage, "answers/" + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;

            // ...

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            fetchTaskAnswer(downloadURL);
          });
        }
      );
    };


  const [file, setFile] = useState({});
  const [submitionDisabled, setSubmitionState] = useState(false);

  const fileHandler = (event) => {
    //setFile(event.target.value);
    setFile(event.target.files[0]);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (event.disabled) 
    {
      return;
    }

    setSubmitionState({ disabled: true });
    console.log(file);
    //fetchTaskAnswer();
    fileUploadHandler();
  };



    if (Object.keys(props.selectedTask).length !== 0)
    {
      return (
        <React.Fragment>
          <div className={props.role=="STUDENT" ? styles.TaskDescriptionContainer : styles.TaskDescriptionContainer__teacher }>
          {/* <div className={styles.TaskDescriptionContainer}> */}
            <div className={styles.TaskDescriptionHeading}>
            <Heading small Heading="Task Details" Subheading="Explore content of selected task."></Heading>
            </div>
            <div>
            <table className={styles.TableContainer}>
              <tr>
                <thead></thead>
                <thead></thead>
                <thead></thead>
              </tr>
            <TaskItem
              Created_by={props.selectedTask.Created_by}
              Task_date={props.selectedTask.Task_date}
              Task_description={props.selectedTask.Task_description}
              Task_file_URL={props.selectedTask.Task_file_URL}
              Task_subject={props.selectedTask.Task_subject}
              Task_title={props.selectedTask.Task_title}
            />
            </table>
            </div>
            <div className={styles.DescriptionContainer}>
            <h1 className={styles.title}> Description :</h1>

            <div className={styles.description}>
              {props.selectedTask.Task_description}
            </div>
            </div>
            {props.role!="TEACHER" ? 
            <div>
              <h1 className={styles.title}> File Attachements </h1>
              <DownloadContent size="full" href={props.selectedTask.Task_file_URL}></DownloadContent>
            </div> : null }
            {props.role=="STUDENT" ? 
            <FlexContainer props={{ gap: "16", direction:"column", height:"auto", align:"center" }}>
            <Inputfield id="file_input"   name="file" required  type="file" onChange={fileHandler} label={"File Upload"}></Inputfield>
            <Button size="small" disabled={submitionDisabled} onClick={submitHandler} type="submit" color="green" text="Submit"></Button>
            </FlexContainer> : null}
          </div>
        </React.Fragment>
      );
    }
    else if (Object.keys(props.selectedTask).length == 0 && props.TaskNumber.length != 0)
    {      return (
      <React.Fragment>
          <div className={styles.TaskDescriptionContainer__empty}>
            <Heading small Heading="No Task Selected" Subheading="Select task from list above to view task details."></Heading>
            {props.role=="STUDENT" ? <Placeholder Heading="No task selected" Subheading="Select task from list above to view details" img={task_placeholder} ></Placeholder>: null}
           
            </div>
      </React.Fragment>
    );
        
    }
    else if (Object.keys(props.selectedTask).length == 0 && props.TaskNumber.length == 0 )
    {
      return(null);
    }
}

export default TaskDescription;