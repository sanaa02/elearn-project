import React, { useState } from "react";

import '../styles/login.css';
import line1 from '../../assets/line1.png'

import logo from '../../assets/logo.png';
import five from '../../assets/5ps.png';
import reversed from '../../assets/linereversed.png';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (email, password) => {
        console.log(email, password);
        const response = await fetch("http://127.0.0.1:8000/account/token/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({
                email, password
            })
        })
        console.log(email, password);
        const data = await response.json();
        console.log(data);
        
        if(response.status == 200){
            console.log("Logged in successfully");
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem("authTokens", JSON.stringify(data))
            //history.push("/")
    
            }
            else {    
            console.log(response.status);
            console.log("there was a server issue");}
            
       
        }

     const handleSubmit = (e) => {
      e.preventDefault();
   // Implement form submission logic here.
      console.log("Email:", email);
      console.log("Message:", password);

      loginUser(email, password);

 
      setEmail('');
      setPassword('');
   };

  return (
    <div   className="login-container">
      <img className="line1" src={line1} />
      <img className="line2" src={line1} />
      <img className="logo" src={logo} />
      <img className="five" src={five} />
      <img className="reversed" src={reversed} />
      <img className="reversed1" src={reversed} />

        <form onSubmit={handleSubmit}>
          
          <input
             id="email"
             type="text"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             required
             placeholder="mail-address"
          />
          
          <input
            type="password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             required
             placeholder="password"
          />
          <div className="button-container">
            <div className="back-one"></div>
            <button className="button-submit" type="submit">Envoyer</button>
          </div>
        </form>
     
    </div>
  );
};

export default LoginPage;
