import  { useState } from "react";
import { Box, Typography, Button, Modal } from "@mui/material";
import model from "../../assets/Model 2.png";
import "./WelcomePage.css"; // Assurez-vous d'importer les styles CSS nécessaires

function LoginModal({ open, handleClose }) {
  // Ici, vous pouvez conserver tout l'état et la logique de la modal

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
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal">
        <img src={model} alt="" className="logo-esi" />
        <Typography className="Modal-title"> Connexion</Typography>
        <form className="login">
          <input 
          type="email"
           placeholder="Email-address" 
           required  
           value={email}
           onChange={(e) => setEmail(e.target.value)}
           />
          <input
           type="password"
            placeholder="Password" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </form>
        <Box className="button-box">
          <Button className="button" onClick={handleSubmit}>confirmer</Button>
          <Button className="button" onClick={handleClose}>
            Annuler
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default LoginModal;
