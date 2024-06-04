

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import './Components/About'
import AdminPage from './Components/pages/admin/AdminPage'; 
import TeacherPage from './Components/pages/Enseignant/Enseignant';
import StudentPage from '../src/Components/pages/Student/StudentPage'; 
import ApprenantPage from './Components/pages/admin/ApprenantPage';
import EnseignantPage from './Components/pages/admin/EnseignantPage';
import ModulePage from './Components/pages/admin/ModulePage';
import EspaceCommunicationPage from './Components/pages/admin/EspaceCommunicationPage';
import Adminhome from './Components/pages/admin/Adminhome';
import WelcomePage from './Components/pages/WelcomePage';
import Chapitres from './Components/pages/Enseignant/Chapitres';
import Quiz from './Components/pages/Enseignant/Quiz'
import Modules from './Components/pages/Enseignant/Modules';
import Ressources from './Components/pages/Enseignant/Ressources';
import Modules_Etudiant from './Components/pages/Student/Modules_Etudiant';
import Chapitres_Etudiant from './Components/pages/Student/Chapitres_Etudiant'
import Ressources_Etudiant from './Components/pages/Student/Ressources_Etudiant';
import Quizz_Etudiant from './Components/pages/Student/Quizz_Etudiant';
import DevoirDetails from './Components/pages/Student/DevoirDetails';
import Forum from './Components/pages/Enseignant/Forum'
import ListForum from './Components/pages/Enseignant/ListForum'
import ListForumStudent from './Components/pages/Student/ListForumStudent'
import ForumS from './Components/pages/Student/ForumStudent'
import QuizS from './Components/pages/Student/QuizS'
import Evaluation from './Components/pages/Enseignant/Evaluation';
import ConsulterDevoir from './Components/pages/Enseignant/ConsulterDevoir';
import ConsulterQuiz from './Components/pages/Enseignant/ConsulterQuiz';
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
          <Route path="Evaluation" element={<Evaluation />} />
          <Route path="Evaluation/devoirs/:devoirId" element={<ConsulterDevoir />} /> 
          <Route path="Evaluation/quizzes/:quizId" element={<ConsulterQuiz />} /> 
          <Route path="Modules" element={<Modules />} />
          <Route path="Modules/:moduleId/Chapitres" element={<Chapitres />} />
          <Route path="Modules/:moduleId/Chapitres/:chapterId" element={<Ressources />} />
          <Route path="Modules/:moduleId/Quizzes/:QuizId" element={<Quiz />} />
          <Route path="Forums" element={<ListForum />} />
          <Route path="Forums/:forumId" element={<Forum />} />
        </Route>
        <Route path="/StudentPage" element={<StudentPage />}>
  <Route path="Modules_Etudiant" element={<Modules_Etudiant />} />
  <Route path="Modules_Etudiant/:moduleId/Chapitres_Etudiant" element={<Chapitres_Etudiant />} />
  <Route path="Modules_Etudiant/:moduleId/Chapitres_Etudiant/:chapterId" element={<Ressources_Etudiant />} />
  <Route path="Quizz_Etudiant" element={<Quizz_Etudiant />} />
  <Route path="Quizz_Etudiant/:QuizId" element={<QuizS />} />
  <Route path="/StudentPage/Modules_Etudiant/:moduleId/Chapitres_Etudiant/:chapterId/DevoirDetails/:devoirId" element={<DevoirDetails />} />
  <Route path="Forums" element={<ListForumStudent/>} />
  <Route path="Forums/:forumId" element={<ForumS />} />
</Route>

        
      </Routes>
    </Router>
  );
}

export default App;
