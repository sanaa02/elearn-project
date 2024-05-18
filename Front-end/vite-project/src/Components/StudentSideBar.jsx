import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
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
  Avatar,
  InputAdornment,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import BookIcon from "@mui/icons-material/Book";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ForumIcon from "@mui/icons-material/Forum";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from "@mui/material/Badge";


import logos from "../assets/Logos.png";
import "./TeacherSidebar.css";

const drawerWidth = 210;

const StudentSideBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState(
    localStorage.getItem("avatar") || "img4.png"
  );
  const [location, setLocation] = useState("");

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
    backgroundImage: `url('/src/assets/logout.png')`,
    backgroundSize: "cover",
  };

  const drawer = (
    <div>
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
      <List
        className="nav-menu-items"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          height: "100%",
          marginTop: "20px",
          justifyContent: "center",
        }}
      >
  

        <ListItem disablePadding className="list-item">
  <NavLink
    to="Modules_Etudiant"
    style={{
      textDecoration: "none",
      color: "inherit",
      width: '100%',
    }}
    className="nav-link"
    activeClassName="active"
    exact
  >
    <ListItemButton sx={{ width: "100%" }}>
    <ListItemIcon sx={{ color: "inherit" }}>
  <BookIcon />
</ListItemIcon>
      <ListItemText primary="Modules" sx={{ color: "#000066" }} />
    </ListItemButton>
  </NavLink>
</ListItem>


<ListItem disablePadding className="list-item">
  <NavLink
    to="Quizz_Etudiant"
    style={{
      textDecoration: "none",
      color: "inherit",
      width: '100%',
    }}
    className="nav-link"
    activeClassName="active"
    exact
  >
    <ListItemButton sx={{ width: "100%" }}>
      <ListItemIcon sx={{ color: "inherit" }}>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary=" Quizz" sx={{ color: "#000066" }} />
    </ListItemButton>
  </NavLink>
</ListItem>

        <ListItem disablePadding className="list-item">
  <NavLink
    to="Forums"
    style={{
      textDecoration: "none",
      color: "inherit",
      width: '100%',
    }}
    className="nav-link"
    activeClassName="active"
  >
    <ListItemButton sx={{ width: "100%" }}>
      <ListItemIcon>
        <ForumIcon style={{ color: "#000066" }} />
      </ListItemIcon>
      <ListItemText primary="Forums" sx={{ color: "#000066" }} />
    </ListItemButton>
  </NavLink>
</ListItem>
      </List>
      <List className="nav-menu-items">
        <ListItem disablePadding className="list-item" sx={{ width: "100%" }}>
          <ListItemButton onClick={handleLogoutModalOpen} sx={{ mt: "50px" }}>
            <ListItemIcon>
              <ExitToAppIcon sx={{ color: "red" }} />
            </ListItemIcon>
            <ListItemText primary="Se déconnecter" sx={{ color: "red" }} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const saveProfile = () => {
    // Simulate an API call to save the profile data
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Bio:", bio);
    console.log("Avatar:", avatar);
    console.log("Location:", location);

    handleProfileModalClose();
  };

  useEffect(() => {
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("avatar", avatar);
    localStorage.setItem("bio", bio);
    localStorage.setItem("location", location);
  }, [name, email, avatar, bio, location]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "white",
          boxShadow: "none",
          height: "80px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon style={{ color: "#000066" }} />
          </IconButton>
         
          <Box
            sx={{ display: "flex", alignItems: "center", flex: 1, mt: "10px" }}
          >
            <TextField
              placeholder="Rechercher"
              variant="outlined"
              size="small"
              style={{ width: "300px" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <IconButton
    color="ddd"
    aria-label="notifications"
    sx={{ mr: '20px' }}
  >
    <Badge badgeContent={4} color="error">
      <NotificationsIcon />
    </Badge>
  </IconButton>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              onClick={handleProfileModalOpen}
              sx={{
                textTransform: "none",
                color: "#000066",
                mr: 2,
              }}
            >
              <Avatar
                alt="Profile"
                src={avatar}
                sx={{ width: 48, height: 48, mr: 1 }}
              />
            </Button>
            
            
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100vh",
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="permanent"
          sx={{
            "& .MuiDrawer-paper": {
              position: "fixed",
              boxSizing: "border-box",
              width: drawerWidth,
              background: "white",
              backgroundSize: "cover",
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
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              padding: "24px",
              background: "white",
              borderRadius: "4px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              width: "100%",
              maxWidth: "400px",
            }}
          >
            <Typography id="profile-modal-title" variant="h5" component="h2">
              Profil
            </Typography>
            <Avatar
              alt="Profile"
              src={avatar}
              sx={{
                width: 120,
                height: 120,
                my: 2,
                border: "2px solid #000066",
              }}
            />
            <Button variant="outlined" component="label" sx={{ mt: 2 }}>
              Choisir une photo
              <input
                type="file"
                style={{ display: "none" }}
                onChange={(e) =>
                  setAvatar(URL.createObjectURL(e.target.files[0]))
                }
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
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: "white", marginBottom: "20px", marginLeft: "70px" }}
            >
              Vous voulez vraiment vous déconnecter de ce compte ?
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginLeft: "70px",
              }}
            >
              <Button
                onClick={handleLogoutModalClose}
                color="primary"
                variant="outlined"
                sx={{
                  width: "45%",
                  mr: 2,
                  background: "#F5F5F5",
                  color: "#000066",
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
                  background: "#F5F5F5",
                  color: "#000066",
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
};

export default StudentSideBar;