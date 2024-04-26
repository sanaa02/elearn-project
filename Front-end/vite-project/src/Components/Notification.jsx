/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import "./styles/Adminfirst.css" // Make sure the CSS file path is correct


const Notification = ({ description, date, image }) => (
  <div className="notification">
    <img src={image} alt={description} className="notification-image" />
    <div className="notification-content">
      <p className="notification-description">{description}</p>
      <p className="notification-date">{date}</p>
    </div>
  </div>
);

export default Notification;
