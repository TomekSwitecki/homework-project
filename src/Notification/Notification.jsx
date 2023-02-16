import { createContext, useState } from 'react';

const ALERT_TIME = 5000;
const initialState = {
  text: '',
  type: '',
};

const NotificationContext = createContext({
  ...initialState,
  setAlert: () => {},
});

export const AlertProvider = ({ children }) => {
  const [text, setText] = useState('');
  const [type, setType] = useState('');

  const setAlert = (text, type) => {
    setText(text);
    setType(type);

    setTimeout(() => {
      setText('');
      setType('');
    }, ALERT_TIME);
  };

  return (
    <NotificationContext.Provider
      value={{
        text,
        type,
        setAlert,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;