import { getDatabase, ref, child, get ,set,push } from "firebase/database";

const arrayToObject = (array) =>
  array.reduce((obj, item) => {
    obj[item.id] = item;
    return obj;
  }, {});

async function InitialSubjectData() {
  var INITIAL_SUBJECT_DATA = [
    {
      id: 0,
      Subject_name: "Matematyka",
      Subject_description: "",
    },
    {
      id: 1,
      Subject_name: "Biologia",
      Subject_description: "",
    },
    {
      id: 2,
      Subject_name: "Informatyka",
      Subject_description: "",
    },
  ];

  const object = arrayToObject(INITIAL_SUBJECT_DATA);
  console.log(object);
  const database = getDatabase();
  set(ref(database, "subjects/"), object);

//   const dbRef = ref(getDatabase());
//   get(child(dbRef, `subjects/`))
//     .then((snapshot) => {
//       if (snapshot.exists()) {
//         console.log(snapshot.val());
//         snapshot.forEach(function (childSnapshot) {
//           console.log(childSnapshot.val());
//         });
//       } else {
//         console.log("No data available");
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//     });
}

export default InitialSubjectData;
