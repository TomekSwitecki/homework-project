import { getAuth } from "firebase/auth";
import { child, get, getDatabase, push, ref } from "firebase/database";
import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import fire from "../config/fire";
import Divider from "../Divider/Divider";
import FlexContainer from "../FlexContainer/FlexContainer";
import Heading from "../Heading/Heading";
import Inputfield from "../Inputfield/Inputfield";
import Modal from "../Modal/Modal";
import modal from "../Modal/Modal.module.css";
import subjectModal from "./SubjectModal.module.css";
import { showSuccessMessage, showErrorMessage, showInfoMessage } from '../utilities/Notifications';


function SubjectPopUp(props) {
  const [enteredSubjectName, setEnteredSubjectName] = useState("");
  const [enteredSubjectDescription, setEnteredSubjectDescription] =
    useState("");
  const [enteredSubjectCode, setSubjectCode] = useState("");

  const subjectNameChangeHandler = (event) => {
    setEnteredSubjectName(event.target.value);
  };
  const subjectDescriptionHandler = (event) => {
    setEnteredSubjectDescription(event.target.value);
  };

  const subjectCodeHandler = (event) => {
    setSubjectCode(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (props.role === "TEACHER") {
      if (enteredSubjectName !== "" && enteredSubjectDescription !== "") {


        const CreatedSubjectData =
        {
          id: props.subjectArraySize,
          Subject_name: enteredSubjectName,
          Subject_description: enteredSubjectDescription,
          Subject_code: props.subjectCode,
          Created_by: getAuth(fire).currentUser.email,
          addedStudents: {
            1: "default@gmail.com",
          },
        };

        props.onCreatedSubject(CreatedSubjectData);
        setEnteredSubjectName("");
        setEnteredSubjectDescription("");
        showSuccessMessage("Class created", "You have successfully created class.");
      } else {
        // console.log("No data inserted");
        showErrorMessage("Empty fields", "All inputfields must be filled.");
      }
    }
    else {
      event.preventDefault();
      let subjectFound = false; // added flag variable
      const dbRef = ref(getDatabase());
      get(child(dbRef, `subjects/`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            snapshot.forEach(function (childSnapshot) {
              if (childSnapshot.val().Subject_code == enteredSubjectCode) {
                const emails = Object.values(childSnapshot.val().addedStudents);
                const database = getDatabase();
                if (!emails.includes(getAuth(fire).currentUser.email)) {
                  push(
                    ref(
                      database,
                      `subjects/` + childSnapshot.key + `/addedStudents`
                    ),
                    getAuth(fire).currentUser.email
                  );
                  showSuccessMessage("Class joined", "You have successfully joined class.");
                  setSubjectCode("");
                  props.onJoinedSubject();
                } else {
                  showInfoMessage("Already joined", "You have already joined this class.");
                }
                subjectFound = true; // set flag variable to true
              }
            });
            if (!subjectFound) { // check flag variable and show "No such subject" only once
              showErrorMessage("No class found", "There's no class assigned to this code.");
            }
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(props.subjectCode);
      showSuccessMessage("Code copied to clipboard", "Your code has ben successfully copied.");
    } catch (err) {
      showErrorMessage("Copy to clipboard failed", err.message);
    }
  };

  if (props.role === "TEACHER") {
    return (
      <Modal>
        <form onSubmit={submitHandler}>
          <FlexContainer props={{ gap: "16", direction: "column", height: "auto" }}>
            <FlexContainer props={{ gap: "16" }}>
              <FlexContainer props={{ gap: "16" }}>
                <Heading small Heading="Create Class" Subheading="Generate unique code and provide class details." ></Heading>
                <Divider type="normal" size="full"></Divider>
              </FlexContainer>
              <FlexContainer props={{ gap: "16" }}>
                <Inputfield required value={enteredSubjectName} type="text" onChange={subjectNameChangeHandler} label={"Subject Name"}></Inputfield>
                <Inputfield required value={enteredSubjectDescription} type="text" onChange={subjectDescriptionHandler} label={"Subject Description"}></Inputfield>
              </FlexContainer>
            </FlexContainer>

            <Divider type="normal" size="full"></Divider>
            <FlexContainer props={{ gap: "16", direction: "column" }}>
              <Heading small Heading="Your class code" Subheading="This code is used to join your class." ></Heading>
              <button type="button" className={subjectModal.code_display} onClick={handleCopy}>
                {props.subjectCode}
              </button>
              <Divider type="normal"></Divider>
              <div className={modal.button_container}>
                <Button size="small" color="white" text="Cancel"
                  onClick={() => {
                    console.log("Cancel");
                    props.onCancel();
                  }} />
                <Button size="full" type="submit" color="orange" text="Create Class"></Button>
              </div>
            </FlexContainer>
          </FlexContainer>
        </form>
      </Modal>
    );
  } else {
    return (
      <Modal>
        <form onSubmit={submitHandler}>
          <FlexContainer props={{ gap: "16", direction: "column", height: "auto" }}>
            <FlexContainer props={{ gap: "16" }}>
              <FlexContainer props={{ gap: "16" }}>
                <Heading small Heading="Join Class" Subheading="Insert class code to join and access tasks." ></Heading>
              </FlexContainer>
            </FlexContainer>
            <FlexContainer props={{ margin: "16" }}>
              <Inputfield type="code" maxLength="4" required onChange={subjectCodeHandler} value={enteredSubjectCode}></Inputfield>
            </FlexContainer>
            <FlexContainer props={{ gap: "16", direction: "column" }}>
              <Divider type="normal" size="full"></Divider>
              <div className={modal.button_container}>
                <Button size="small" color="white" text="Cancel"
                  onClick={() => {
                    console.log("Cancel");
                    props.onCancel();
                  }} />

                <Button size="full" type="submit" color="orange" text="Join Class"></Button>
              </div>
            </FlexContainer>
          </FlexContainer>
        </form>
      </Modal>
    );
  }
}

export default SubjectPopUp;
