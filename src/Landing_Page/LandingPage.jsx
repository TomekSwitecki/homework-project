import React from "react";

import { Link } from "react-router-dom";


import Swoosh from "./img/Swoosh.svg";
import LandingPageButton from "./LandingPageButton";
import LandingPageButtonLogin from "./LandingPageButtonLogin";

import styles from "./LandingPage.module.css";

function LandingPage() {
  return (
    <div className={styles.LandingPage}>
      <div className={styles.LandingPage__firstHalf}>
        <div className={styles.LandingPage__logo}>
          Homework<span className={styles.LandingPage__dot}>.</span>com
        </div>

        <div className={styles.LandingPage__advert}>
          <div className={styles.LandingPage__grades}>
            get <span className={styles.LandingPage__better}>better</span>{" "}
            grades.
            <div className={styles.LandingPage__swooshDiv}>
              <img className={styles.LandingPage__swoosh} src={Swoosh} />
            </div>
          </div>
          <div className={styles.LandingPage__description}>
            an easy student assignment app
            <br />
            to help simplify <br />
            universities of the future.
          </div>
          <Link to="/registration">
            <LandingPageButton text="GET STARTED" />
          </Link>
        </div>
        <img
          className={styles.LandingPage__dots3}
          src={require(`./img/dots3.png`)}
        />
      </div>

      <div className={styles.LandingPage__secondHalf}>
        <img
          className={styles.LandingPage__img1}
          src={require(`./img/img1.png`)}
        />
        <img
          className={styles.LandingPage__img2}
          src={require(`./img/img2.png`)}
        />
        <img
          className={styles.LandingPage__dots1}
          src={require(`./img/dots1.png`)}
        />
        <img
          className={styles.LandingPage__dots2}
          src={require(`./img/dots2.png`)}
        />

        <img
          className={styles.LandingPage__shape1}
          src={require(`./img/shape1.png`)}
        />
        <Link to="/login">
          <LandingPageButtonLogin
            classname={styles.LandingPage__login}
            text="LOG IN"
          />
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
