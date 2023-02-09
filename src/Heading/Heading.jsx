import React from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import Headings from "../Heading/Heading.module.css"
import buttons from "../buttons.module.css";

function Heading(props) {

  if(!props.small)
  {
    return (
      <div className={Headings.Heading_container}>
             <span className={Headings.Heading_text}>{props.Heading}</span>
             <div className={Headings.Subheading_container}><span className={Headings.Subheading_text}>{props.Subheading} </span>{props.link ?<Link to={props.LinkTo} className={"link"} state={props.state}>{props.LinkText}</Link>: null}</div>
      </div>
    );
  }
  else
  {
    return (
      <div className={Headings.Heading_container}>
             <span className={Headings.Heading_text__small}>{props.Heading}</span>
             <div className={Headings.Subheading_container}><span className={Headings.Subheading_text__small}>{props.Subheading} </span></div>
      </div>
    );
  }

}

export default Heading;
