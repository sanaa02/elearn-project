import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Divider } from '@mui/material';
import './Ressources_Etudiant.css'
import Devoirs_Etudiant from './Devoirs_Etudiant';

function Ressources_Etudiant() {
  const { chapterId } = useParams(); 
  const [resources, setResources] = useState([]); 
  const [resourcesLoaded, setResourcesLoaded] = useState(false);
  

  // Simuler le chargement des ressources à partir d'une API
  useEffect(() => {
  
    const simulatedResources = [
      { id: 1, title: 'Cours 1', description: 'Description du cours 1' },
      { id: 2, title: 'TD 1', description: 'Description du TD 1' },
      { id: 3, title: 'TP 1', description: 'Description du TP 1' },
    ];

    setResources(simulatedResources);
    setResourcesLoaded(true);
  }, [chapterId]);

  return (
    <Box>
      <h2 className='title'>Chapitre {chapterId}</h2>
      <div className='title-resources'>
        <h3 style={{ flex: '1' }}>Ressources</h3>
      </div>
      <Divider />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {resources.map((resource) => (
          <div key={resource.id} className='Box-resources'>
            <div className='title-of-Resource'>
              <h3>{resource.title}</h3>
            </div>
            <div className='Ressource_Description'>
              <p>{resource.description}</p>
            </div>
          </div>
        ))}
      </div>
      {resourcesLoaded && <Devoirs_Etudiant />}
    </Box>
  );
}

export default Ressources_Etudiant;
