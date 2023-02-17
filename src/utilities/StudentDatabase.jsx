import { child, get, getDatabase, ref } from "firebase/database";

export async function getStudentData() {
    try {
      const dbRef = ref(getDatabase());
      const snapshot = await get(child(dbRef, `users/`));
      if (snapshot.exists()) {
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

