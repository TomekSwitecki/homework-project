import React, { useState } from "react";
import styles from "./SubjectCreatePopUp.module.css";



function SubjectAdd(props) {
  const [enteredSubjectName, setEnteredSubjectName] = useState("");
  const [enteredSubjectDescription, setEnteredSubjectDescription] = useState(
    ""
  );

  const subjectNameChangeHandler = (event) => {
    setEnteredSubjectName(event.target.value);
  };
  const subjectDescriptionHandler = (event) => {
    setEnteredSubjectDescription(event.target.value);
  };






  const submitHandler = (event) => {
    event.preventDefault();
    
    if (enteredSubjectName !== "" && enteredSubjectDescription !== "") {
      //block page refreshing after submiting form
      
      const CreatedSubjectData = {
        //tworzenie ID ręczne , nowy przedmiot musi byc na koncu
        id: props.subjectArraySize,
        Subject_name: enteredSubjectName,
        Subject_description: enteredSubjectDescription,
      };

      props.onCreatedSubject(CreatedSubjectData);
      setEnteredSubjectName("");
      setEnteredSubjectDescription("");
    } else {
      console.log("No data inserted");
    }
  };




  return (
    <div className={styles.popUp}>
      <form onSubmit={submitHandler}>
        <h1>Create class</h1>
        <hr />
        <h2>Subject name</h2>

        <input
          onChange={subjectNameChangeHandler}
          value={enteredSubjectName}
          type="text"
          placeholder="Subject"
         
        />

        <h2>Subject description</h2>

        <input
          onChange={subjectDescriptionHandler}
          value={enteredSubjectDescription}
          type="text"
          placeholder="Teacher"
          className={styles.input_description} 
        />
        <h1>{}</h1>

        <div>
          <button
            className="btn-cancel"
            onClick={() => {
              console.log("Cancel");
              props.onCancel();
            }}
          >
            Cancel
          </button>

          <button type="submit" className="btn-orange">
            Create class
          </button>
        </div>
      </form>
    </div>
  );
}

export default SubjectAdd;
