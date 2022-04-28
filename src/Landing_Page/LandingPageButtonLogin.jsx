import React from "react";
import styles from "./LandingPage.module.css";
import buttons from "../buttons.module.css"
import { Link } from "react-router-dom";
function LandingPageButtonLogin(props) {
  return (
    <div className="LandingPageButtonLoginDiv">
      <Link to="/login">
        <button
          className={`${styles.btn_login} ${buttons.btn_large} ${buttons.btn_purple}`}
        >
          {props.text}
        </button>
      </Link>
    </div>
  );
}

export default LandingPageButtonLogin;
