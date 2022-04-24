import "./styles.css";
import React, { useState , useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";


import Registration from "./Registration/Registration";
import { getDatabase, ref, child, get,push } from "firebase/database";


import Navbar from "./Navbar/Navbar";
import Logo from "./Logo/Logo";


import InitialSubjectData from "./Subject/InitialSubjectData";
import SubjectItem from "./Subject/SubjectItem";
import SubjectAdd from "./Subject/SubjectAdd";
import SubjectCreatePopUp from "./Subject/SubjectCreatePopUp";

import TaskItem from "./Task/TaskItem";
import TaskAdd from "./Task/TaskAdd";

import StudentItem from "./Students/StudentItem";

import { getAuth, signOut } from "firebase/auth";
const logout =()=>
{
  

  const auth = getAuth();
  signOut(auth)
    .then(() => {
      console.log("signed out");
    })
    .catch((error) => {
      // An error happened.
    });
}



const App=(props)=> {
  console.log(props);
  const [SubjectPopUpVisible, setSubjectPopUpVisibility] = useState(false);
  function ShowCreateSubjectWindow() {
    setSubjectPopUpVisibility((prevValue) => {
      return !prevValue;
    });
  }
//-----------------------------------------------------------------------------------------------------
  //moze przeniesc przy rejestracji 
  //InitialSubjectData();
  async function getSubjectData()
  {
      const dbRef = ref(getDatabase());
      get(child(dbRef, `subjects/`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val());
            setSubjectData(snapshot.val());
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
  }

  async function fetchSubjecttDatabase(subject_data) {
    console.log("Fetching created subject data to database");
    const database = getDatabase();
    console.log(subject_data);
    push(ref(database, "subjects/"), subject_data);
    getSubjectData();
  }
    useEffect(() => {
      getSubjectData();
    }, []);
//----------------------------------------------------------------------------------------------------


  const INITIAL_TASK_DATA = [
    {
      Task_id: 1,
      Task_subject: "Matematyka",
      Task_name: "Nauka dodawania",
      Task_description: "Dodaj 2+5 ",
      Task_deadline: new Date(2020, 7, 14).toLocaleDateString(),
    },
    {
      Task_id: 2,
      Task_subject: "Biologia",
      Task_name: "Znajdowanie grzybów",
      Task_description: "Znajdź grzyba ",
      Task_deadline: new Date(2020, 7, 14).toLocaleDateString(),
    },
    {
      Task_id: 3,
      Task_subject: "Biologia",
      Task_name: "Znajdowanie grzybów muchomorów",
      Task_description: "Znajdź grzyba muchomora ",
      Task_deadline: new Date(2020, 7, 14).toLocaleDateString(),
    },
    {
      Task_id: 4,
      Task_subject: "Informatyka",
      Task_name: "Nauka HTML",
      Task_description: "Zrob strone",
      Task_deadline: new Date(2020, 7, 14).toLocaleDateString(),
    },
  ];

  const INITIAL_STUDENT_DATA = [
    {
      Student_id: 1,
      Student_name: "Juri Gagarin",
      Student_mail: "jgagarin@gmail.com",
      Date: "13-12-2022",
      Status: "Oddane",
    },
    {
      Student_id: 2,
      Student_name: "Marcin Najman",
      Student_mail: "pajac@gmail.com",
      Date: "13-12-2022",
      Status: "Nieoddane",
    },
  ];

  
  const [subjectData, setSubjectData] = useState([]);

  const [taskData, setTaskData] = useState(INITIAL_TASK_DATA);
  const [studentData, setStudentData] = useState(INITIAL_TASK_DATA);

  const [selectedSubject, setSelectedSubject] = useState();
  const onSubjectSelectedDataHandler = (selectedSubjectData) => {
    setSelectedSubject(selectedSubjectData.name);
  };
  console.log("SELECTED SUBJECT: " + selectedSubject);

  const [selectedTask, setSelectedTask] = useState();
  const onTaskSelectedDataHandler = (selectedTaskData) => {
    setSelectedTask(selectedTaskData.name);
  };
  console.log(taskData);

  const onSubjectCreatedDataHandler = (createdSubjectData) => {
    // setSubjectData((prevSubjectItems) => {
    //   return [...prevSubjectItems, createdSubjectData];
    // });
    fetchSubjecttDatabase(createdSubjectData);
    ShowCreateSubjectWindow();
  };
  console.log(Object.values(subjectData));
  console.log(subjectData);


  
  //FILTROWANIE TASKÓW WYBRANEGO PRZEDMIOTU
  const filteredTasks = taskData.filter((e) => {
    return e.Task_subject === selectedSubject;
  });

  return (
    <div className="App">
      <Navbar />
      {SubjectPopUpVisible ? (
        <SubjectCreatePopUp
          onCancel={ShowCreateSubjectWindow}
          onCreatedSubject={onSubjectCreatedDataHandler}
          //subjectArraySize={subjectData.length}
          subjectArraySize={Object.keys(subjectData).length}
        />
      ) : null}
      <div className="Container">
        <div className="SubjectListContainer">
          {/* <Logo></Logo> */}

          <h1>Subjects</h1>
          <h1>{props.rola}</h1>

          {Object.values(subjectData).map((e, index) => (
            <SubjectItem
              key={e.index}
              id={index}
              name={e.Subject_name}
              description={e.Subject_description}
              onSubjectSelected={onSubjectSelectedDataHandler}
            />
          ))}

          <SubjectAdd onClick={ShowCreateSubjectWindow} />
        </div>

        <div className="TaskContainer">
          <h1>Tasks </h1>
          {filteredTasks.map((e, index) => (
            <TaskItem
              key={e.index}
              id={index}
              name={e.Task_name}
              description={e.Task_description}
              subject={e.Task_subject}
              deadline={e.Task_deadline}
              chosenSubject={selectedSubject}
              onTaskSelected={onTaskSelectedDataHandler}
            />
          ))}
          <TaskAdd onClick={ShowCreateSubjectWindow} />
        </div>

        <div className="StudentListContainer">
          <button onClick={logout}>LOG OUT</button>
          <h1>Student List</h1>
          {INITIAL_STUDENT_DATA.map((e, index) => (
            <StudentItem
              id={e.index}
              name={e.Student_name}
              mail={e.Student_mail}
              date={e.Date}
              status={e.Status}
            />
          ))}
        </div>
      </div>
    </div>
  );
}






export default App;
