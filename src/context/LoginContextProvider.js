import React, { createContext, useState } from "react";

export const LoginContext = createContext();
const LoginContextProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <LoginContext.Provider value={[loggedInUser, setLoggedInUser]}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
