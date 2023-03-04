import ReactDOM from "react-dom";
import React from "react";
import Notification from "../Notification/Notification";

const triggerNotification = (title, message, messageType) => {
  const validMessageTypes = ["error", "info", "warning", "success"];
  if (!validMessageTypes.includes(messageType)) {
    throw Error("Invalid Notification message type");
  }
  //This way, whenever the message content changes, a new Notification component will be mounted with a new unique key, 
  //which will cause React to unmount the old component and mount the new one. 
  //This should reset the timer and display the new message content correctly.
  const key = `${messageType}-${title}-${message}`; // generate unique key
  ReactDOM.render(
    <Notification
      key={key} // pass key prop
      messageType={messageType}
      timer={3000}
      title={title}
      message={message}
    />,
    document.getElementById("notification_container")
  );
};

export const showErrorMessage = (title, message) => {
  triggerNotification(title, message, "error");
};

export const showInfoMessage = (title, message) => {
  triggerNotification(title, message, "info");
};

export const showSuccessMessage = (title, message) => {
  triggerNotification(title, message, "success");
};

export const showWarningMessage = (title, message) => {
  triggerNotification(title, message, "warning");
};