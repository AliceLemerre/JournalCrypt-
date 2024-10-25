import React, { createContext, useState } from 'react';

const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [messageList, setMessageList] = useState([]);

  return (
    <MyContext.Provider value={{ messageList, setMessageList }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };
