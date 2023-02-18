import ReactDOM from "react-dom";
import React from "react";
import SnackBar from "../Snackbar/Snackbar";

const triggerSnackbar = (title, message, messageType) => {
  const validMessageTypes = ["error", "info", "warning", "success"];
  if (!validMessageTypes.includes(messageType)) {
    throw Error("Invalid snackbar message type");
  }
  //This way, whenever the message content changes, a new SnackBar component will be mounted with a new unique key, 
  //which will cause React to unmount the old component and mount the new one. 
  //This should reset the timer and display the new message content correctly.
  const key = `${messageType}-${title}-${message}`; // generate unique key
  ReactDOM.render(
    <SnackBar
      key={key} // pass key prop
      messageType={messageType}
      timer={6500}
      title={title}
      message={message}
    />,
    document.getElementById("notification_container")
  );
};

export const showErrorMessage = (title, message) => {
  triggerSnackbar(title, message, "error");
};

export const showInfoMessage = (title, message) => {
  triggerSnackbar(title, message, "info");
};

export const showSuccessMessage = (title, message) => {
  triggerSnackbar(title, message, "success");
};

export const showWarningMessage = (title, message) => {
  triggerSnackbar(title, message, "warning");
};