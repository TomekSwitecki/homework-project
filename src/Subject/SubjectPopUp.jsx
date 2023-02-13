import React, { useState } from "react";
import styles from "./SubjectPopUp.module.css";
import buttons from "../buttons.module.css"
import inputs from "../inputs.module.css";
import fire from "../config/fire";
import { getAuth, onAuthStateChanged, auth } from "firebase/auth";
import { getDatabase, ref, child, get, update, push, set } from "firebase/database";
import Inputfield from "../Inputfield/Inputfield";
import Divider from "../Divider/Divider";
import Heading from "../Heading/Heading";
import Button from "../Button/Button";
import FlexContainer from "../FlexContainer/FlexContainer";
import Modal from "../Modal/Modal";
import modal from "../Modal/Modal.module.css";
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

    if(props.role==="TEACHER")
    {
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
      
  
  // {
  //       //tworzenie ID ręczne , nowy przedmiot musi byc na koncu
  //       id: props.subjectArraySize,
  //       Subject_name: enteredSubjectName,
  //       Subject_description: enteredSubjectDescription,
  //       Subject_code: props.subjectCode,
  //       Created_by: getAuth(fire).currentUser.email,
  //       addedStudents:{
  //         1:""
  //       }
  //     };

      props.onCreatedSubject(CreatedSubjectData);
      setEnteredSubjectName("");
      setEnteredSubjectDescription("");
    } else {
      console.log("No data inserted");
    }
    }else
    {
      
      const dbRef = ref(getDatabase());
      get(child(dbRef, `subjects/`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            //console.log(snapshot.val());
             let tempData = [];
            snapshot.forEach(function (childSnapshot) {
              console.log(childSnapshot.val());
              if (childSnapshot.val().Subject_code == enteredSubjectCode) {
               
                const emails = Object.values(childSnapshot.val().addedStudents);
                const database = getDatabase();
                if (!emails.includes(getAuth(fire).currentUser.email))
                {
                  push(
                    ref(
                      database,
                      `subjects/` + childSnapshot.key + `/addedStudents`
                    ),
                    getAuth(fire).currentUser.email
                  );
                  alert("Subject Added Succesfully");
                  setSubjectCode("");
                  props.onJoinedSubject();
                  
                }
                else
                {
                  alert("Already enroled");
                }

              }
              else
              {
                console.log("No such subject!");
              }
            });
          } 
          else 
          {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }

  };

  if (props.role === "TEACHER") {
    return (
      <Modal>
        <form onSubmit={submitHandler}>
          <FlexContainer props={{ gap: "16", direction:"column", height:"auto" }}>
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
          <FlexContainer props={{ gap:"16", direction:"column" }}>
            <Heading small Heading="Your class code" Subheading="This code is used to join your class." ></Heading>
            <button type="button" className={styles.code_display} onClick={() => {navigator.clipboard.writeText(props.subjectCode)}}>
              {props.subjectCode}
            </button>
            <Divider type="normal"></Divider>
            <div className={modal.button_container}>
            <Button size="small"  color="white" text="Cancel"              
              onClick={() => {
                    console.log("Cancel");
                    props.onCancel();
                  }} />  
                <Button size="full"  type="submit" color="orange" text="Create Class"></Button>
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
        <FlexContainer props={{ gap: "16", direction:"column", height:"auto" }}>
        <FlexContainer props={{ gap: "16" }}>
          <FlexContainer props={{ gap: "16" }}>
            <Heading small Heading="Join Class" Subheading="Insert class code to join and access tasks." ></Heading>
          </FlexContainer>
        </FlexContainer>
        <FlexContainer props={{ margin: "16" }}>
        <Inputfield type="code" maxLength="4" required onChange={subjectCodeHandler}  value={enteredSubjectCode}></Inputfield>
        </FlexContainer>
        <FlexContainer props={{ gap:"16", direction:"column" }}>
        <Divider type="normal" size="full"></Divider>
          <div className={modal.button_container}>
          <Button size="small"  color="white" text="Cancel"              
            onClick={() => {
                  console.log("Cancel");
                  props.onCancel();
                }} />  
                
              <Button size="full"  type="submit" color="orange" text="Join Class"></Button>
          </div>
        </FlexContainer>
        </FlexContainer>
        </form>
        </Modal>
    );
  }
}

export default SubjectPopUp;
