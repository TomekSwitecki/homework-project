import React from "react";
import styles from "./LandingPage.module.css";
import buttons from "../buttons.module.css";
import { Link } from "react-router-dom";

function LandingPageButton(props) {
  return (
    <div className={styles.LandingPageButtonDiv}>
      <Link to="/registration">
        <button className={`${buttons.btn_large} ${buttons.btn_orange}`}>
          {props.text}
        </button>
      </Link>
    </div>
  );
}

export default LandingPageButton;
