import React from "react";
import { Link } from "react-router-dom";
import heading from "../Heading/Heading.module.css"

function Heading(props) {

  if (!props.small) {
    return (
      <div className={heading.Heading_container}>
        <span className={heading.Heading_text}>{props.Heading}</span>
        <div className={heading.Subheading_container}><span className={heading.Subheading_text}>{props.Subheading} </span>{props.LinkTo ? <Link to={props.LinkTo} className={"link"} state={props.state}>{props.LinkText}</Link> : null}</div>
      </div>
    );
  }
  else {
    return (
      <div className={heading.Heading_container}>
        <span className={heading.Heading_text__small}>{props.Heading}</span>
        <div className={heading.Subheading_container}><span className={heading.Subheading_text__small}>{props.Subheading} </span></div>
      </div>
    );
  }

}

export default Heading;
