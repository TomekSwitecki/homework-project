import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import Button from "../Button/Button";
import Heading from "../Heading/Heading";
import Inputfield from "../Inputfield/Inputfield";
import styles from "./Login.module.css";

import logo from "../Ilustrations/logo.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const [password, setPassword] = useState("");
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const VerifyUser = (event) => {
    event.preventDefault();
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
      {/* <img className={styles.pattern_left} src={pattern_purple} alt="pattern_purple"></img> */}
      <div className={styles.pattern_right}></div>
      {/* <img className={styles.pattern_right} src={img_right} alt="login ilustration"></img> */}
      <div className={styles.logo}>
        <img src={logo}></img>
      </div>
      <form className={styles.form_container}>

        <Heading link Heading={"Welcome back!  👋"} Subheading={"Not registered yet?"} LinkText={"Create an account"} LinkTo={"/Registration"} state={"TEACHER"}></Heading>
        <Inputfield required value={email} type="email" onChange={emailChangeHandler} label={"Email address"}></Inputfield>
        <Inputfield sublabel LinkText="Forgot password?" LinkTo="#" value={password} type="password" onChange={passwordChangeHandler} label={"Password"}></Inputfield>
        <Button size="full" type="submit" color="black" text="Sign In" onClick={VerifyUser} />
      </form>
    </div>


  );
}

export default Login;