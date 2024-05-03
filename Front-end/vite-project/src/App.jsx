// import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import Landing from "./Components/Landing";
import About from './Components/About';
import Contact from './Components/Contact';
import AdminPage from './Components/pages/admin/AdminPage'; 
import TeacherPage from './Components/pages/Enseignant/Enseignant'
import StudentPage from './Components/pages/StudentPage'; 
import ApprenantPage from './Components/pages/admin/ApprenantPage';
import EnseignantPage from './Components/pages/admin/EnseignantPage';
import ModulePage from './Components/pages/admin/ModulePage';
import EspaceCommunicationPage from './Components/pages/admin/EspaceCommunicationPage';
import Adminhome from './Components/pages/admin/Adminhome'
import MesCours from './Components/pages/Enseignant/MesCours';
import WelcomePage from './Components/pages/WelcomePage';
function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false); 
  // const [userRole, setUserRole] = useState(null); 

  // const handleUserRoleChange = (role) => {
  //   setUserRole(role);
  //   setIsLoggedIn(true); 
  // };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminPage />}> 
          
          <Route path="Adminhome" element={<Adminhome />} />
          <Route path="ApprenantPage" element={<ApprenantPage />} />
          <Route path="EnseignantPage" element={<EnseignantPage />} />
          <Route path="ModulePage" element={<ModulePage />} />
          <Route path="EspaceCommunicationPage" element={<EspaceCommunicationPage />} />
        </Route>
        
        <Route path="/Enseignant" element={<TeacherPage />} >
          <Route path="MesCours" element={<MesCours /> }/>
          </Route>
        <Route path="/student" element={<StudentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
