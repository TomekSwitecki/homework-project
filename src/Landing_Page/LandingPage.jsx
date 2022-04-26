import React from "react";

import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";

import Swoosh from "./img/Swoosh.svg";
import LandingPageButton from "./LandingPageButton";
import LandingPageButtonLogin from "./LandingPageButtonLogin";

import styles from "./LandingPage.module.css";

function LandingPage() {
  return (
    <div className={styles.LandingPage_container}>
      <div className={styles.LandingPage__left}>
        <div className={styles.logo_pos}>
          <Logo />
        </div>
        <div className={styles.LandingPage__advert}>
          <div className={styles.LandingPage__grades}>
            get <span className={styles.LandingPage__better}>better</span>{" "}
            grades.
            <div className={styles.LandingPage__swooshDiv}>
              <img
                className={styles.LandingPage__swoosh}
                src={Swoosh}
                alt="swoosh"
                draggable="false"
              />
            </div>
          </div>
          <div className={styles.LandingPage__description}>
            an easy student assignment app
            <br />
            to help simplify <br />
            universities of the future.
          </div>
          {/* <Link to="/registration"></Link> */}
          <LandingPageButton text="GET STARTED" />
        </div>
        <img
          className={styles.LandingPage__dots}
          src={require(`./img/dots3.png`)}
          alt="dots"
          draggable="false"
        />
      </div>

      <div className={styles.LandingPage__right}>
        <img
          className={styles.LandingPage__img_landing_right}
          src={require(`./img/landing_right.png`)}
          alt="image_main"
          draggable="false"
        />
        <LandingPageButtonLogin classname={styles.btn_login} text="LOG IN" />
      </div>
    </div>
  );
}

export default LandingPage;
