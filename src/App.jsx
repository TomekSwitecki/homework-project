import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import fire from "./config/fire";
import Navbar from "./Navbar/Navbar";
import Placeholder from "./Placeholder/Placeholder";
import StudentListContainer from "./StudentListContainer/StudentListContainer";
import "./styles.css";
import SubjectModal from "./Subject/SubjectModal";
import TaskDescription from "./Task/TaskDescription";
import TaskPopUp from "./Task/TaskPopUp";
import TaskContainer from "./TaskContainer/TaskContainer";
import CodeGenerator from "./utilities/CodeGenerator";

import subject_placeholder from "./Ilustrations/placeholder_subject.svg";
import { logout } from "./utilities/Login";
import { getFilteredStudents, getStudentData } from "./utilities/StudentDatabase";
import { fetchSubjectDatabase, filterSubjectsByUser, getSubjectData, getUniqueSubjects } from "./utilities/SubjectDatabase";
import { fetchTaskDatabase, filterTasksBySubject, getTaskData, getUniqueTasks } from "./utilities/TaskDatabase";



const App = (props) => {
  const [GeneratedSubjectCode, setGenereatedSubjectCode] = useState();


  const [SubjectModalVisible, setSubjectModalVisibility] = useState(false);
  function SubjectModalVisibility() {
    setGenereatedSubjectCode(CodeGenerator());
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

  const [selectedSubject, setSelectedSubject] = useState({});
  const onSubjectSelectedDataHandler = (selectedSubjectData) => {
    getTaskData();
    setSelectedSubject(selectedSubjectData);
    setSelectedTask({});
  };

  const [subjectData, setSubjectData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getSubjectData();
      if (data) {
        setSubjectData(data);
      }
    };
    fetchData();
  }, []);
  const filteredSubjects = filterSubjectsByUser(subjectData);
  const uniqueSubjects = getUniqueSubjects(filteredSubjects);
  //-----------------------------------------------------------------------------------------------------

  const [taskData, setTaskData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getTaskData();
      if (data) {
        setTaskData(data);
      }
    };
    fetchData();
  }, []);

  const filteredTasks = filterTasksBySubject(taskData, selectedSubject.name);
  const uniqueTasks = getUniqueTasks(filteredTasks);

  //-----------------------------------------------------------------------------------------------------
  const [studentData, setStudentData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getStudentData();
      if (data) {
        setStudentData(data);
      }
    };
    fetchData();
  }, []);

  const filteredStudents = getFilteredStudents(studentData, selectedSubject);




  const [selectedTask, setSelectedTask] = useState({});
  const onTaskSelectedDataHandler = (selectedTaskData) => {
    setSelectedTask(selectedTaskData);
  };

  const onSubjectJoinedHandler = () => {
    getSubjectData();
    SubjectModalVisibility();
  };

  const onSubjectCreatedDataHandler = async (createdSubjectData) => {
    await fetchSubjectDatabase(createdSubjectData);
    const updatedData = await getSubjectData();
    setSubjectData(updatedData);
    SubjectModalVisibility();
  };


  const onTaskCreatedDataHandler = async (createdTaskData) => {
    await fetchTaskDatabase(createdTaskData);
    const updatedData = await getTaskData();
    setTaskData(updatedData);
    TaskPopUpVisibility();
  };







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
          : <Placeholder size="big" img={subject_placeholder} Heading={"No class selected"} Subheading={"Select class or create new one in the navbar menu."}></Placeholder>}
      </div>
    </div>
  );
}

export default App;
