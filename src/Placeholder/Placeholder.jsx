import React from "react";
import styles from "../Placeholder/Placeholder.module.css";
import PlaceholdeHeader from "./PlaceholderHeader";


const Placeholder=(props)=>
{

  return (
    <div className={styles.Placeholder_container} alt="src">
       {props.img ? <img src={props.img} className={styles.Placeholder_image} alt="placeholder_img"/> : null} 
       <PlaceholdeHeader Heading={props.Heading} Subheading={props.Subheading}></PlaceholdeHeader>
  </div>
  );
}

export default Placeholder;