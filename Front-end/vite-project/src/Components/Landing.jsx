import React, { useState } from "react";
import Home from "./Home";
import Navbar from "./Navbar";
import { LoginProvider } from "./LoginContext";

const Landing = () => {
    const [showLogin, setShowLogin] = useState(false);
    const toggleLogin = () => {
      setShowLogin(!showLogin);
    };
  return (

    <LoginProvider>
      
      <Home showLogin={showLogin} toggleLogin={toggleLogin} />
    </LoginProvider>
  );
};

export default Landing;
