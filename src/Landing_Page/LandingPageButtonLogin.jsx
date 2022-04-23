import React from "react";
import styles from "./LandingPage.module.css";
function LandingPageButtonLogin(props) {
  return (
    <div className="LandingPageButtonLoginDiv">
      <button className={styles.LandingPageButtonLogin}>{props.text}</button>
    </div>
  );
}

export default LandingPageButtonLogin;
