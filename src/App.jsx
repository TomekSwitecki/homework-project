import "./styles.css";
import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import fire from "./config/fire";
import { getDatabase, ref, child, get, push, set } from "firebase/database";
import CodeGenerator from "./CodeGenerator";
import SubjectModal from "./Subject/SubjectModal";
import TaskPopUp from "./Task/TaskPopUp";
import { getAuth, signOut } from "firebase/auth";
import TaskDescription from "./Task/TaskDescription";
import Navbar from "./Navbar/Navbar"
import TaskContainer from "./TaskContainer/TaskContainer";
import StudentListContainer from "./StudentListContainer/StudentListContainer";
import Placeholder from "./Placeholder/Placeholder";

import subject_placeholder from "./Ilustrations/placeholder_subject.svg";


const logout = () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      window.location.reload();
      console.log("signed out");
    })
    .catch((error) => {
      // An error happened.
    });
};


const App = (props) => {
  //const [isLoading,setIsLoading]=useState(false);


  const [GeneratedSubjectCode, setGenereatedSubjectCode] = useState();
  //console.log(props);
  const [SubjectModalVisible, setSubjectModalVisibility] = useState(false);
  function SubjectModalVisibility() {
    setGenereatedSubjectCode(CodeGenerator());
    //console.log(GeneratedSubjectCode);
    if (TaskPopUpVisible !== true)
      setSubjectModalVisibility((prevValue) => {
        return !prevValue;
      });
  }

  const [TaskPopUpVisible, setTaskPopUpVisibility] = useState(false);
  function TaskPopUpVisibility() {
    if (selectedSubject.name !== undefined) {
      if (SubjectModalVisible !== true) {
        setTaskPopUpVisibility((prevValue) => {
          return !prevValue;
        });
      }
    }
    else {
      alert("Select subject first");
    }
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
          setSubjectData([]);
          // console.log(snapshot.val());
          Object.entries(snapshot.val()).forEach(([key, value]) => {
            // console.log(key, value);
            // console.log(value.addedStudents);
            // console.log(value);
            setSubjectData((oldArray) => [...oldArray, value]);
          });
          // console.log(subjectData);
          //setSubjectData(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  const filteredSubjects = subjectData.filter((e) => {
    let ObjectHelper;
    if (Array.isArray(e.addedStudents)) {
      ObjectHelper = e.addedStudents.includes(
        getAuth(fire).currentUser.email
      );
    } else {
      ObjectHelper = Object.values(e.addedStudents).includes(
        getAuth(fire).currentUser.email
      );
    }
    return e.Created_by === getAuth(fire).currentUser.email || ObjectHelper;
  });
  
  const uniqueSubjects = filteredSubjects.reduce((acc, curr) => {
    const index = acc.findIndex(obj => obj.Subject_name === curr.Subject_name);
    if (index === -1) {
      acc.push(curr);
    } else {
      acc[index] = curr;
    }
    return acc;
  }, []);


  async function fetchSubjecttDatabase(subject_data) {
    console.log("Fetching created subject data to database");
    const database = getDatabase();
    //console.log(subject_data);
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
          setTaskData([]);
          // console.log(snapshot.val());
          Object.entries(snapshot.val()).forEach(([key, value]) => {
            //console.log(key, value);
            //  console.log(value);
            setTaskData((oldArray) => [...oldArray, value]);
          });
          // console.log(taskData);
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


  const [studentData, setStudentData] = useState([]);

  async function getStudentData() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setStudentData([]);
          // console.log(snapshot.val());
          Object.entries(snapshot.val()).forEach(([key, value]) => {
            // console.log(key, value);
            //console.log(value);
            if (value.role == "STUDENT") {
              setStudentData((oldArray) => [...oldArray, value]);
            }

          });
          //console.log(studentData);

          //setSubjectData(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getStudentData();
  }, []);
  //------------------------------------------------------------------------------

  // if (
  //   filteredSubjects && // 👈 null and undefined check
  //   Object.keys(filteredSubjects).length === 0 &&
  //   Object.getPrototypeOf(filteredSubjects) === Object.prototype
  // )
  //   console.log(filteredSubjects);
  //console.log(filteredSubjects[0].Subject_name);
  const [selectedSubject, setSelectedSubject] = useState({});
  const onSubjectSelectedDataHandler = (selectedSubjectData) => {
    let loading = false;
    // console.log(selectedSubjectData);
    getTaskData();
    setSelectedSubject(selectedSubjectData);
    setSelectedTask({});



  };
  //console.log("SELECTED SUBJECT: " + selectedSubject.name);
  //console.log("SELECTED SUBJECT STUDENTS: " + selectedSubject.addedStudents);


  const [selectedTask, setSelectedTask] = useState({});
  const onTaskSelectedDataHandler = (selectedTaskData) => {
    setSelectedTask(selectedTaskData);
    //console.log(selectedTaskData);
  };
  //console.log(taskData);
  //console.log(selectedTask);
  const onSubjectJoinedHandler = () => {
    getSubjectData();
    SubjectModalVisibility();
  };

  const onSubjectCreatedDataHandler = (createdSubjectData) => {
    // setSubjectData((prevSubjectItems) => {
    //   return [...prevSubjectItems, createdSubjectData];
    // });
    console.log(createdSubjectData);
    fetchSubjecttDatabase(createdSubjectData);
    setSubjectData([]);
    getSubjectData();
    SubjectModalVisibility();
  };
  //console.log(Object.values(subjectData));
  //console.log(subjectData);

  const onTaskCreatedDataHandler = (createdTaskData) => {
    console.log(createdTaskData);

    fetchTaskDatabase(createdTaskData);
    setTaskData([]);
    getTaskData();
    TaskPopUpVisibility();
  };

  const filteredTasks = taskData.filter((e) => {
    return e.Task_subject === selectedSubject.name;
  });
  
  const uniqueTasks = filteredTasks.reduce((acc, curr) => {
    const index = acc.findIndex(obj => obj.Task_title === curr.Task_title);
    if (index === -1) {
      acc.push(curr);
    } else {
      acc[index] = curr;
    }
    return acc;
  }, []);
  


  const filteredStudents = studentData.filter((e) => {
    if (Object.keys(selectedSubject).length !== 0) {
      return Object.values(selectedSubject.addedStudents).includes(e.email);
    }
  });







  return (
    <div className="App_Container">

      {SubjectModalVisible ? (
        <SubjectModal
          onCancel={SubjectModalVisibility}
          onCreatedSubject={onSubjectCreatedDataHandler}
          onJoinedSubject={onSubjectJoinedHandler}
          //subjectArraySize={subjectData.length}
          subjectArraySize={Object.keys(subjectData).length}
          subjectCode={GeneratedSubjectCode}
          role={props.rola}
        />
      ) : null}
      {TaskPopUpVisible && selectedSubject.name !== undefined ? (
        <TaskPopUp
          onCancel={TaskPopUpVisibility}
          onCreatedTask={onTaskCreatedDataHandler}
          selectedSubject={selectedSubject.name}
        />
      ) : null}


      <div className="HomePage_Container">
        <Navbar role={props.rola} subjects={uniqueSubjects} onSubjectSelectedDataHandler={onSubjectSelectedDataHandler} logout={logout} onClick={SubjectModalVisibility}></Navbar>
        {selectedSubject.name !== undefined ?
          <div className="GridContainer">

            <div className="LeftContainer">
              <TaskContainer role={props.rola} filteredTasks={uniqueTasks} selectedSubject={selectedSubject.name} TaskPopUpVisibility={TaskPopUpVisibility} onTaskSelectedDataHandler={onTaskSelectedDataHandler}></TaskContainer>
              {props.rola === "TEACHER" ? <TaskDescription userEmail={getAuth(fire).currentUser.email} selectedTask={selectedTask} TaskNumber={filteredTasks} /> : null}
            </div>


            {props.rola === "TEACHER" ? (
              <div className="RightContainer">
                <StudentListContainer
                  selectedTask={selectedTask}
                  filteredStudents={filteredStudents}>
                </StudentListContainer>
              </div>
            ) : (

              <div className={`${"RightContainer"} ${[`RightContainer__auto`]}`}>
                <TaskDescription
                  role={props.rola}
                  userEmail={getAuth(fire).currentUser.email}
                  selectedTask={selectedTask}
                  TaskNumber={filteredTasks}
                />
              </div>
            )}


          </div> 
          : <Placeholder img={subject_placeholder} Heading={"No class selected"} Subheading={"Select class or create new one in the navbar menu."}></Placeholder>}
      </div>
    </div>
  );
}






export default App;
