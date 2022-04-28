import React from "react";
import { useState } from "react";
import fire from "../config/fire";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, push, ref, set } from "firebase/database";
const Registration=()=>
{
   
   let RegistrationData = {
     f_name:"",
     l_name:"",
     email:"",
     password:"",
     role:""
   };

  const [firstName,setFirstName]=useState("");
    const firstNameChangeHandler = (event) => {
    setFirstName(event.target.value);
  };
  const [lastName,setLastName]=useState("");
      const lastNameChangeHandler = (event) => {
    setLastName(event.target.value);
  };

  const [email, setEmail] = useState("");
  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

    const [password, setPassword] = useState("");
    const passwordChangeHandler = (event) => {
      setPassword(event.target.value);
    };



                  // if (firstName !== "" && lastName !== "" && email !== "") {
                  //   console.log("Succesfully signed up");

                  //   RegistrationData = {
                  //     f_name: firstName,
                  //     l_name: lastName,
                  //     email: email.toLowerCase(),
                  //     password: password,
                  //     role: argument_role,
                  //   };

                  //   registerUserdatabase(RegistrationData);

                  //   setFirstName("");
                  //   setLastName("");
                  //   setEmail("");
                  //   setPassword("");
                  //   console.log("Registration Succesfull");
                  //   //console.log(auth.uid);
                  // } 

          const submitHandler = (argument_role, event) => {
            if (firstName !== "" && lastName !== "")
            {
              event.preventDefault();

              const auth = getAuth();
              createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                  console.log(userCredential._tokenResponse.email);
                  RegistrationData = {
                    f_name: firstName,
                    l_name: lastName,
                    email: userCredential._tokenResponse.email,
                    password: password,
                    role: argument_role,
                  };
                  registerUserdatabase(RegistrationData);
                  setFirstName("");
                  setLastName("");
                  setEmail("");
                  setPassword("");
                  alert("Succesfully signed up");
                })
                .catch((error) => {
                  console.log(error.toString());
                  alert(error.toString());
                });
            }
            else
            {
              alert("No full data entered");
            }
          };

          async function registerUserdatabase(
            RegistrationData
          ) {
            const database = getDatabase();
            push(ref(database, "users/"), RegistrationData);
          }


return (
  <div>
    <form>
      <input
        onChange={firstNameChangeHandler}
        value={firstName}
        type="text"
        placeholder="First Name"
      />
      <input
        onChange={lastNameChangeHandler}
        value={lastName}
        type="text"
        placeholder="Last Name"
      />

      <input
        onChange={emailChangeHandler}
        value={email}
        type="email"
        placeholder="Email"
      />
      <input
        onChange={passwordChangeHandler}
        value={password}
        type="password"
        placeholder="Password"
      />

      <button
        type="submit"
        onClick={(event) => submitHandler("TEACHER", event)}
      >
        Register as teacher
      </button>
      <button
        type="submit"
        onClick={(event) => submitHandler("STUDENT", event)}
      >
        Register as student
      </button>

      {/* <button
        type="submit"
        onClick={RegisterUser}
      > 
        Register as student
      </button>
      */}
    </form>
  </div>
);

}

export default Registration;