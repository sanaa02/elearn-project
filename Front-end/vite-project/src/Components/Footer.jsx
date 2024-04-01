import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import "./styles/landing.css";
import down from "../assets/down-line.png"
import up from "../assets/up-line.png"

const Footer = () => {
    const SocialLink = ({ icon, href }) => (
        <a href={href} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={icon} />
        </a>
      );
  return (
    <section id="Footer">
      <footer>
        <div className="footer-line-container">
          <img className="down-line" src={down} alt="" />
          <img className="up-line" src={up} alt="" />
        </div>

        <div className="container">
          <h1 className="title">
            <span>ESI-SBA</span>
          </h1>
          <div className="contact-info">
            <div>
              <p>E-mail:</p>
              <p>contact@esi-sba.dz</p>
            </div>
            <div>
              <p>Tél / Fax:</p>
              <p>
                Tél : <a href="tel:+21348749452">+213 48 74 94 52</a>
                <br />
                Fax: <a href="tel:+21348749450">+213 48 74 94 50</a>
              </p>
            </div>
            <div>
              <p>Adresse:</p>
              <p>
                BP 73, Bureau de poste EL WIAM
                <br />
                Sidi Bel Abbés 22016, Algérie
              </p>
            </div>
          </div>
          <div className="social-links">
            <p>Suivez-nous:</p>
            <SocialLink icon={faFacebookF} href="https://www.facebook.com/" />
            <SocialLink icon={faTwitter} href="https://twitter.com/" />
            <SocialLink icon={faLinkedinIn} href="https://www.linkedin.com/" />
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Footer;