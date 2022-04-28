import React,{useState} from "react";
import fire from "../config/fire";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

import styles from "./Login.module.css";
import buttons from "../buttons.module.css";
import inputs from "../inputs.module.css";


import loginLeft from "./img/Login__leftSide.png";
import loginRight from "./img/Login__rightSide.png";
import Logo from "../Logo/Logo";



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
    <div className={styles.login_left}>
      <div className={styles.logo_pos}>
        <Logo />
      </div>
      <img draggable="false" src={loginLeft} alt="graphics-left"></img>
    </div>

    <div className={styles.login_center}>
      <form className={styles.form_container}>
        <div className={styles.welcome}>Welcome back!</div>
        <div className={styles.new_here}>
          New Here?{" "}
          <Link to="/registration" className={styles.createAccount}>
            Create an account.
          </Link>
        </div>
        <input
          className={`${inputs.form__input} ${inputs.form__input__big}`}
          onChange={emailChangeHandler}
          value={email}
          type="email"
          placeholder="Email address"
        />
        <input
          className={`${inputs.form__input} ${inputs.form__input__big}`}
          onChange={passwordChangeHandler}
          value={password}
          type="password"
          placeholder="Password"
        />

        <button
          className={`${buttons.btn_large} ${buttons.btn_orange}`}
          type="submit"
          onClick={VerifyUser}
        >
          Sign In
        </button>
      </form>
    </div>

    <div className={styles.login_right}>
      <img draggable="false" src={loginRight} alt="graphics-right"></img>
    </div>
  </div>
);
}

export default Login;