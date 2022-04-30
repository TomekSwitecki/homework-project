import React from "react";
import styles from "./Navbar.module.css";
import inputs from "../inputs.module.css";
const Navbar=()=>
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
  // console.log(new Date().toLocaleDateString());
  // console.log(props.deadline);
  //const  = new Date().toLocaleDateString();
  var today = new Date();
//   var options = { weekday: "long" };
//   console.log(today.toLocaleDateString("en-US", options));
  // const deadline = props.deadline;
  // // To calculate the time difference of two dates
  // var Difference_In_Time = firstDate.getTime() - deadline.getTime();
  // var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

  return (
    <React.Fragment>
      <div className={styles.navbar}>
        <span className={styles.logo}>
          homework<span className={styles.orange_dot}>.</span>com
        </span>
        <span className={styles.date}>
          <span className={styles.calendarIcon}>
            <box-icon name="calendar" type="solid" color="#000000"></box-icon>
          </span>
          {day + ". " + new Date().toLocaleDateString()}
        </span>

        <input
          required
          className={`${inputs.form__input} ${inputs.form__input__searchbar} ${styles.form_input_searchbar}`}
          type="text"
          placeholder="Search anything here..."
        />
        <img
        draggable
          className={styles.user_profile_picture}
          src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
        ></img>
      </div>
      <hr className={styles.horizontal_line}></hr>
    </React.Fragment>
  );
}

export default Navbar;