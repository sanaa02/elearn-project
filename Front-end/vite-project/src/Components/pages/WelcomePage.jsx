import { Box, Typography ,Button,Modal } from "@mui/material";
import logos from '../../assets/Logos.png';
import './WelcomePage.css';
import { useState } from "react";
import Frame1 from '../../assets/Frame1.png'
import model from '../../assets/Model 2.png'

function WelcomePage() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  return (
    <div className="container">
      <div className="header">
        <Box className='logo'>
          <img src={logos} alt="logo" />
          <Box>
          <Typography variant="h6" sx={{ color: '#000066', fontWeight: 600, width: '100px', fontSize: '20px' }}>Elearning</Typography>
          <Typography variant="h6" sx={{ color: '#000066', fontWeight: 600, width: '100px', fontSize: '20px' }}> Plateform</Typography>
          </Box>
        </Box>
        <nav className="navbar" style={{ marginLeft: 'auto' }}>
        <a href="http://www.esi-sba.dz" target="_blank" rel="noopener noreferrer">About ESI-SBA</a>
          <Button  className="btn"   onClick={handleOpen} >Se connecter</Button>
        </nav>
      </div>
      <div className="home">
        <div className="home-content">
          <h3>Votre reussite academique commence ici!</h3>
          <p>Explorez notre plateforme e-learning dédiée à l&apos;ESI-SBA : cours interactifs, ressources riches, communauté dynamique.</p>
          <div className="btn-box">
          <Button className="bttn" sx={{color:'white'}} onClick={handleOpen}>Se connecter</Button>
          </div>
        </div>
        <img className="illustration" src={Frame1} alt="Frame" />
      </div>
      <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box className="modal">
    
    <img src={model} alt="" className="logo-esi"/>
    <Typography className="Modal-title"> Connexion</Typography>
    <form className="login">
  <input type="text" placeholder="Username" required/>
  <input type="password" placeholder="Password" required/>
</form> 
<Box className="button-box">
    <Button className="button">confirmer</Button>
    <Button  className="button" onClick={handleClose}>Annuler</Button>
</Box>
  </Box>
</Modal>

    </div>
  );
}

export default WelcomePage;
