import React from "react";
import downloadContent from "../DownloadContent/DownloadContent.module.css"

function DownloadContent(props) {

  return (
    <div className={`${[`expander__${props.size}`]}`}>
      <div className={downloadContent.icon_Container}>
        <a className={downloadContent.Download_Container} target="_blank" href={props.href}>
          <div className={downloadContent.Link_Container}>
            Download attached files
            <span className={downloadContent.label_link_text}>{props.href}</span>
          </div>
        </a>

      </div>
    </div>
  );
}

export default DownloadContent;
