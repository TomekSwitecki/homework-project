import React from "react";
// import styles from "./StudentItem.module.css";
import styles from "../Task/TaskItem.module.css"
import { getDatabase, ref, child, get, push, set } from "firebase/database";
import { getAuth, signOut } from "firebase/auth";
import fire from "../config/fire";
import Tag from "../Tag/Tag";
import inprogress_icon from "../icons/icon_inprogress.svg";
import completed_icon from "../icons/icon_completed.svg";

const StudentItem = (props) => {

async function downloadStudentWork() {
  console.log(props.selectedTask);
  if (Object.keys(props.selectedTask).length != 0) {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `task/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          Object.entries(snapshot.val()).forEach(([key, value]) => {
            //console.log(key, value);

            if (
              value.Task_subject == props.selectedTask.Task_subject &&
              value.Task_description == props.selectedTask.Task_description
            ) {
              console.log(value);
              Object.entries(value.answers).forEach(([key1, value1]) => {
                console.log(value1);
                Object.entries(value1).forEach(([key2, value2]) => {
                  console.log(value2);
                  if (
                    value2.Task_file_URL != "" &&
                    props.mail == value2.Student_Email
                  ) {
                    var element = document.createElement("a");
                    element.setAttribute("href", value2.Task_file_URL);
                    element.setAttribute("target", "_blank");
                    element.style.display = "none";
                    document.body.appendChild(element);

                    element.click();

                    document.body.removeChild(element);
                  }
                });
              });
            }
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
  } else {
    alert("Select task first");
  }
}



  return ( 
  <React.Fragment>
    <tr onClick={downloadStudentWork}         
    className={styles["TaskItem"] }>
    <td className={styles.title_cell}>
    {props.f_name + " " + props.l_name}
    </td>
    <td className={styles.deadline_cell}>    
      <span className={styles.TaskDeadlineDate}>
          {props.mail}
        </span></td>
    <td className={styles.tag_cell}>          
          <Tag icon={inprogress_icon}  text={"In progress"} color="blue"></Tag>
        </td>
    </tr>

    </React.Fragment>
  );
};

export default StudentItem;


// <div className={styles.student_item} onClick={downloadStudentWork}>
// {/* <div>
//   <input type="checkbox" id="selected" className="checkbox" />
// </div> */}
// <div>
//   <img
//     draggable="false"
//     className={styles.user_profile_picture}
//     src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
//   ></img>
// </div>
// <div>{props.f_name + " " + props.l_name}</div>
// <div>{props.mail}</div>
// <div>{props.date}</div>
// <div className={styles.statusbar}>
//   {/* <box-icon className={styles.statusbar} name="polygon" type="solid" color="#08f70d"></box-icon> */}
// </div>
// </div>