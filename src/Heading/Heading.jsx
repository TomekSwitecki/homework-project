import React from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import Headings from "../Heading/Heading.module.css"
import buttons from "../buttons.module.css";

function Heading(props) {

  return (
    <div className={Headings.Heading_container}>
           <span className={Headings.Heading_text}>{props.Heading}</span>
           <div className={Headings.Subheading_container}><span className={Headings.Subheading_text}>{props.Subheading}</span><Link to={props.LinkTo} className={"link"}>{props.LinkText}</Link></div>
    </div>
  );
}

export default Heading;
