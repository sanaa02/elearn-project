import React, { createContext, useState } from "react";

const LoginContext = createContext(); // Default value for showLogin

const LoginProvider = ({ children }) => {
  const [showLogin, setShowLogin] = useState(false);

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  };

  return (
    <LoginContext.Provider value={{ showLogin, toggleLogin }}>
      {children}
    </LoginContext.Provider>
  );
};

export { LoginContext, LoginProvider };
