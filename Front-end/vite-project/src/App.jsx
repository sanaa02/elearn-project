import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Landing from "./Components/Landing";
import About from './Components/About';
import Contact from './Components/Contact';
import AdminPage from './Components/pages/AdminPage'; // Importez la page d'administration
import TeacherPage from './Components/pages/TeacherPage'; // Importez la page d'enseignant
import StudentPage from './Components/pages/StudentPage'; // Importez la page d'étudiant
import { LoginProvider } from "./Components/LoginContext";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initialisez l'état de connexion à false
  const [userRole, setUserRole] = useState(null); // Initialisez le rôle de l'utilisateur à null
  console.log("page something happened");
  // Fonction pour changer le rôle de l'utilisateur
  const handleUserRoleChange = (role) => {
    setUserRole(role);
    setIsLoggedIn(true); // Définir l'état de connexion à true lors de la connexion de l'utilisateur
  };

  // Fonction pour déterminer quelle page afficher en fonction du rôle de l'utilisateur
  const getPageForUserRole = () => {
    switch (userRole) {
      case 'admin':
        return <AdminPage />;
      case 'teacher':
        return <TeacherPage />;
      case 'student':
        return <StudentPage />;
      default:
        return null; // Afficher une page vide si le rôle de l'utilisateur n'est pas encore défini
    }
    
  };

  return (
    <Router>
      
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/teacher" element={<TeacherPage />} />
          <Route path="/student" element={<StudentPage />} />
        </Routes>
     
    </Router>
  );
}

export default App;



