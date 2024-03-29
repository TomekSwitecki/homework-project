import React from "react";
import Button from "../Button/Button";
import logo from "../Ilustrations/logo.svg";
import hero_ilustration from './img/Landing_Ilustration.svg';
import styles from "./LandingPage.module.css";
import { showSuccessMessage, showErrorMessage, showInfoMessage } from '../utilities/Notifications';
function LandingPage() {

  function showMessage()
  {
    showInfoMessage("Work in progress :)", "This feature is not currently available.")
  }
  return (
    <div className={styles.LandingPage_container}>

      <div className={styles.logo}>
        <img src={logo} alt="logo"></img>
      </div>
      <div className={styles.buttons_navbar}>
        <Button onClick={ showMessage } size="full"  color="ghost" text="Product" />
        <Button onClick={ showMessage } size="full" color="ghost" text="Pricing" />
        <Button onClick={ showMessage }  size="full" color="ghost" text="Contact" />
        <Button  size="full" linkTo="/login" color="black" text="Login" />
      </div>

      <div className={styles.hero_container}>
        <div className={styles.hero_headline_container}>
          <div className={styles.hero_headline}><span className="orange_accent">Studying</span> made easy.</div>
          <div className={styles.hero_headline}><span className="purple_accent" >Teaching</span> made easy.</div>
        </div>

      </div>
      <div className={styles.hero_paragraph_container}>
        <p className={styles.hero_paragraph}>Say hello to seamless collaboration, organized assignments, and real-time progress tracking - all in one place! Experience the future of remote education.</p>
      </div>

      {/* <Link to="/registration"></Link> */}
      <div className={styles.hero_buttons_grid_container}>

        <Button size="full" linkTo="/registration" color="orange" text="Start learning" state={"STUDENT"} />
        <Button size="full" linkTo="/registration" color="purple" text="Start teaching" state={"TEACHER"} />

      </div>

      <div className={styles.hero_ilustration}>
        <img src={hero_ilustration} alt="Landing Page ilustration"></img>

      </div>
      <div className={styles.testimony_container}>
        <p className={styles.testimony_paragraph}>Already trusted us:</p>
        <div className={styles.testimony_container__wrapper}>

          <div>
            <span className={styles.testimony_number}>36</span>
            <p className={styles.testimony_desc}>Universities</p>
          </div>

          <div>
            <span className={styles.testimony_number}>786</span>
            <p className={styles.testimony_desc}>Schools</p>
          </div>

          <div>
            <span className={styles.testimony_number}>98k+</span>
            <p className={styles.testimony_desc}>Students</p>
          </div>

          <div>
            <span className={styles.testimony_number}>212k+</span>
            <p className={styles.testimony_desc}>Students</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default LandingPage;
