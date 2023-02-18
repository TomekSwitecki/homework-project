import { child, get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import completed_icon from "../icons/icon_completed.svg";
import late_icon from "../icons/icon_late.svg";
import negative_icon from "../icons/icon_x.svg";
import Tag from "../Tag/Tag";
import styles from "../Task/TaskItem.module.css";
import { getSubmitionDate } from '../utilities/StudentDatabase';
import { showSuccessMessage, showErrorMessage, showInfoMessage } from '../utilities/Notifications';
const StudentItem = (props) => {




  const [SubmitionDate, setSubmitionDate] = useState("-");
  let tag;
  useEffect(() => {
    if (Object.keys(props.selectedTask).length !== 0) {
      getSubmitionDate(props.selectedTask, props.mail).then((date) => {
        setSubmitionDate(date);
      });
    }
  }, [props.selectedTask, props.mail]);

  if (JSON.stringify(props.selectedTask) === '{}') {
    tag = <span>{"-"}</span>
  }
  else {
    if (props.selectedTask.Task_date > SubmitionDate && SubmitionDate != "-") {
      tag = <Tag icon={completed_icon} text={"Submitted"} color="green"></Tag>
    }
    else if (props.selectedTask.Task_date < SubmitionDate && SubmitionDate != "-") {
      tag = <Tag icon={late_icon} text={"Overdue"} color="yellow"></Tag>
    }
    else if (SubmitionDate === "-") {
      tag = <Tag icon={negative_icon} text={"Not submitted"} color="red"></Tag>
    }
  }
  


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
                      value2.Task_file_URL &&
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
          showInfoMessage("No submition", "User has not uploaded their answer yet.");
        });
    } else {
      showInfoMessage("No task selected", "Please select task first.");
    }


  }



  return (
    <React.Fragment>
      <tr onClick={downloadStudentWork}
        className={styles["TaskItem"]}>
        <td className={styles.title_cell}>
          {props.f_name + " " + props.l_name}
        </td>
        <td className={styles.deadline_cell}>
          <span className={styles.TaskDeadlineDate}>
            {SubmitionDate}
            {/* {props.mail}                     */}
          </span></td>
        <td className={styles.tag_cell}>
          {tag}
        </td>
      </tr>

    </React.Fragment>
  );
};

export default StudentItem;
