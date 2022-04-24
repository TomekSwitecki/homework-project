import React,{useState} from "react";
import fire from "../config/fire";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
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
                // ...
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error.toString());
              });
    }

return (
  <div className={styles.login}>
   <div className={styles.logo}>
      <Logo />
      <img src={loginLeft}></img>
   </div> 
    <div className={styles.login_div}>
      
      
      
      <form className={styles.form}>
      <div className={styles.welcome}>Welcome back!</div>
      <div className={styles.new_here}>New Here? <Link to="/registration" className={styles.createAccount}>Create an account.</Link></div>
        <input
          className={styles.form__input}
          onChange={emailChangeHandler}
          value={email}
          type="email"
          placeholder="Email address"
        />
        <input
        className={styles.form__input}
          onChange={passwordChangeHandler}
          value={password}
          type="password"
          placeholder="Password"
        />

        <button
        className={styles.submit_form}
          type="submit"
          onClick={VerifyUser}
        >
          Sign In
        </button>

      </form>
      <img src={loginRight} className={styles.login__right}></img>
    </div>
  </div>


)
}

export default Login;