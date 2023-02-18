import { child, get, getDatabase, ref } from "firebase/database";

export async function getStudentData() {
  try {
    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, `users/`));
    if (snapshot.exists() && snapshot.val()) { // check if snapshot.val() is not null or undefined
      const studentData = Object.values(snapshot.val())
        .filter((value) => value.role === "STUDENT");
      return studentData;
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

  export function getFilteredStudents(studentData, selectedSubject) {
    return studentData.filter((e) => {
      if (Object.keys(selectedSubject).length !== 0) {
        return Object.values(selectedSubject.addedStudents).includes(e.email);
      }
    });
  }



  export async function getSubmitionDate(selectedTask, mail) {
    try {
      const dbRef = ref(getDatabase());
      const snapshot = await get(child(dbRef, `task/`));
      if (snapshot.exists() && snapshot.val()) { // check if snapshot.val() is not null or undefined
        const taskData = snapshot.val();
        for (const [key, value] of Object.entries(taskData)) {

          if (
            value.Task_subject == selectedTask.Task_subject &&
            value.Task_description == selectedTask.Task_description
          ) {
            if (value.answers) {
              for (const [key1, value1] of Object.entries(value.answers)) {
                for (const [key2, value2] of Object.entries(value1)) {
                  if (value2.Task_file_URL && mail == value2.Student_Email) {
                    if (value2.Task_Submition_Date && value.answers) {
                      return value2.Task_Submition_Date;
                    } else {
                      return "-";
                    }
                  }
                }
              }
            } else {
              return "-";
            }
          }
        }
        // console.log("No task matches selectedTask");
        return "-";

      } else {
        // console.log("No data available");
        return "-";
      }
    } catch (error) {
      console.error(error);
      return "-";
    }
  }