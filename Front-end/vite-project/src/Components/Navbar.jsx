import React, { useState } from "react";
import "./styles/landing.css";
import logo from "../assets/small-logo.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import LoginPage from "../Components/pages/LoginPage";
import Home from "./Home";

const Navbar = ({ showLogin, toggleLogin }) => {
  //  const [showLogin, setShowLogin] = useState(false);
  //  const toggleLogin = () => {
  //    setShowLogin(!showLogin);
  //    console.log(showLogin);
  //  };

  const [click, setClick] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      });
    }
  };

  const handleLogin = () => {
    // Votre logique de redirection ici
    const isAdmin = false; // Remplacez ceci par votre logique de détermination du statut de l'utilisateur
    const isTeacher = false; // Remplacez ceci par votre logique de détermination du statut de l'utilisateur

    if (isAdmin) {
      navigate("/admin");
    } else if (isTeacher) {
      navigate("/teacher");
    } else {
      navigate("/student");
    }
    closeMobileMenu(); // Fermer le menu mobile après avoir cliqué sur "Se connecter"
  };

  return (
    <div>
      <nav className={showLogin ? "blurred-nav" : ""}>
        <div className="nav-logo-container">
          <img src={logo} alt="" />
        </div>
        <div
          className={
            click ? "navbar-links-container active" : "navbar-links-container"
          }
        >
          <Link
            to="/"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              closeMobileMenu();
            }}
          >
            Accueil
          </Link>
          <Link
            onClick={() => {
              scrollToSection("About");
              closeMobileMenu();
            }}
          >
            À propos
          </Link>
          <Link
            onClick={() => {
              scrollToSection("contact");
              closeMobileMenu();
            }}
          >
            Contact
          </Link>

          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          ></div>
        </div>
        <button className="primary-button" onClick={toggleLogin}>
          Se connecter
        </button>
      </nav>
      {showLogin && <LoginPage />}
    </div>
  );
};

export default Navbar;


{/* <div className="menu-icon" onClick={handleClick}>
  {click ? <FaTimes /> : <FaBars />}
</div>; */}
