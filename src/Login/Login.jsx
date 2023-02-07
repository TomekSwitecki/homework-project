import React,{useState} from "react";
import fire from "../config/fire";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

import styles from "./Login.module.css";
import buttons from "../buttons.module.css";
import inputs from "../inputs.module.css";
import Inputfield from "../Inputfield/Inputfield"
import Heading from "../Heading/Heading";
// import loginLeft from "./img/Login__leftSide.png";
// import loginRight from "./img/Login__rightSide.png";
import Logo from "../Logo/Logo";
import Button from "../Button/Button";

import logo from "../logo.svg";

import pattern_purple from "./img/pattern_purple_thin.svg";
import pattern_orange from "./img/pattern_orange_thin.svg";
const Login=()=>
{
    const [email, setEmail] = useState("");
    const emailChangeHandler = (event) => {
      setEmail(event.target.value);
    };

    const [password, setPassword] = useState("");
    const passwordChangeHandler = (event) => {
      setPassword(event.target.value);
    };

    const VerifyUser=(event)=>
    {       event.preventDefault();
            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log("Succesfully signed in");
                alert("Succesfully signed in");
                // ...
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(error.toString());
                console.log(error.toString());
              });
    }

return (

  

    <div className={styles.login_container}>
            <img className={styles.pattern_left} src={pattern_purple}></img>
            <img className={styles.pattern_right} src={pattern_orange}></img>
        <div className={styles.logo}>
           <img src={logo}></img>
        </div>
      <form className={styles.form_container}>

        <Heading Heading={"Welcome back!  👋"} Subheading={"Don’t  have an account?"} LinkText={"Register"} LinkTo={"/Registration"} state={"TEACHER"}></Heading>
        <Inputfield required value={email} type="email" onChange={emailChangeHandler} label={"Email address"}></Inputfield>
        <Inputfield sublabel LinkTo="#" LinkText="Forgot password?" value={password} type="password" onChange={passwordChangeHandler} label={"Password"}></Inputfield>
        <Button   linkTo="#" type="submit" color="black" text="Sign In" onClick={VerifyUser} />
      </form>
    </div>


);
}

export default Login;