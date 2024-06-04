import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Box, Divider } from '@mui/material';
import './Devoirs_Etudiant.css';

function Devoirs_Etudiant() {
  const { chapterId, moduleId } = useParams(); // Obtenir également moduleId des paramètres d'URL
  const [devoirs, setDevoirs] = useState([]);

  useEffect(() => {
    // Simuler le chargement des devoirs à partir d'une API
    const simulatedDevoirs = [
      { id: 1, title: 'Devoir 1', description: 'Description du devoir 1', deadline: '2024-05-15' },
      // Ajoutez d'autres devoirs simulés ici si nécessaire
    ];

    setDevoirs(simulatedDevoirs);
  }, [chapterId, moduleId]); // Assurez-vous de déclarer moduleId dans les dépendances

  return (
    <div>
      <div className='title-devoirs' >
        <h3 style={{ flex: '1' }}>Devoirs</h3>
      </div>
      <Divider />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {devoirs.map((devoir) => (
          <Link to={`/StudentPage/Modules_Etudiant/${moduleId}/Chapitres_Etudiant/${chapterId}/DevoirDetails/${devoir.id}`} key={devoir.id} className='devoir-link'>
            <div className='Box-devoirs'>
              <div className='title-of-Devoir'>
                <h3>{devoir.title}</h3>
              </div>
              <div className='Description'>
                <p>{devoir.description}</p>
                <p>Date limite: {devoir.deadline}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      </div>
  );
}

export default Devoirs_Etudiant;
