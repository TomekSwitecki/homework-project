import React from "react";
import styles from "../Placeholder/Placeholder.module.css";

function PlaceholdeHeader(props) {


    return (
      <div className={styles.Heading_container}>
             <span className={styles.Heading_text}>{props.Heading}</span>
             <div className={styles.Subheading_container}><span className={styles.Subheading_text}>{props.Subheading} </span></div>
      </div>
    );
  
}

export default PlaceholdeHeader;
