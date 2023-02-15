import React from "react";
import navbar from "./Navbar.module.css";
import NavbarButton from "./NavbarButton";
import Button from "../Button/Button";
import logo from "../logo2.svg";
import Controls from "../Controls.svg";


import logout_icon from "../icons/icon_logout.svg";
const Navbar = (props) => {

  return (
    <React.Fragment>
      <div className={navbar.navbar_container}>
        <img src={Controls} className={navbar.controls} alt="controls" ></img>
        <img src={logo} className={navbar.logo} alt="logo"></img>
        <div className={navbar.button_container}>
          {props.subjects.map((e, index) => (
            <NavbarButton
              key={e.index}
              id={index}
              name={e.Subject_name}
              addedStudents={e.addedStudents}
              description={e.Subject_description}
              onSubjectSelected={props.onSubjectSelectedDataHandler}
            />
          ))
          }
        </div>
        <div className={navbar.lower_container}>
          <div className="expander__full">
            <hr className={navbar.navbar_divider}></hr>
            <Button size="full" type="submit" color={props.role == "TEACHER" ? "purple" : "orange"} text={props.role == "TEACHER" ? "Create Class" : "Add Class"} onClick={props.onClick} />
          </div>
          <div className="expander__medium">
            <hr className={navbar.navbar_divider}></hr>
            <NavbarButton id={"btn_logout"} icon={logout_icon} name={"Log Out"} logout={props.logout}></NavbarButton>
          </div>
        </div>

      </div>
    </React.Fragment>
  );
}

export default Navbar;