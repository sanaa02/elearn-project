
import { Box, Typography, Button, Modal } from '@mui/material';
import model from '../../assets/Model 2.png';
import './WelcomePage.css' 

function LoginModal({ open, handleClose }) {


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
          <input type="text" placeholder="Username" required />
          <input type="password" placeholder="Password" required />
        </form>
        <Box className="button-box">
          <Button className="button">confirmer</Button>
          <Button className="button" onClick={handleClose}>Annuler</Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default LoginModal;
