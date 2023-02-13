import React, { useState } from "react";
import { Routes, Route , Navigate } from "react-router-dom";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, child, get } from "firebase/database";



import App from "./App";
import LandingPage from "./Landing_Page/LandingPage";
import Registration from "./Registration/Registration";
import Login from "./Login/Login";



const Hub=()=>
{
const [role,setRole]=useState("");
const [user,setUser]=useState(null);


const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  
  if (user) {
    //zaczytanie dodatkowej informacji o roli - uczeń czy nauczyciel
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          //console.log(snapshot.val());
          snapshot.forEach(function (childSnapshot) {
            
            if (
              childSnapshot.val().email.toLowerCase() ===
              user.email.toLowerCase()
            ) {
              //console.log("BINGO");
              //console.log(childSnapshot.val().email);
              setRole(childSnapshot.val().role);
              //console.log(role);
            }
          });
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    
    //console.log(user);
    setUser(user);
    //console.log(user.email);

    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User


    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    setUser(null);
    //prompt("no user logged");

    // ...
  }
  //console.log(role);
});
//console.log(role);
  if(user)
  {
    // console.log("user");
return (
  <Routes>
    <Route path="/" element={<Navigate to="/home" />} />

    <Route path="/landing" element={<Navigate to="/home" />} />
    <Route path="/login" element={<Navigate to="/home" />} />
    <Route path="/registration" element={<Navigate to="/home" />} />
    <Route path="/home" element={<App  rola={role}  />} />
  </Routes>
);
  }
  else
  {
    // console.log("!user");
    return (
      <Routes>
        <Route path="/" element={<Navigate to="/landing" />} />

        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/home" element={<Navigate to="/login" />} />
      </Routes>
    );
  }
  
}

export default Hub