
import { Box, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import './Modules.css'

function Modules() {
  const modules = [
    { name: 'Reseaux 01', year: '1CS', semester: 'Semestre 01', id: 1, coefficient: 3, credit: 6, duration: 12 },
    { name: 'Reseaux 02', year: '1CS', semester: 'Semestre 01', id: 2, coefficient: 4, credit: 7, duration: 14 },
    { name: 'Reseaux Avancé 01', year: '2CS', semester: 'Semestre 02', id: 3, coefficient: 5, credit: 8, duration: 16 },
    { name: 'Reseaux Avancé 02', year: '2CS', semester: 'Semestre 02', id: 4, coefficient: 6, credit: 9, duration: 18 },
    // Ajoutez d'autres modules ici
  ];

  // Obtenir une liste unique des semestres
  const semesters = [...new Set(modules.map((module) => module.semester))];

  return (
    <Box id='module-page'>
      <h1 className='title-Modules' >Modules</h1>
      {semesters.map((semester, index) => (
        <div key={index}>
          <h2>{semester}</h2>
          <Divider />
          <div  className='modules-box'>
            {modules
              .filter((module) => module.semester === semester)
              .map((module) => (
                <Link className='link-modules'
                  key={module.id}
                  to={`/Enseignant/Modules/${module.id}/Chapitres`}
                 
                >
                  <div className='title-of-module'>
                    <p>{module.name}</p>
                  </div>
                  <div  className='Description'>
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

export default Modules;
