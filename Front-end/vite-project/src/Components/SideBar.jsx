
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
import { NavLink} from 'react-router-dom';
import { Avatar } from '@mui/material';
import "./TeacherSidebar.css";
import logos from '../assets/Logos.png'
import esilogo from '../assets/esilogo.png'

const drawerWidth = 220;

const SideBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const [name, setName] = useState(localStorage.getItem('name') || 'Mohammed AD');
  const [email, setEmail] = useState(localStorage.getItem('email') || 'mohammed.ad@example.com');
  const [avatar, setAvatar] = useState(localStorage.getItem('avatar') || 'img4.png');
  const [bio, setBio] = useState(localStorage.getItem('bio') || '');
  const [location, setLocation] = useState(localStorage.getItem('location') || 'Algiers, Algeria');
  

  useEffect(() => {
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('avatar', avatar);
    localStorage.setItem('bio', bio);
    localStorage.setItem('location', location);
    
  }, [name, email, avatar, bio, location]);

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

  const saveProfile = () => {
    // Simulate an API call to save the profile data
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Bio:', bio);
    console.log('Avatar:', avatar);
    console.log('Location:', location);
    

    // Close the modal
    handleProfileModalClose();
  };

  const iconMapping = {
    'Apprenant': <SchoolIcon sx={{ color: '#000066' }} />,
    'Enseignant': <PersonOutlineIcon sx={{ color: '#000066' }} />,
    'Module': <BookIcon sx={{ color: '#000066' }} />,
    'Forums': <ChatIcon sx={{ color: '#000066' }} />,
    'Dashboard': <DashboardIcon sx={{ color: '#000066' }} />,
  };
  const linkMapping = {
    'Apprenant': 'ApprenantPage',
    'Enseignant': 'EnseignantPage',
    'Module': 'ModulePage',
    'Forums': 'EspaceCommunicationPage',
    'Dashboard': 'Adminhome',
  };
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    height: "600px",

    p: 4,
    borderRadius: 2,
    display: "flex",

    alignItems: "center",
    textAlign: "center",
    background: "white",
   
  };

 

  const drawer = (
    <div style={{ background: 'white' }}>
    <Box
        className="Box-logo"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mr: "30px",
          mt:'20px'
        }}
      >
        <img
          src={logos}
          alt="logo"
          style={{ width: "40px", marginRight: "20px" }}
        />
        <Box>
          <Typography
            variant="h6"
            sx={{
              color: "#000066",
              fontWeight: 500,
              width: "100px",
              fontSize: "18px",
            }}
          >
            Elearning
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#000066",
              fontWeight: 500,
              width: "100px",
              fontSize: "18px",
            }}
          >
            {" "}
            Plateform
          </Typography>
        </Box>
      </Box>
      
      <List className="nav-menu-items" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', marginTop: '40px' }}>
      <ListItem disablePadding className="list-item">
      <NavLink to="Adminhome" style={{ textDecoration: 'none', width: '100%' }} activeClassName="active" exact>
    <ListItem disablePadding className="list-item">
      <ListItemButton sx={{ width: "100%" }}>
        <ListItemIcon>
          {iconMapping['Dashboard']}
        </ListItemIcon>
        <ListItemText primary="Tableau de bord" sx={{ color: '#000066' }} />
      </ListItemButton>
    </ListItem>
  </NavLink>
  </ListItem>
  {['Apprenant', 'Enseignant', 'Module', 'Forums'].map((text) => (
    <ListItem key={text} disablePadding className="list-item">
      <NavLink to={linkMapping[text]} style={{ textDecoration: 'none', color: '#000066', width: '100%' }} activeClassName="active" exact>
        <ListItemButton sx={{ width: "100%" }}>
          <ListItemIcon>
            {iconMapping[text]}
          </ListItemIcon>
          <ListItemText primary={text} sx={{ color: '#000066' }} />
        </ListItemButton>
      </NavLink>
    </ListItem>
  ))}
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
    height: '80px',
   
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
   
    <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#000066',fontWeight:500 }}>
      Bienvenue {name}
    </Typography>
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
              background:"#000066",
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
              background:"white",
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
          <Box
            sx={{
              ...modalStyle,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "350px",
              width: "600px",
            }}
          >
            <img
              src={esilogo}
              style={{
                width: "85px",
                marginTop: "-260px",
                position: "absolute",
                marginLeft:'-440px',
              }}
            ></img>
             <Typography variant="h3" gutterBottom sx={{ color: "#000066", marginTop: "-240px",position:'absolute'}}>
              Se déconnecter
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: "#000066" ,marginTop:'60px'}}>
              Vous voulez vraiment vous déconnecter de ce compte ?
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" ,marginTop:"30px"}}>
              <Button
                onClick={handleLogoutModalClose}
                color="primary"
                variant="outlined"
                sx={{
                  width: "45%",
                  mr: 2,
                  background: "#000066",
                  color: "white",
                  fontWeight: "bold",
                  "&:hover": {
                    border: "1px solid white",
                    color: "white",
                    background: "#000066",
                  },
                }}
              >
                Annuler
              </Button>
              <Button
                onClick={handleLogout}
                color="error"
                variant="contained"
                sx={{
                  width: "45%",
                  background: "#000066",
                  color: "white",
                  fontWeight: "bold",
                  "&:hover": {
                    border: "1px solid white",
                    color: "white",
                    background: "#000066",
                  },
                }}
              >
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
