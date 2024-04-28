// @ts-nocheck
import { useState, useEffect } from 'react';
import {
  CssBaseline,
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Modal,
  Button,
  Fade,
  Backdrop,
  TextField,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SchoolIcon from '@mui/icons-material/School';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import BookIcon from '@mui/icons-material/Book';
import ChatIcon from '@mui/icons-material/Chat';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
import side from '../assets/side.png';
import logo1 from '../assets/logo1.png';

const drawerWidth = 240;

const SideBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const [name, setName] = useState(localStorage.getItem('name') || 'Mohammed AD');
  const [email, setEmail] = useState(localStorage.getItem('email') || 'mohammed.ad@example.com');
  const [avatar, setAvatar] = useState(localStorage.getItem('avatar') || 'img4.png');
  const [bio, setBio] = useState(localStorage.getItem('bio') || '');
  const [location, setLocation] = useState(localStorage.getItem('location') || 'Algiers, Algeria');
  const [role, setRole] = useState(localStorage.getItem('role') || 'Apprenant');

  useEffect(() => {
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('avatar', avatar);
    localStorage.setItem('bio', bio);
    localStorage.setItem('location', location);
    localStorage.setItem('role', role);
  }, [name, email, avatar, bio, location, role]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileModalOpen = () => {
    setOpenProfileModal(true);
  };

  const handleProfileModalClose = () => {
    setOpenProfileModal(false);
  };

  const handleLogoutModalOpen = () => {
    setOpenLogoutModal(true);
  };

  const handleLogoutModalClose = () => {
    setOpenLogoutModal(false);
  };

  const handleLogout = () => {
    // Ajoutez ici la logique pour se déconnecter
    // par exemple, en effaçant les données de connexion
    // localStorage.clear();
    // Redirigez vers la page de connexion ou la page d'accueil
    // history.push('/landingpage');
    console.log("Déconnexion");
  };

  const saveProfile = () => {
    // Simulate an API call to save the profile data
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Bio:', bio);
    console.log('Avatar:', avatar);
    console.log('Location:', location);
    console.log('Role:', role);

    // Close the modal
    handleProfileModalClose();
  };

  const iconMapping = {
    'Apprenant': <SchoolIcon style={{ color: 'white' }} />,
    'Enseignant': <PersonOutlineIcon style={{ color: 'white' }} />,
    'Module': <BookIcon style={{ color: 'white' }} />,
    'Espace de communication': <ChatIcon style={{ color: 'white' }} />,
    'Dashboard': <DashboardIcon style={{ color: 'white' }} />,
  };

  const linkMapping = {
    'Apprenant': 'ApprenantPage',
    'Enseignant': 'EnseignantPage',
    'Module': 'ModulePage',
    'Espace de communication': 'EspaceCommunicationPage',
    'Dashboard': 'Adminhome',
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: '600px',
    
    
    p: 4,
    borderRadius: 2,
    display: 'flex',
   
    alignItems: 'center',
    textAlign: 'center',
    backgroundImage: `url('/src/assets/logout.png')`, // Définissez votre image de fond ici
    backgroundSize: 'cover', // Ajustez la taille de l'image pour couvrir toute la modal
  };

  const drawer = (
    <div>
      <Toolbar />
      <List className="nav-menu-items" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', marginTop: '60px' }}>
        <ListItem disablePadding className="list-item">
          <Link to="Adminhome" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton>
              <ListItemIcon>
                {iconMapping['Dashboard']}
              </ListItemIcon>
              <ListItemText primary="Dashboard" sx={{ color: 'white' }} />
            </ListItemButton>
          </Link>
        </ListItem>
        {['Apprenant', 'Enseignant', 'Module', 'Espace de communication'].map((text) => (
          <ListItem key={text} disablePadding className="list-item">
            <Link to={linkMapping[text]} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemButton>
                <ListItemIcon>
                  {iconMapping[text]}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ color: 'white' }} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <List className="nav-menu-items">
        <ListItem disablePadding className="list-item">
          <ListItemButton onClick={handleLogoutModalOpen}>
            <ListItemIcon>
              <ExitToAppIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Se déconnecter" sx={{ color: 'white' }} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: 'white',
          boxShadow: 'none',
          height: '100px',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon style={{ color: '#000066' }} />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <img src={logo1} alt="logo1" style={{ width: 150, marginLeft: '-30px' }} />
            <Typography variant="h6" sx={{ color: '#000066', marginLeft: '-50px' }}>
              ESI-SPACE
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              onClick={handleProfileModalOpen}
              sx={{
                textTransform: 'none',
                color: '#000066',
                mr: 2,
              }}
            >
              <Avatar alt="Profile" src={avatar} sx={{ width: 48, height: 48, mr: 1 }} />
              {name}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100vh',
        }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundImage: `url(${side})`,
              backgroundSize: 'cover',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundImage: `url(${side})`,
              backgroundSize: 'cover',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Modal
        open={openProfileModal}
        onClose={handleProfileModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openProfileModal}>
          <Box sx={modalStyle}>
            <Typography id="profile-modal-title" variant="h5" component="h2">
              Profil
            </Typography>
            <Avatar alt="Profile" src={avatar} sx={{ width: 120, height: 120, my: 2, border: '2px solid #000066' }} />
            <Button
              variant="outlined"
              component="label"
              sx={{ mt: 2 }}
            >
              Choisir une photo
              <input
                type="file"
                style={{ display: "none" }}
                onChange={(e) => setAvatar(URL.createObjectURL(e.target.files[0]))}
              />
            </Button>
            <TextField
              margin="dense"
              id="name"
              label="Nom complet"
              type="text"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="dense"
              id="email"
              label="Adresse e-mail"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="dense"
              id="location"
              label="Location"
              type="text"
              fullWidth
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <TextField
              margin="dense"
              id="role"
              label="Role"
              type="text"
              fullWidth
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
            <TextField
              margin="dense"
              id="bio"
              label="Bio"
              type="text"
              fullWidth
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <Button
              sx={{ mt: 2 }}
              variant="contained"
              color="primary"
              onClick={saveProfile}
            >
              Enregistrer
            </Button>
          </Box>
        </Fade>
      </Modal>
      <Modal
        open={openLogoutModal}
        onClose={handleLogoutModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openLogoutModal}>
        

        <Box sx={{ ...modalStyle, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
  <Typography variant="h6" gutterBottom sx={{ color: 'white', marginBottom: '20px',marginLeft:'70px' }}>
    Vous voulez vraiment vous déconnecter de ce compte ?
  </Typography>
  <Box sx={{ display: 'flex', justifyContent: 'space-between',marginLeft:'70px' }}>
    <Button onClick={handleLogoutModalClose} color="primary" variant="outlined" sx={{width:'45%', mr: 2,background:'#F5F5F5' , color:'#000066',fontWeight:'bold','&:hover': {border:'1px solid white',color:'white',background:'#000066'} }}>
      Annuler
    </Button>
    <Button onClick={handleLogout} color="error" variant="contained" sx={{width:'45%',background:'#F5F5F5' , color:'#000066',fontWeight:'bold','&:hover': {border:'1px solid white',color:'white',background:'#000066'}}}>
      Confirmer
    </Button>
  </Box>
</Box>
        </Fade>
      </Modal>
    </Box>
  );
}

export default SideBar;
