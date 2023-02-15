import React, { useState } from "react";
import fire from "../config/fire";
import Button from "../Button/Button";
import FlexContainer from "../FlexContainer/FlexContainer";
import Divider from "../Divider/Divider";
import Inputfield from "../Inputfield/Inputfield";
import Modal from "../Modal/Modal";
import modal from "../Modal/Modal.module.css";
import Heading from "../Heading/Heading";
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
            id: props.subjectArraySize,
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
  <Modal>
    <form className={modal.form_container} onSubmit={submitHandler}>
      <FlexContainer props={{ gap: "16", direction:"column", height:"full" }}>
      <FlexContainer props={{ gap: "16", margin: "16" }}>
        <FlexContainer props={{ gap: "16" }}>
          <Heading small Heading="Create Task" Subheading="Create task assigned to the currently selected class." ></Heading>
          <Divider type="normal" size="full"></Divider>
        </FlexContainer>
        <FlexContainer props={{ gap: "16" }}>
          <Inputfield required value={enteredTaskTitle} type="text" onChange={taskNameChangeHandler} label={"Task Title"}></Inputfield>
          <Inputfield required value={enteredDate} type="date" onChange={dateHandler} label={"Task Deadline"} min={date_prepared} max="2100-12-31"></Inputfield>
          <Inputfield required value={enteredTaskDescription} type="text" onChange={taskDescriptionHandler} label={"Task Description"}></Inputfield>
          <Inputfield id="file_input" name="file" required  type="file" onChange={fileHandler} label={"File Upload"}></Inputfield>
        <Divider type="normal"></Divider>
        <div className={modal.button_container}>
        <Button size="small"  color="white" text="Cancel"              
          onClick={() => {
                console.log("Cancel");
                props.onCancel();
              }} />  
            <Button size="full"  type="submit" color="orange" text="Create Task" disabled={submitionDisabled}></Button>
        </div>
        </FlexContainer>
      </FlexContainer>
      </FlexContainer> 
    </form>
     </Modal>
  );
}

export default TaskPopUp;
