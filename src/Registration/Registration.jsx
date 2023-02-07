import React from "react";
import { useState } from "react";
import {useLocation} from 'react-router-dom';
import fire from "../config/fire";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, push, ref, set } from "firebase/database";
import styles from "./Registration.module.css";
import inputs from "../inputs.module.css"
import buttons from "../buttons.module.css"

import Button from "../Button/Button";
import RadioButton from "../RadioButton/RadioButton";
import Inputfield from "../Inputfield/Inputfield"
import Heading from "../Heading/Heading";

import pattern_purple from "./img/pattern-purple.png";
import pattern_orange from "./img/pattern-orange.png";
import Divider from "../Divider/Divider";
import { Link } from "react-router-dom";

import logo from "../logo.svg";

import google_icon from "../icons/icon_google.svg";

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



    const location = useLocation();
    const role= location.state;
    console.log("location role"+role);

    
    const[Role,setRole]=useState(role);
    console.log(Role);
    // const roleChangeHandler = (event) => {
    //   // console.log(Role);
    //   // setRole(event.target.value);
    //   console.log(event.target.value);
    //   setRole(event.target.value);
    //   // console.log(Role);
    //   // console.log(Role);
    // };
    
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

  <div className={styles.registration_container}>

      <div className={styles.logo}>
           <img src={logo}></img>
        </div>

      <form className={styles.register_form_container}>
        <Heading Heading={"Sign up"} Subheading={"Already have an account?"} LinkText={"Login"} LinkTo={"/login"}></Heading>
        <form>
        <div className={styles.register_form_double__radio}>
          <RadioButton name={"role"}  onChange={(e) => setRole("TEACHER")} color="purple" value="TEACHER" label="Teacher" isDefaultChecked={Role=="TEACHER"} ></RadioButton>
          <RadioButton name={"role"}  onChange={(e) => setRole("STUDENT")} color="orange" value="STUDENT" label="Student" isDefaultChecked={Role=="STUDENT"} ></RadioButton>
        </div>
        </form>
        <div className={styles.register_form_double__input}>
          <Inputfield value={firstName} type="text" onChange={firstNameChangeHandler} label={"First name"}></Inputfield>
          <Inputfield value={lastName} type="text" onChange={lastNameChangeHandler} label={"Last name"}></Inputfield>
        </div>
        <Inputfield value={email} type="email" onChange={emailChangeHandler} label={"Email address"}></Inputfield>
        <span
            className={`${styles.invalid__email}`}
            style={{ display: invalidEmail ? "block" : "none" }}
          >
            Incorrect email
          </span>
        <Inputfield sublabel LinkTo="#" LinkText="Forgot password?" value={password} type="password" onChange={passwordChangeHandler} label={"Password"}></Inputfield>
        
        


          

        <div className={styles.form_buttons}>
        <Button medium  linkTo="#" type="submit" color="black" text="Create account" onClick={(event) => submitHandler(Role, event)} />
        <Divider text="or" type="text"></Divider>
        <Button icon={google_icon} medium linkTo="#" type="submit" color="white" text="Log in with Google" onClick={(event) => submitHandler(Role, event)} />   
        </div>
      </form>

      <div className={Role=="STUDENT" ? styles.pattern_container__orange : styles.pattern_container__purple }>
      {/* <img src={Role=="STUDENT" ? pattern_orange : pattern_purple} className={styles.pattern_img}></img> */}
       </div>

  </div>
);

}

export default Registration;