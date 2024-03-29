import React, { useState, useEffect } from "react";
import notification from "../Notification/Notification.module.css";
import ReactDOM from "react-dom";
import FlexContainer from "../FlexContainer/FlexContainer";
import IconButton from "../Button/IconButton";
import IconClose from "../Notification/icons/close_icon.svg";

export default function Notification(props) {
  const [closeTimeout, setCloseTimeout] = useState(null);

  useEffect(() => {
    beginCloseTimeout();
  }, [props.message]); // add props.message to dependency array

  const closeNotification = () => {
    clearTimeout(closeTimeout);
    ReactDOM.unmountComponentAtNode(
      document.getElementById("notification_container")
    );
  };

  const beginCloseTimeout = () => {
    if (props.timer) {
      const timeout = setTimeout(() => closeNotification(), props.timer);
      setCloseTimeout(timeout);
    }
  };

  return (
    <div
      className={`${notification.notification_container} ${notification[`${props.messageType}_type`]}`}
      // onMouseEnter={() => clearTimeout(closeTimeout)}
      // onMouseLeave={() => beginCloseTimeout()}
    >
      <div className={notification.content_wrapper}>
        <FlexContainer
          props={{ gap: "16", direction: "row", align: "center" }}
        >
          <div
            className={`${notification.notification_icon} ${notification[`${props.messageType}_icon`]}`}
          ></div>
          <div className={notification.notification_info_container}>
            <span className={notification.notification_title}>
              {props.title}
            </span>
            <span className={notification.notification_subtitle}>
              {props.message}
            </span>
          </div>
        </FlexContainer>
        <div>
          <IconButton
            icon={IconClose}
            onClick={() => closeNotification()}
          ></IconButton>
        </div>
      </div>
    </div>
  );
}