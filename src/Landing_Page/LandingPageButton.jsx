import React from "react";
import styles from "./LandingPage.module.css";

function LandingPageButton(props) {
  return (
    <div className={styles.LandingPageButtonDiv}>
      <button className={styles.LandingPageButton}>{props.text}</button>
    </div>
  );
}

export default LandingPageButton;
