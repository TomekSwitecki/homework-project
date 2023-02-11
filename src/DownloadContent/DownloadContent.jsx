import React from "react";


import { Link } from "react-router-dom";
import styles from "../DownloadContent/DownloadContent.module.css"



function DownloadContent(props) {

  return (
    <div className={`${[`expander__${props.size}`]}`}>
        <div className={styles.icon_Container}>
            <a className={styles.Download_Container} target="_blank" href={props.href}>
            <div className={styles.Link_Container}>
            Download attached files
            <span className={styles.label_link_text}>{props.href}</span>
            </div>
            </a>
            
            </div>
    </div>
  );
}

export default DownloadContent;
