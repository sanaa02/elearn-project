

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import './Components/About'
import AdminPage from './Components/pages/admin/AdminPage'; 
import TeacherPage from './Components/pages/Enseignant/Enseignant';
import StudentPage from './Components/pages/StudentPage'; 
import ApprenantPage from './Components/pages/admin/ApprenantPage';
import EnseignantPage from './Components/pages/admin/EnseignantPage';
import ModulePage from './Components/pages/admin/ModulePage';
import EspaceCommunicationPage from './Components/pages/admin/EspaceCommunicationPage';
import Adminhome from './Components/pages/admin/Adminhome';
import WelcomePage from './Components/pages/WelcomePage';
import Chapitres from './Components/pages/Enseignant/Chapitres';
import Modules from './Components/pages/Enseignant/Modules';
import Ressources from './Components/pages/Enseignant/Ressources';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/admin" element={<AdminPage />}>
          <Route path="Adminhome" element={<Adminhome />} />
          <Route path="ApprenantPage" element={<ApprenantPage />} />
          <Route path="EnseignantPage" element={<EnseignantPage />} />
          <Route path="ModulePage" element={<ModulePage />} />
          <Route path="EspaceCommunicationPage" element={<EspaceCommunicationPage />} />
        </Route>
        <Route path="/Enseignant" element={<TeacherPage />}>
          <Route path="Modules" element={<Modules />} />
          <Route path="Modules/:moduleId/Chapitres" element={<Chapitres />} />
          <Route path="Modules/:moduleId/Chapitres/:chapterId" element={<Ressources />} />
        </Route>
        <Route path="/student" element={<StudentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
