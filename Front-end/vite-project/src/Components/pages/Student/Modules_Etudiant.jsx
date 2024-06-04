import { Box, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import './Modules_Etudiant.css'

function Modules_Etudiant() {
  const modules = [
    { name: 'Reseaux 01', year: '1CS', semester: 'Semestre 01', id: 1, coefficient: 3, credit: 6, duration: 12 },
    { name: 'Base De Données', year: '1CS', semester: 'Semestre 01', id: 2, coefficient: 5, credit: 7, duration: 14 },
    { name: 'Système Exploitation 01', year: '1CS', semester: 'Semestre 01', id: 5, coefficient: 5, credit: 7, duration: 14 },
    { name: 'Recherche Opérationelle', year: '1CS', semester: 'Semestre 01', id: 6, coefficient: 5, credit: 7, duration: 14 },
    { name: 'ACSI', year: '2CS', semester: 'Semestre 02', id: 3, coefficient: 5, credit: 8, duration: 16 },
    { name: 'Reseaux 02', year: '2CS', semester: 'Semestre 02', id: 4, coefficient: 4, credit: 9, duration: 18 },
    // Ajoutez d'autres modules ici
  ];

  // Obtenir une liste unique des semestres
  const semesters = [...new Set(modules.map((module) => module.semester))];

  return (
    <Box id='student-module-page'>
      <h1 className='student-title-Modules' >Modules</h1>
      {semesters.map((semester, index) => (
        <div key={index}>
          <h2>{semester}</h2>
          <Divider />
          <div  className='student-modules-box'>
            {modules
              .filter((module) => module.semester === semester)
              .map((module) => (
                <Link className='student-link-modules'
                key={module.id}
                to={`/StudentPage/Modules_Etudiant/${module.id}/Chapitres_Etudiant`}
            >
            
                  <div className='student-title-of-module'>
                    <p>{module.name}</p>
                  </div>
                  <div  className='student-Description'>
                    <p>Coefficient: {module.coefficient}</p>
                    <p>Crédit: {module.credit}</p>
                    <p>Durée: {module.duration} semaines</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      ))}
    </Box>
  );
}

export default Modules_Etudiant;
