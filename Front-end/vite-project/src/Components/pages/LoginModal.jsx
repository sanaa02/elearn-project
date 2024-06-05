import React, { useState } from "react";
import { Box, Typography, Button, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import model from "../../assets/Model 2.png";
import "./WelcomePage.css";
// import jwt_decode from "jwt-decode";
import { jwtDecode } from "jwt-decode";
// import jwtDecode from "jwt-decode";


function LoginModal({ open, handleClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authTokens, setAuthTokens] = useState("");
  const [user, setUser] = useState("");

  const navigate = useNavigate();

    const loginUser = async (email, password) => {
      console.log(email, password);
      const response = await fetch("http://127.0.0.1:8000/account/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      console.log(email, password);
      const data = await response.json();
      console.log(data);

      if (response.status == 200) {
        console.log("Logged in successfully");
        setAuthTokens(data);
        const user = jwtDecode(data.access);
        setUser(user);
        console.log(user);
        // setUser(jwt_decode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
        console.log("prof",user.is_professor);
        console.log("student",user.is_student);
        if (user.is_superuser) {
          navigate("/admin");
        } else if (user.is_student) {
          navigate("/StudentPage");
        } else if (user.is_professor) {
          navigate("/Enseignant");
        }
        //history.push("/")
      } else {
        console.log(response.status);
        console.log("there was a server issue");
      } }
  

    const handleSubmit = (e) => {
      e.preventDefault();
      // Implement form submission logic here.
      console.log("Email:", email);
      console.log("Message:", password);

      loginUser(email, password);

      setEmail("");
      setPassword("");
    };
  // };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="moddal-modal-title"
      aria-describedby="moddal-modal-description"
    >
      <Box className="moddal">
        <img src={model} alt="" className="logo-esi" />
        <Typography className="Moddal-title"> Connexion</Typography>
        <form className="login">
          <input
            type="text"
            placeholder="Username"
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
          <Button className="button" onClick={handleSubmit}>
            confirmer
          </Button>
          <Button className="button" onClick={handleClose}>
            Annuler
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default LoginModal;
