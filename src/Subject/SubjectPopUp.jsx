import React, { useState } from "react";
import styles from "./SubjectPopUp.module.css";
import popup from "../popup.module.css";
import buttons from "../buttons.module.css"
import inputs from "../inputs.module.css";
import fire from "../config/fire";
import { getAuth, onAuthStateChanged, auth } from "firebase/auth";
import { getDatabase, ref, child, get, update, push, set } from "firebase/database";


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
      <div className={popup.popUp}>
        <form onSubmit={submitHandler}>
          <div className={popup.popUpTitle}>Create class</div>
          <hr />
          <div className={popup.sectionTitles}>Subject name</div>

          <input
            required
            onChange={subjectNameChangeHandler}
            value={enteredSubjectName}
            type="text"
            placeholder="Enter subject name..."
            className={`${inputs.form__input} ${inputs.form__input__normal}`}
          />

          <div className={popup.sectionTitles}>Subject Description</div>

          <input
            required
            onChange={subjectDescriptionHandler}
            value={enteredSubjectDescription}
            type="text"
            placeholder="Enter subject description..."
            className={`${inputs.form__input} ${inputs.form__input__normal}`}
          />
          <div className={popup.sectionTitles}>
            Your class code has been generated!
          </div>
          <span className={styles.text_small}>Click to copy to clipborad.</span>
          <button className={styles.code_display}>{props.subjectCode}</button>

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
              className={`${buttons.btn_long} ${buttons.btn_orange}`}
            >
              Create class
            </button>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div className={popup.popUp}>
        <form onSubmit={submitHandler}>
          <div className={popup.popUpTitle}>Join class</div>
          <hr />
          <div className={popup.sectionTitles}>Subject code</div>

          <input
            required
            onChange={subjectCodeHandler}
            value={enteredSubjectCode}
            type="text"
            placeholder="Enter subject code..."
            className={`${inputs.form__input} ${inputs.form__input__code}`}
          />

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
              className={`${buttons.btn_long} ${buttons.btn_orange}`}
            >
              Join Class
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default SubjectPopUp;
