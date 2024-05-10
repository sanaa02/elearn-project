import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Divider, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AjouterRessourceModal from './AjouterRessourceModal'; // Import du modal
import './Ressources.css'; // Assurez-vous d'avoir un fichier CSS pour le style
import Devoir from './Devoir';

function Ressources() {
  const { chapterId } = useParams(); 
  const [resources, setResources] = useState([]); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
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

 
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleAddResource = (title, description, file) => {
   
    const newResource = { id: resources.length + 1, title, description, file };
    setResources([...resources, newResource]);
  
    handleCloseModal();
  };

  return (
    
    <Box>
      <h2 className='title'>Chapitre {chapterId}</h2>
      <div className='title-resources'>
        <h3 style={{ flex: '1' }}>Ressources</h3>
      
      </div>
      <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenModal} // Ouvrir le modal lors du clic sur le bouton
          style={{ background: '#000066',marginBottom:7}}
        >
          Ajouter une Ressource
        </Button>
      <Divider />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {resources.map((resource) => (
          <div key={resource.id} className='Box-resources'>
            <div className='title-of-Resource'>
              <h3>{resource.title}</h3>
            </div>
            <div className='Description'>
              <p>{resource.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Afficher le modal pour ajouter une ressource */}
      <AjouterRessourceModal
        isModalOpen={isModalOpen}
        handleClose={handleCloseModal}
        handleAdd={handleAddResource}
      />

{resourcesLoaded && <Devoir />}
      </Box>
    
  );
}

export default Ressources;
