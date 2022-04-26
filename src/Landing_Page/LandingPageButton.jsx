import React from "react";
import styles from "./LandingPage.module.css";
import { Link } from "react-router-dom";

function LandingPageButton(props) {
  return (
    <div className={styles.LandingPageButtonDiv}>
      <Link to="/registration">
        <button className={styles.btn_register}>{props.text}</button>
      </Link>
    </div>
  );
}

export default LandingPageButton;
