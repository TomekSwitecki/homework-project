import React,{useState} from "react";
import fire from "../config/fire";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";



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
  <div>
    <form>

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
        onClick={VerifyUser}
      >
        LOGIN
      </button>

    </form>
  </div>


)
}

export default Login;