import React from "react";
import styles from "./Navbar.module.css";
import inputs from "../inputs.module.css";
import NavbarButton from "./NavbarButton";
import Button from "../Button/Button";
import logo from "../logo2.svg";
import Controls from "../Controls.svg";
import Divider from "../Divider/Divider";

import logout_icon from "../icons/icon_logout.svg";
const Navbar=(props)=>
{
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    var day=(days[new Date().getDay()]);
    var today = new Date();


  return (
    <React.Fragment>
      <div className={styles.navbar_container}>
           <img src={Controls} className={styles.controls} ></img>
           <img src={logo} className={styles.logo} ></img>

        {/* <span className={styles.date}>
          <span className={styles.calendarIcon}>
            <box-icon name="calendar" type="solid" color="#000000"></box-icon>
          </span>
          {day + ". " + new Date().toLocaleDateString()}
        </span> */}
        <div className={styles.button_container}>
        {props.subjects.map((e, index) => (
            <NavbarButton
              key={e.index}
              id={index}
              name={e.Subject_name}
              addedStudents={e.addedStudents}
              description={e.Subject_description}
              onSubjectSelected={props.onSubjectSelectedDataHandler}
            />
          ))}
        </div>
        <div className={styles.lower_container}>
          <div className="expander__full">
            <hr className={styles.navbar_divider}></hr>
            <Button size="full"  type="submit" color="purple" text="Create Class" onClick={props.onClick}  />
            </div>
            <div className="expander__medium">
            <hr className={styles.navbar_divider}></hr>
            <NavbarButton id={"btn_logout"} icon={logout_icon} name={"Log Out"} logout={props.logout}></NavbarButton>
          </div>
        </div>

      </div>
    </React.Fragment>
  );
}

export default Navbar;