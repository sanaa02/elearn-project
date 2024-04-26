// import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Landing from "./Components/Landing";
import About from './Components/About';
import Contact from './Components/Contact';
import AdminPage from './Components/pages/admin/AdminPage'; 
import TeacherPage from './Components/pages/TeacherPage';
import StudentPage from './Components/pages/StudentPage'; 
import ApprenantPage from './Components/pages/admin/ApprenantPage';
import EnseignantPage from './Components/pages/admin/EnseignantPage';
import ModulePage from './Components/pages/admin/ModulePage';
import EspaceCommunicationPage from './Components/pages/admin/EspaceCommunicationPage';
import Adminhome from './Components/pages/admin/Adminhome'
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
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminPage />}> 
          
          <Route path="Adminhome" element={<Adminhome />} />
          <Route path="ApprenantPage" element={<ApprenantPage />} />
          <Route path="EnseignantPage" element={<EnseignantPage />} />
          <Route path="ModulePage" element={<ModulePage />} />
          <Route path="EspaceCommunicationPage" element={<EspaceCommunicationPage />} />
        </Route>
        
        <Route path="/teacher" element={<TeacherPage />} />
        <Route path="/student" element={<StudentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
