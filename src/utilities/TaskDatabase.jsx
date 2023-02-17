import { child, get, getDatabase, push, ref } from "firebase/database";

export async function getTaskData() {
    try {
        const dbRef = ref(getDatabase());
        const snapshot = await get(child(dbRef, `task/`));
        if (snapshot.exists()) {
          const tasks = Object.values(snapshot.val());
          return tasks;
        } else {
          console.log("No data available");
          return null;
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    }


    export const filterTasksBySubject = (taskData, subjectName) => {
        const filteredTasks = taskData.filter((e) => {
          return e.Task_subject === subjectName;
        });
        return filteredTasks;
      };
      
      export const getUniqueTasks = (taskData) => {
        const uniqueTasks = taskData.reduce((acc, curr) => {
          const index = acc.findIndex(
            (obj) => obj.Task_title === curr.Task_title
          );
          if (index === -1) {
            acc.push(curr);
          } else {
            acc[index] = curr;
          }
          return acc;
        }, []);
        return uniqueTasks;
      };
  

export async function fetchTaskDatabase(task_data) {
console.log("Fetching created task data to database");
const database = getDatabase();
console.log(task_data);
push(ref(database, "task/"), task_data);
}

