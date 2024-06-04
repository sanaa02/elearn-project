import  { useState } from 'react';
import { Box, Typography, Button} from '@mui/material';
import logos from '../../assets/Logos.png';
import Frame1 from '../../assets/Frame1.png';

import About from '../About';
import Footer from '../Footer';
import './WelcomePage.css';
import LoginModal from './LoginModal'

function WelcomePage() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('About');
    window.scrollTo({
      top: aboutSection.offsetTop,
      behavior: 'smooth',
    });
  };

  return (
    <div className="container">
      <div className="header">
        <Box className="logo">
          <img src={logos} alt="logo" />
          <Box>
            <Typography variant="h6" sx={{ color: '#000066', fontWeight: 600, width: '100px', fontSize: '20px' }}>Elearning</Typography>
            <Typography variant="h6" sx={{ color: '#000066', fontWeight: 600, width: '100px', fontSize: '20px' }}>Plateform</Typography>
          </Box>
        </Box>
        <nav className="navbar" style={{ marginLeft: 'auto' }}>
          <a href="#About" onClick={scrollToAbout}>À propos e-learning</a>
          <a href="http://www.esi-sba.dz" target="_blank" rel="noopener noreferrer">À propos ESI-SBA</a>
          <Button className="btn" onClick={handleOpen}>Se connecter</Button>
        </nav>
      </div>
      <div className="home">
        <div className="home-content">
          <h3>Votre réussite académique commence ici !</h3>
          <p>Explorez notre plateforme e-learning dédiée à l&apos;ESI-SBA : cours interactifs, ressources riches, communauté dynamique.</p>
          <div className="btn-box">
            <Button className="bttn" sx={{ color: 'white' }} onClick={handleOpen}>Se connecter</Button>
          </div>
        </div>
        <img className="illustration" src={Frame1} alt="Frame" />
      </div>
      <LoginModal open={open} handleClose={handleClose} />

      <section id="About">
        <About />
      </section>
      <section id="Footer">
        <Footer />
      </section>
    </div>
  );
}

export default WelcomePage;