import "./styles.css";
import React, { useState , useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import fire from "./config/fire";

import Registration from "./Registration/Registration";
import { getDatabase, ref, child, get,push, set } from "firebase/database";


import Navbar from "./Navbar/Navbar";
import Logo from "./Logo/Logo";


import CodeGenerator from "./CodeGenerator";
import InitialSubjectData from "./Subject/InitialSubjectData";
import SubjectItem from "./Subject/SubjectItem";

import SubjectCreate from "./Subject/SubjectCreate";
import SubjectPopUp from "./Subject/SubjectPopUp";

import SubjectAdd from "./Subject/SubjectAdd";

import TaskActionBar from "./Task/TaskActionBar";
import TaskItem from "./Task/TaskItem";
import TaskAdd from "./Task/TaskAdd";
import TaskPopUp from "./Task/TaskPopUp";

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
  const [GeneratedSubjectCode, setGenereatedSubjectCode] = useState();
  console.log(props);
  const [SubjectPopUpVisible, setSubjectPopUpVisibility] = useState(false);
  function SubjectPopUpVisibility() {
    setGenereatedSubjectCode(CodeGenerator());
    //console.log(GeneratedSubjectCode);
    if (TaskPopUpVisible !== true)
      setSubjectPopUpVisibility((prevValue) => {
        return !prevValue;
      });
  }

  const [TaskPopUpVisible, setTaskPopUpVisibility] = useState(false);
  function TaskPopUpVisibility() {
    if (selectedSubject !== undefined && SubjectPopUpVisible !== true)
      setTaskPopUpVisibility((prevValue) => {
        return !prevValue;
      });
  }

  //-----------------------------------------------------------------------------------------------------
  //moze przeniesc przy rejestracji
  //InitialSubjectData();

  const [subjectData, setSubjectData] = useState([]);

  async function getSubjectData() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `subjects/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          Object.entries(snapshot.val()).forEach(([key, value]) => {
            console.log(key, value);
            console.log(value.addedStudents);
              console.log(value);
              setSubjectData((oldArray) => [...oldArray, value]);
          });
          console.log(subjectData);

          //setSubjectData(snapshot.val());
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
  }

  useEffect(() => {
    getSubjectData();
  }, []);
  //----------------------------------------------------------------------------------------------------

  //-----------------------------------------------------------------------------------------------------
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
 const [taskData, setTaskData] = useState([]);

async function getTaskData() {
  const dbRef = ref(getDatabase());
  get(child(dbRef, `task/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        Object.entries(snapshot.val()).forEach(([key, value]) => {
          console.log(key, value);
                      console.log(value);
                      setTaskData((oldArray) => [...oldArray, value]);
        });
        console.log(taskData);

        //setSubjectData(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}


  async function fetchTaskDatabase(task_data) {
    console.log("Fetching created task data to database");
    const database = getDatabase();
    console.log(task_data);
    push(ref(database, "task/"), task_data);
  }

  useEffect(() => {
    getTaskData();
  }, []);
  //-----------------------------------------------------------------------------------------------------
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

 
  const [studentData, setStudentData] = useState(INITIAL_TASK_DATA);

  const [selectedSubject, setSelectedSubject] = useState();
  const onSubjectSelectedDataHandler = (selectedSubjectData) => {
    setSelectedSubject(selectedSubjectData.name);
          setTaskData([]);
          getTaskData();
  };
  console.log("SELECTED SUBJECT: " + selectedSubject);

  const [selectedTask, setSelectedTask] = useState();
  const onTaskSelectedDataHandler = (selectedTaskData) => {
    setSelectedTask(selectedTaskData.name);
  };
  console.log(taskData);

  const onSubjectJoinedHandler = () => {
    setSubjectData([]);
    getSubjectData();
    SubjectPopUpVisibility();
  };

  const onSubjectCreatedDataHandler = (createdSubjectData) => {
    // setSubjectData((prevSubjectItems) => {
    //   return [...prevSubjectItems, createdSubjectData];
    // });
    fetchSubjecttDatabase(createdSubjectData);
    setSubjectData([]);
    getSubjectData();
    SubjectPopUpVisibility();
  };
  console.log(Object.values(subjectData));
  console.log(subjectData);

  const onTaskCreatedDataHandler = (createdTaskData) => {
    console.log(createdTaskData);
    fetchTaskDatabase(createdTaskData);
    setTaskData([]);
    getTaskData();
    TaskPopUpVisibility();
  };

  //FILTROWANIE TASKÓW WYBRANEGO PRZEDMIOTU
  const filteredTasks = taskData.filter((e) => {
    return e.Task_subject === selectedSubject;
  });

  const filteredSubjects = subjectData.filter((e) => {
     let ObjectHelper;
      if (Array.isArray(e.addedStudents)) {
        ObjectHelper = e.addedStudents.includes(
          getAuth(fire).currentUser.email
        );
        console.log("Array");
      } else {
        ObjectHelper = Object.values(e.addedStudents).includes(
          getAuth(fire).currentUser.email
        );
        console.log("Object");
      }
    return (e.Created_by === getAuth(fire).currentUser.email ||  ObjectHelper);
  });


  return (
    <div className="App">
      <Navbar />
      {SubjectPopUpVisible ? (
        <SubjectPopUp
          onCancel={SubjectPopUpVisibility}
          onCreatedSubject={onSubjectCreatedDataHandler}
          onJoinedSubject={onSubjectJoinedHandler}
          //subjectArraySize={subjectData.length}
          subjectArraySize={Object.keys(subjectData).length}
          subjectCode={GeneratedSubjectCode}
          role={props.rola}
        />
      ) : null}
      {TaskPopUpVisible && selectedSubject !== undefined ? (
        <TaskPopUp
          onCancel={TaskPopUpVisibility}
          onCreatedTask={onTaskCreatedDataHandler}
          selectedSubject={selectedSubject}
        />
      ) : null}

      <div className="Container">
        <div className="SubjectListContainer">
          {/* <Logo></Logo> */}

          <h1>Subjects</h1>
          <h1>{props.rola}</h1>

          {filteredSubjects.map((e, index) => (
            <SubjectItem
              key={e.index}
              id={index}
              name={e.Subject_name}
              description={e.Subject_description}
              onSubjectSelected={onSubjectSelectedDataHandler}
            />
          ))}

          {props.rola === "TEACHER" ? (
            <SubjectCreate onClick={SubjectPopUpVisibility} />
          ) : (
            <SubjectAdd onClick={SubjectPopUpVisibility} />
          )}
        </div>

        <div className="TaskContainer">
          <h1>Tasks </h1>
          <TaskActionBar/>
          {filteredTasks.map((e, index) => (
            <TaskItem
              key={e.index}
              name={e.Task_title}
              description={e.Task_description}
              subject={e.Task_subject}
              //deadline={e.Task_deadline}
              chosenSubject={selectedSubject}
              onTaskSelected={onTaskSelectedDataHandler}
            />
          ))}
          {props.rola === "TEACHER" ? (
            <TaskAdd onClick={TaskPopUpVisibility} />
          ) : null}
        </div>

        <div className="StudentListContainer">
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
        <button onClick={logout}>LOG OUT</button>
      </div>
    </div>
  );
}






export default App;
