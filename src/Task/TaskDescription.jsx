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

import {
  ref,
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import DownloadContent from "../DownloadContent/DownloadContent";
import Divider from "../Divider/Divider";
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
          <div className={styles.TaskDescriptionContainer}>
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
            <div>
              <h1 className={styles.title}> File Attachements :</h1>
              <DownloadContent size="full" href={props.selectedTask.Task_file_URL}></DownloadContent>
              {/* <a target="_blank" href={props.selectedTask.Task_file_URL}>
                "Download attached files"
              </a> */}
            </div>
            {/* <h1 className={styles.title}> File Upload :</h1>
            <input
            required
              onChange={fileHandler}
              type="file"
              className={inputs.drop_file}
              id="file_input"
              name="file"
            ></input>
            <div className={styles.center}>
              <button
                disabled={submitionDisabled}
                onClick={submitHandler}
                type="submit"
                className={` ${buttons.btn_long} ${buttons.btn_green} ${buttons.btn_submition}`}
              >
                Submit
              </button>
            </div> */}
          </div>
        </React.Fragment>
      );
    }
    else
    {      return (
      <React.Fragment>
          <div className={styles.TaskDescriptionContainer__empty}>
            <Heading small Heading="View Task" Subheading="Explore content of existing task"></Heading>
            </div>
      </React.Fragment>
    );
        
    }
}

export default TaskDescription;