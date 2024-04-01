import React from "react";
import big from "../assets/big-logo.png";
import "./styles/landing.css";

const About = () => {
  return (
    <div>
      <section id="About">
        <div className="about-section-container">
          <img className="about-section-logo" src={big} alt="" />
          <div className="about-section-text-container">
            <h1 className="primary-heading">ESI SPACE</h1>
            <p className="primary-text">
              Plateforme d’enseignement en ligne qui permet de créer des espaces
              d’apprentissage dans lesquels peuvent etre déposées des ressources
              et/ou une multitude d’activités pédagogiques incluant des
              activités d’évalution,de commmunication et/ou de collaboration
              ;créant ainsi un environnement d’apprentissage n ligne favorisant
              les échanges et les interactions entre les étudiants et les
              ensignants de esi sba
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
