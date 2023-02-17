import ReactDOM from 'react-dom';
import React from "react";
import SnackBar from '../Snackbar/Snackbar';

const triggerSnackbar = (title, message, messageType) => {
    const validMessageTypes = ['error', 'info', 'warning', 'success'];
    if (!validMessageTypes.includes(messageType)) {
        throw Error("Invalid snackbar message type");
    }
    ReactDOM.render(
        <SnackBar messageType={messageType} timer={2700} title={title} message={message} />,
        document.getElementById('notification_container')
    );
}

export const showErrorMessage = (title, message) => {
    triggerSnackbar(title, message, 'error');
}

export const showInfoMessage = (title, message) => {
    triggerSnackbar(title, message, 'info');
}

export const showSuccessMessage = (title, message) => {
    triggerSnackbar(title, message, 'success');
}

export const showWarningMessage = (title, message) => {
    triggerSnackbar(title, message, 'warning');
}