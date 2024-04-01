import React, { useContext, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import "./styles/landing.css";
import "./styles/login.css";
import "./About";
import circles from "../assets/circles.png";
import line1 from "../assets/point1.png";
import line2 from "../assets/point2.png";
import line3 from "../assets/point3.png";
import Navbar from "./Navbar";
import Contact from "./Contact";
import About from "./About";
import Footer from "./Footer";
import LoginPage from "../Components/pages/LoginPage";

const Home = ({ showLogin, toggleLogin }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initialisez l'état de connexion à false
  const [userRole, setUserRole] = useState(null); // Initialisez le rôle de l'utilisateur à null
  console.log("page something happened");
  // Fonction pour changer le rôle de l'utilisateur
  const handleUserRoleChange = (role) => {
    setUserRole(role);
    setIsLoggedIn(true); // Définir l'état de connexion à true lors de la connexion de l'utilisateur
  };

  // Fonction pour déterminer quelle page afficher en fonction du rôle de l'utilisateur
  const getPageForUserRole = () => {
    switch (userRole) {
      case "admin":
        return <AdminPage />;
      case "teacher":
        return <TeacherPage />;
      case "student":
        return <StudentPage />;
      default:
        return null; // Afficher une page vide si le rôle de l'utilisateur n'est pas encore défini
    }
  };

  return (
    <div className="home-root">
      {console.log(showLogin)}
      <Navbar showLogin={showLogin} toggleLogin={toggleLogin} />
      <div id="home-content" className={showLogin ? "login-active" : ""}>
        <div
          className="home-root-container"
          style={{ position: "relative", minHeight: "100vh" }}
        >
          <section id="Home">
            <div className="home-container">
              <div className="three-lines">
                <img className="line1" src={line1} />
                <img className="line2" src={line2} />
                <img className="line3" src={line3} />
              </div>
              <img className="circles" src={circles} />
              <div className="home-banner-container">
                <div className="home-text-section">
                  <h1 className="primary-heading">Commencez</h1>
                  <h1 className="votre-back">Votre</h1>
                  <h1>voyage à</h1>
                  <div className="last-two">
                    <h1>L`Espace du</h1>
                    <h1 className="back-text">ESI SBA</h1>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="About">
            <About />
          </section>
          <section id="contact">
            <Contact />
          </section>

          <section id="Footer">
            <Footer />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
