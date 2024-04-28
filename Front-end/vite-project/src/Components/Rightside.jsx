/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */


import Pic from '../assets/Right.png'
import React, { useState } from 'react'
import Pic2 from '../assets/profile-ref.jpg';
import Notification from './Notification';
import "./styles/Adminfirst.css"
function Rightside() {
  const [notifications, setNotifications] = useState([
    {
      description: 'Student submitted an assignment',
      date: '2024-04-13 12:00',
      image: Pic2,
    },
   
    {
      description: 'Student submitted an assignment',
      date: '2024-04-13 12:00',
      image: Pic2,
    },
    {
      description: 'Student submitted an assignment',
      date: '2024-04-13 12:00',
      image: Pic2,
    },
   
    {
      description: 'Teacher updated a course ',
      date: '2024-03-22 15:30',
      image: Pic2,
    },
  ]);
  return (
    <div className="right">
      <div className="noti" style={{ width:' 340px',height:'460px'}}>
   <h3 style={{paddingLeft:'30px',paddingTop:'10px'}}>Notifications</h3>
   <div className="Notification" style={{marginLeft:'40px', color:' #000066'}}
  
   >
     
   {notifications.map((notification) => (
    
        <Notification
         className="notyfi"
          key={notification.date}
          description={notification.description}
          date={notification.date}
          image={notification.image}
        />
      ))}
   </div>
   
   </div><div>
      
   <img src={Pic} className='notifiactions-back'/>
    
        </div></div>
  )
}

export default Rightside