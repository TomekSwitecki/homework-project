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




      const RegisterUser = () => {
const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    console.log("Succesfully signed up");
    //console.log(auth.uid);
  })
  .catch((error) => {
    console.log(error.toString());
  });

      }
                  // TRZEBA POPRAWIĆ WYSYŁA 3 LITEROWA HASŁA DO BAZY DANYCH - Firebase Auth wymusza 6 literowe hasła
                  async function registerUserdatabase(RegistrationData) {
                      const database = getDatabase();
                      push(ref(database, "users/"),RegistrationData);
                        

                    // const response = await fetch(
                    //   "https://homework-com-ed42c-default-rtdb.europe-west1.firebasedatabase.app/users.json",
                    //   {
                    //     method: "POST",
                    //     body: JSON.stringify(RegistrationData),
                    //     headers: {
                    //       "Content-Type": "application/json",
                    //     }
                    //   }
                    // );

                    // const data = await response.json();
                    // console.log(data);
                  }

          const submitHandler = (argument_role, event) => {
            event.preventDefault();
            if (
              firstName !== "" &&
              lastName !== "" &&
              email !== "" &&
              password !== ""
            ) {
              RegistrationData = {
                f_name: firstName,
                l_name: lastName,
                email: email,
                password: password,
                role: argument_role,
              };
              console.log(RegistrationData);
              registerUserdatabase(RegistrationData);
              RegisterUser();
              setFirstName("");
              setLastName("");
              setEmail("");
              setPassword("");
              console.log("Registration Succesfull");
            } else {
              console.log("No data inserted");
            }

          };


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