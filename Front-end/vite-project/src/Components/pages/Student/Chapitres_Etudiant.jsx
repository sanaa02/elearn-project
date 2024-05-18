import { useState } from 'react';
import { Box, Divider } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import '../Student/Chapitres_Etudiant.css'

function Chapitres_Etudiant() {
  const { moduleId } = useParams();

  // Données factices des chapitres (à remplacer par vos propres données)
  const [chapters] = useState([
    { id: 1, title: 'Chapitre 1', description: 'Description du chapitre 1' },
    { id: 2, title: 'Chapitre 2', description: 'Description du chapitre 2' },
    { id: 3, title: 'Chapitre 3', description: 'Description du chapitre 3' },
    { id: 4, title: 'Chapitre 4', description: 'Description du chapitre 4' },
    { id: 5, title: 'Chapitre 5', description: 'Description du chapitre 5' },
    { id: 6, title: 'Chapitre 6', description: 'Description du chapitre 6' },
    // Ajoutez d'autres chapitres ici
  ]);

  // Données factices des modules (à remplacer par vos propres données)
  const modules = [
    { name: 'Reseaux 01', year: '1CS', semester: 'Semestre 01', id: 1, coefficient: 3, credit: 6, duration: 12 },
    { name: 'Base De Données', year: '1CS', semester: 'Semestre 01', id: 2, coefficient: 5, credit: 7, duration: 14 },
    { name: 'Système Exploitation 01', year: '1CS', semester: 'Semestre 01', id: 5, coefficient: 5, credit: 7, duration: 14 },
    { name: 'Recherche Opérationelle', year: '1CS', semester: 'Semestre 01', id: 6, coefficient: 5, credit: 7, duration: 14 },
    { name: 'ACSI', year: '2CS', semester: 'Semestre 02', id: 3, coefficient: 5, credit: 8, duration: 16 },
    { name: 'Reseaux 02', year: '2CS', semester: 'Semestre 02', id: 4, coefficient: 4, credit: 9, duration: 18 },
    // Ajoutez d'autres modules ici
  ];
  // Recherche du module correspondant au moduleId
  const selectedModule = modules.find((module) => module.id === parseInt(moduleId));

  return (
    <Box>
      {selectedModule && (
        <>
          <h1 className='title-Modules'>{selectedModule.name}</h1>
         <div>
         <div  className='Description'>
                    <p><span>Coefficient: </span>{selectedModule.coefficient}</p>
                    <p><span>Crédit: </span>{selectedModule.credit}</p>
                    <p><span>Durée:</span> {selectedModule.duration} semaines</p>
                  </div>
         </div>
        </>
      )}
      <div className='title-chapters'>
        <h2 style={{ flex: '1' }}>Chapitres</h2>
      </div>
      <Divider />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {chapters.map((chapter) => (
          <div key={chapter.id} className='Box-chapters'>
            <div className='chapter-header'>
            <Link to={`/StudentPage/Modules_Etudiant/${moduleId}/Chapitres_Etudiant/${chapter.id}`} className='link-chapitre'>
  <h3>{chapter.title}</h3>
</Link>
            </div>
            {/* Lien vers la page de ressources du chapitre */}
            <div className='Description'>
              <p>{chapter.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Box>
  );
}

export default Chapitres_Etudiant;
