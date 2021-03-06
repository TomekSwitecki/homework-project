import React from "react";
import { useState } from "react";
import fire from "../config/fire";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, push, ref, set } from "firebase/database";
import styles from "./Registration.module.css";
import inputs from "../inputs.module.css"
import buttons from "../buttons.module.css"

import student_image from "./img/student_image.png"
import dots from "./img/dots.png"
import arch from "./img/arch.png"
import Logo from "../Logo/Logo";

import { Link } from "react-router-dom";

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

  const [invalidEmail, setInvalidEmail] = useState(false);
  const invalidEmailChangeHandler = () => {
    setInvalidEmail(invalidEmail ? "" : !invalidEmail)
    console.log(invalidEmail);
  }

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

              // Email matching 
              let emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

              if(email.match(emailRegex) != null)
              {
                
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
              //if email is incorrectx
              else
              {
                 setInvalidEmail(true);
                //invalidEmailChangeHandler();
                //alert("Incorrect email");
                //alert(email);
              }
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
  <div className={styles.registration_div}>
    <div className={styles.register_left}>
      <div className={styles.logo_registration}>
        <Logo />
      </div>
      <div className={styles.started}>Let's get started!</div>
      {/* <div className={styles.details}>Enter your details</div> */}
      <div className={styles.new_here}>
        Already registered?{" "}
        <Link to="/login" className={styles.login}>
          Sign in.
        </Link>
      </div>
      <img draggable="false" className={styles.dots} src={dots}></img>
      <img draggable="false" className={styles.arch} src={arch}></img>
      <form className={styles.register_left_form}>
        <input
          required
          className={`${inputs.form__input} ${inputs.form__input__viewport} ${styles.form_input_registration}`}
          onChange={firstNameChangeHandler}
          value={firstName}
          type="text"
          placeholder="First Name"
        />
        <input
          required
          className={`${inputs.form__input} ${inputs.form__input__viewport} ${styles.form_input_registration}`}
          onChange={lastNameChangeHandler}
          value={lastName}
          type="text"
          placeholder="Last Name"
        />
        
          <input
            required
            className={`${inputs.form__input} ${inputs.form__input__viewport} ${styles.form_input_registration}`}
            onChange={emailChangeHandler}
            value={email}
            type="email"
            placeholder="Email"
          />
          <span
            className={`${styles.invalid__email}`}
            style={{ display: invalidEmail ? "block" : "none" }}
          >
            Incorrect email
          </span>
        
        <input
          required
          className={`${inputs.form__input} ${inputs.form__input__viewport}  ${styles.form_input_registration}`}
          onChange={passwordChangeHandler}
          value={password}
          type="password"
          placeholder="Password"
        />

        <div className={styles.register_as}>Register as a:</div>
        <div className={styles.form_buttons}>
          <button
            className={`${buttons.btn_large} ${buttons.btn_orange} ${styles.register_btn}`}
            type="submit"
            onClick={(event) => submitHandler("TEACHER", event)}
          >
            Teacher
          </button>
          <button
            className={`${buttons.btn_large} ${buttons.btn_purple} ${styles.register_btn}`}
            type="submit"
            onClick={(event) => submitHandler("STUDENT", event)}
          >
            Student
          </button>
        </div>

        {/* <button
          type="submit"
          onClick={RegisterUser}
        > 
          Register as student
        </button>
        */}
      </form>
    </div>

    <div className={styles.register_right}>
      <img
        draggable="false"
        src={student_image}
        className={styles.student_image}
      ></img>
    </div>
  </div>
);

}

export default Registration;