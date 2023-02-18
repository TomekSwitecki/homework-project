import { getAuth } from "firebase/auth";
import { child, get, getDatabase, push, ref } from "firebase/database";
import fire from "../config/fire";

export async function getSubjectData() {
    try {
      const dbRef = ref(getDatabase());
      const snapshot = await get(child(dbRef, `subjects/`));
      if (snapshot.exists()) {
        const subjects = Object.values(snapshot.val());
        return subjects;
      } else {
        console.log("No data available");
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  export const filterSubjectsByUser = (subjectData) => {
    const filteredSubjects = subjectData.filter((e) => {
      let ObjectHelper;
      if (Array.isArray(e.addedStudents) && e.addedStudents !== undefined) {
        ObjectHelper = e.addedStudents.includes(
          getAuth(fire).currentUser.email
        );
      } else if (typeof e.addedStudents === "object" && e.addedStudents !== null) {
        ObjectHelper = Object.values(e.addedStudents).includes(
          getAuth(fire).currentUser.email
        );
      } else {
        ObjectHelper = false;
      }
      return e.Created_by === getAuth(fire).currentUser.email || ObjectHelper;
    });
    return filteredSubjects;
  };
  
  export const getUniqueSubjects = (subjectData) => {
    const uniqueSubjects = subjectData.reduce((acc, curr) => {
      const index = acc.findIndex(
        (obj) => obj.Subject_name === curr.Subject_name
      );
      if (index === -1) {
        acc.push(curr);
      } else {
        acc[index] = curr;
      }
      return acc;
    }, []);
    return uniqueSubjects;
  };




export async function fetchSubjectDatabase(subject_data) {
    console.log("Fetching created subject data to database");
    const database = getDatabase();
    push(ref(database, "subjects/"), subject_data);
  }