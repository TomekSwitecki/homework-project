import React, { useState } from "react";
import popup from "../popup.module.css";
import buttons from "../buttons.module.css";
import inputs from "../inputs.module.css";
import fire from "../config/fire";
import { getAuth, onAuthStateChanged, auth } from "firebase/auth";
import {
  getDatabase,
  child,
  get,
  update,
  push,
  set,
} from "firebase/database";


import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";



function TaskPopUp(props) {
  const [enteredTaskTitle, setEnteredTaskTitle] = useState("");
  const [enteredTaskDescription, setEnteredTaskDescription] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [file, setFile] = useState({});
  const [fileURL, setURL] = useState("");
  

  const taskNameChangeHandler = (event) => {
    setEnteredTaskTitle(event.target.value);
  };
  const taskDescriptionHandler = (event) => {
    setEnteredTaskDescription(event.target.value);
  };

  const dateHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const fileHandler = (event) => {
    //setFile(event.target.value);
    setFile(event.target.files[0]);
  };

  const fileUploadHandler = () => {
    const storage = getStorage();
    console.log(file);
    // Create the file metadata
    /** @type {any} */

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, "images/" + file.name);
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
          setURL(downloadURL);
          console.log(enteredDate);
          const CreatedTaskData = {
            //id: props.subjectArraySize,
            Task_subject: props.selectedSubject,
            Task_title: enteredTaskTitle,
            Task_description: enteredTaskDescription,
            Task_date: enteredDate,
            Created_by: getAuth(fire).currentUser.email,
            Task_file_URL: downloadURL,
          };

          console.log(CreatedTaskData);
          props.onCreatedTask(CreatedTaskData);
          setEnteredTaskTitle("");
          setEnteredTaskDescription("");
          setEnteredDate("");
          if (document.querySelector("#file_input").value != "") {
            document.querySelector("#file_input").value = "";
          }
        });
      }
    );
  };

  const [submitionDisabled,setSubmitionState]=useState(false);
  const submitHandler = (event) => {
    event.preventDefault();
        if (event.disabled) {
          return;
        }
        setSubmitionState({ disabled: true });
    if (
      enteredTaskTitle !== "" &&
      enteredTaskDescription !== "" &&
      enteredDate !== "" 
    ) {
      fileUploadHandler(file);
    } else {
      console.log("No data inserted");
    }
  };



  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const date_prepared = [year, month, day].join("-");



  return (
    <div className={popup.popUp}>
      <form onSubmit={submitHandler}>
        <div className={popup.popUpTitle}>Create task</div>
        <hr />
        <div className={popup.sectionTitles}>Task title</div>

        <input
          required
          onChange={taskNameChangeHandler}
          value={enteredTaskTitle}
          type="text"
          placeholder="Enter task name..."
          className={`${inputs.form__input} ${inputs.form__input__normal}`}
        />

        <div className={popup.sectionTitles}>Completition Date</div>

        <div className={popup.date_input_container}>
          <input
            value={enteredDate}
            onChange={dateHandler}
            className={popup.date_input}
            type="date"
            min={date_prepared}
            max="2025-12-31"
            required
          />
        </div>

        <div className={popup.sectionTitles}>Subject Description</div>
        <input
          required
          onChange={taskDescriptionHandler}
          value={enteredTaskDescription}
          type="text"
          placeholder="Enter subject description..."
          className={`${inputs.form__input} ${inputs.form__input__normal}`}
        />

        <div className={popup.sectionTitles}>File attachments</div>

        <input
          onChange={fileHandler}
          type="file"
          className={inputs.drop_file}
          id="file_input"
          name="file"
        ></input>

        <div className={popup.button_container}>
          <button
            className={`${buttons.btn_normal} ${buttons.btn_cancel}`}
            onClick={() => {
              console.log("Cancel");
              props.onCancel();
            }}
          >
            Cancel
          </button>

          <button
            type="submit"
            className={`${buttons.btn_long} ${buttons.btn_green}`}
            disabled={submitionDisabled}
          >
            Create task
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskPopUp;
