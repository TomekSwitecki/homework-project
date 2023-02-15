import React from "react";
import placeholder from "../Placeholder/Placeholder.module.css";

function PlaceholdeHeader(props) {


    return (
      <div className={placeholder.Heading_container}>
             <span className={placeholder.Heading_text}>{props.Heading}</span>
             <div className={placeholder.Subheading_container}><span className={placeholder.Subheading_text}>{props.Subheading} </span></div>
      </div>
    );
  
}

export default PlaceholdeHeader;
