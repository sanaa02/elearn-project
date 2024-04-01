import React, { useState } from "react";
import "./styles/landing.css";
const Contact = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement form submission logic here.
    console.log("Email:", email);
    console.log("Message:", message);
  };

  return (
    <div>
      <section id="contact">
        <h2>Contactez-nous</h2>
        <p>si vous avez des questions</p>
        <form onSubmit={handleSubmit}>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            rows="5"
            cols="30"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <div className="button-container">
            <button type="submit">Envoyer</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Contact;
