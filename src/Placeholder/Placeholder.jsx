import React from "react";
import placeholder from "../Placeholder/Placeholder.module.css";
import PlaceholdeHeader from "./PlaceholderHeader";


const Placeholder=(props)=>
{

  return (
    <div id={props.id} className={placeholder.Placeholder_container} alt="src">
       {props.img ? <img src={props.img} className={`${placeholder.Placeholder_image} ${placeholder[`Placeholder_image__${props.size}`]}`} alt="placeholder_img"/> : null} 
       <PlaceholdeHeader Heading={props.Heading} Subheading={props.Subheading}></PlaceholdeHeader>
  </div>
  );
}

export default Placeholder;