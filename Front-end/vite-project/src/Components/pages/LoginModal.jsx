
import { Box, Typography, Button, Modal } from '@mui/material';
import model from '../../assets/Model 2.png';
import './WelcomePage.css' // Assurez-vous d'importer les styles CSS nécessaires

function LoginModal({ open, handleClose }) {
  // Ici, vous pouvez conserver tout l'état et la logique de la modal

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
