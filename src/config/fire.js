// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCf1nPHveyZICClcozmJOh6UYFR9b8d6R8",
  authDomain: "homework-com-ed42c.firebaseapp.com",
  databaseURL:
    "https://homework-com-ed42c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "homework-com-ed42c",
  storageBucket: "homework-com-ed42c.appspot.com",
  messagingSenderId: "665589044638",
  appId: "1:665589044638:web:d855d601e644dcb121f28f",
};

// Initialize Firebase
const fire = initializeApp(firebaseConfig);
const auth = getAuth(fire);
const database = getDatabase(fire);
const storage = getStorage(fire);
export default fire;