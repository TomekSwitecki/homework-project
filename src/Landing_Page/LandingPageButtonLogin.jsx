import React from "react";
import styles from "./LandingPage.module.css";
import { Link } from "react-router-dom";
function LandingPageButtonLogin(props) {
  return (
    <div className="LandingPageButtonLoginDiv">
      <Link to="/login" >
        <button className={styles.btn_login}>{props.text}</button>
      </Link>
    </div>
  );
}

export default LandingPageButtonLogin;
