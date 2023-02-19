import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { getDatabase, push, ref } from "firebase/database";
import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import Button from "../Button/Button";
import Divider from "../Divider/Divider";
import Heading from "../Heading/Heading";
import google_icon from "../icons/icon_google.svg";
import logo from "../Ilustrations/logo.svg";
import Inputfield from "../Inputfield/Inputfield";
import RadioButton from "../RadioButton/RadioButton";
import registration from "./Registration.module.css";
import { showSuccessMessage, showErrorMessage, showInfoMessage } from '../utilities/Notifications';

const Registration = () => {

  let RegistrationData = {
    f_name: "",
    l_name: "",
    email: "",
    password: "",
    role: ""
  };

  const [firstName, setFirstName] = useState("");
  const firstNameChangeHandler = (event) => {
    setFirstName(event.target.value);
  };
  const [lastName, setLastName] = useState("");
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



  const location = useLocation();
  const role = location.state;



  const [Role, setRole] = useState(role);

  const submitHandler = (argument_role, event) => {
    if(Role!="")
    {
    if (firstName !== "" && lastName !== "" && email!=="" && password!="") {
      event.preventDefault();
      let emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      if (email.match(emailRegex) != null) {
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
            showSuccessMessage("Sign up completed", "Your account has ben successfully created.");

          })
          .catch((error) => {
            console.log(error);
            if(error == "FirebaseError: Firebase: Error (auth/email-already-in-use)."){
              showErrorMessage("Isdadsadsa", "Password shodsaasdt 6 characters.");
          }
            console.log(error.toString());
            showErrorMessage("Incorrect password", "Password should be at least 6 characters.");
          });

      }
      else {
        showErrorMessage("Incorrect email", "Incorrect email format.");
      }
    }
    else {
      showErrorMessage("Empty fields", "All inputfields must be filled.");
    }
  }
  else
  {
    showErrorMessage("No role selected", "All inputfields must be filled.");
  }
  };

  async function registerUserdatabase(
    RegistrationData
  ) {
    const database = getDatabase();
    push(ref(database, "users/"), RegistrationData);
  }
  const navigate = useNavigate();

  const returnLanding = () => {
    navigate('/landing');
  };

  return (

    <div className={registration.registration_container}>

      <div className={registration.logo}>
        <img src={logo} id="clickable_logo" alt="logo" onClick={returnLanding}></img>
      </div>

      <form className={registration.register_form_container}>
        <Heading Heading={"Sign up"} Subheading={"Already have an account?"} LinkText={"Login"} LinkTo={"/login"}></Heading>
        <form>
          <div className={registration.register_form_double__radio}>
            <RadioButton name={"role"} onChange={(e) => setRole("TEACHER")} color="purple" value="TEACHER" label="Teacher" isDefaultChecked={Role == "TEACHER"} ></RadioButton>
            <RadioButton name={"role"} onChange={(e) => setRole("STUDENT")} color="orange" value="STUDENT" label="Student" isDefaultChecked={Role == "STUDENT"} ></RadioButton>
          </div>
        </form>
        <div className={registration.register_form_double__input}>
          <Inputfield value={firstName} type="text" onChange={firstNameChangeHandler} label={"First name"}></Inputfield>
          <Inputfield value={lastName} type="text" onChange={lastNameChangeHandler} label={"Last name"}></Inputfield>
        </div>
        <Inputfield value={email} type="email" onChange={emailChangeHandler} label={"Email address"}></Inputfield>
        <Inputfield sublabel LinkTo={"/registration"} LinkText="Forgot password?" value={password} type="password" onChange={passwordChangeHandler} label={"Password"} state={"STUDENT"}></Inputfield>






        <div className={registration.form_buttons}>
          <Button size="medium" type="submit" color="black" text="Create account" onClick={(event) => submitHandler(Role, event)} />
          <Divider size="medium" text="or" type="text"></Divider>
          <Button size="medium" icon={google_icon} type="submit" color="white" text="Log in with Google" onClick={(event) => submitHandler(Role, event)} />
        </div>
      </form>

      <div className={Role == "STUDENT" ? registration.pattern_container__orange : registration.pattern_container__purple}>
        {/* <img src={Role=="STUDENT" ? pattern_orange : pattern_purple} className={registration.pattern_img}></img> */}
      </div>

    </div>
  );

}

export default Registration;