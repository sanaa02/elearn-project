import  { useState, useEffect } from 'react';
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
  Collapse,
  TextField,
  Avatar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import BookIcon from '@mui/icons-material/Book';
import ChatIcon from '@mui/icons-material/Chat';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import logo1 from '../assets/logo1.png';

const drawerWidth = 240;

const TeacherSideBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const [openAssessmentSubMenu, setOpenAssessmentSubMenu] = useState(false); 
  const [userName] = useState("Nom de l'utilisateur");
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState(localStorage.getItem('avatar') || 'img4.png');
  const [location, setLocation] = useState('');
  

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
    console.log("Déconnexion");
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
    backgroundImage: `url('/src/assets/logout.png')`,
    backgroundSize: 'cover', 
  };

  const drawer = (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: '10px', mb: '20px',ml:'-150px' }}>
        <img src={logo1} alt="logo" style={{ width: '150px', marginRight: '10px' }} />
        <Typography variant="h6" sx={{ color: '#000066',fontWeight:'bold',marginLeft:'-60px' }}>E-Learn</Typography>
      </Box>
      <List className="nav-menu-items" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', height: '100%', marginTop: '60px' }}>

        <ListItem disablePadding className="list-item">
          <Link to="Adminhome" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton>
              <ListItemIcon>
                <DashboardIcon style={{ color: '#000066' }} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" sx={{ color: '#000066' }} />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding className="list-item">
          <Link to="MesCours" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton>
              <ListItemIcon>
                <BookIcon style={{ color: '#000066' }} />
              </ListItemIcon>
              <ListItemText primary="Mes Cours" sx={{ color: '#000066' }} />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding className="list-item">
          <ListItemButton onClick={() => setOpenAssessmentSubMenu(!openAssessmentSubMenu)}>
            <ListItemIcon>
              <AssessmentIcon style={{ color: '#000066' }} />
            </ListItemIcon>
            <ListItemText primary="Assessment" sx={{ color: '#000066' }} />
            {openAssessmentSubMenu ? <ExpandMoreIcon style={{ color: '#000066' }} /> : <ExpandMoreIcon style={{ color: '#000066' }} />}
          </ListItemButton>
          <Collapse in={openAssessmentSubMenu} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <Link to="Devoirs" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ListItemText primary="Devoirs" sx={{ color: '#000066' }} />
                </Link>
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <Link to="Quizzes" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ListItemText primary="Quizzes" sx={{ color: '#000066' }} />
                </Link>
              </ListItemButton>
            </List>
          </Collapse>
        </ListItem>
        <ListItem disablePadding className="list-item">
          <Link to="Messages" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton>
              <ListItemIcon>
                <ChatIcon style={{ color: '#000066' }} />
              </ListItemIcon>
              <ListItemText primary="Messages" sx={{ color: '#000066' }} />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding className="list-item">
          <Link to="Notifications" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton>
              <ListItemIcon>
                <NotificationsIcon style={{ color: '#000066' }} />
              </ListItemIcon>
              <ListItemText primary="Notifications" sx={{ color: '#000066' }} />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
      <List className="nav-menu-items">
        <ListItem disablePadding className="list-item">
          <ListItemButton onClick={handleLogoutModalOpen}>
            <ListItemIcon>
              <ExitToAppIcon sx={{ color: '#000066' }} />
            </ListItemIcon>
            <ListItemText primary="Se déconnecter" sx={{ color: '#000066' }} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const saveProfile = () => {
    // Simulate an API call to save the profile data
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Bio:', bio);
    console.log('Avatar:', avatar);
    console.log('Location:', location);
   
    handleProfileModalClose();
  };

  useEffect(() => {
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('avatar', avatar);
    localStorage.setItem('bio', bio);
    localStorage.setItem('location', location);
   
  }, [name, email, avatar, bio, location]);

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
            <Typography variant="h6" sx={{ color: '#000066' }}>
              Bienvenue, {userName}
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
        <Drawer
          variant="permanent"
          sx={{
            '& .MuiDrawer-paper': {
              position: 'fixed',
              boxSizing: 'border-box',
              width: drawerWidth,
              background:'#e1e1ff',
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
          <Box sx={{
            position:'absolute',
            top:'50%',
            left:'50%',
            transform:'translate(-50%, -50%)',
            padding:'24px',
            background:'white',
            borderRadius:'4px',
            boxShadow:'0 2px 4px rgba(0, 0, 0, 0.2)',
            width:'100%',
            maxWidth:'400px'
          }}>
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
              value="Apprenant"
              onChange={(e) => console.log(e.target.value)}
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
            <Typography variant="h6" gutterBottom sx={{ color: 'white', marginBottom: '20px', marginLeft: '70px' }}>
              Vous voulez vraiment vous déconnecter de ce compte ?
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginLeft: '70px' }}>
              <Button onClick={handleLogoutModalClose} color="primary" variant="outlined" sx={{ width: '45%', mr: 2, background: '#F5F5F5', color: '#000066', fontWeight: 'bold', '&:hover': { border: '1px solid white', color: 'white', background: '#000066' } }}>
                Annuler
              </Button>
              <Button onClick={handleLogout} color="error" variant="contained" sx={{ width: '45%', background: '#F5F5F5', color: '#000066', fontWeight: 'bold', '&:hover': { border: '1px solid white', color: 'white', background: '#000066' } }}>
                Confirmer
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}

export default TeacherSideBar;
