import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Divider, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AjouterDevoirModal from './AjouterDevoirModal'; 
import './Devoir.css'; 

function Devoir() {
  const { chapterId } = useParams(); 
  const [devoirs, setDevoirs] = useState([]); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  
  useEffect(() => {
  
    const simulatedDevoirs = [
      { id: 1, title: 'Devoir 1', description: 'Description du devoir 1', deadline: '2024-05-15' },
      { id: 2, title: 'Devoir 2', description: 'Description du devoir 2', deadline: '2024-05-20' },
      { id: 3, title: 'Devoir 3', description: 'Description du devoir 3', deadline: '2024-05-25' },
    ];

    setDevoirs(simulatedDevoirs);
  }, [chapterId]);

  // Fonction pour ouvrir le modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Fonction pour fermer le modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Fonction pour ajouter un nouveau devoir
  const handleAddDevoir = (title, description, deadline) => {
    // Vous devez implémenter la logique pour ajouter un nouveau devoir à votre backend
    // Après l'ajout du devoir, vous pouvez mettre à jour l'état des devoirs
    // Exemple : setDevoirs([...devoirs, { id: devoirs.length + 1, title, description, deadline }]);
    
    // Pour l'instant, nous allons simplement simuler l'ajout d'un nouveau devoir à l'état local
    const newDevoir = { id: devoirs.length + 1, title, description, deadline };
    setDevoirs([...devoirs, newDevoir]);
  
    // Fermer le modal après avoir ajouté le devoir
    handleCloseModal();
  };

  return (
    <Box>
     
      <div className='title-devoirs' >
        <h3 style={{ flex: '1' }}>Devoirs</h3>
        </div>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenModal} 
          style={{ background: '#000066',marginBottom:7}}
        >
          Ajouter un Devoir
        </Button>
     
      <Divider />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {devoirs.map((devoir) => (
          <div key={devoir.id} className='Box-devoirs'>
            <div className='title-of-Devoir'>
              <h3>{devoir.title}</h3>
            </div>
            <div className='Description'>
              <p>{devoir.description}</p>
              <p>Date limite: {devoir.deadline}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Afficher le modal pour ajouter un devoir */}
      <AjouterDevoirModal
        isModalOpen={isModalOpen}
        handleClose={handleCloseModal}
        handleAdd={handleAddDevoir}
      />
    </Box>
  );
}

export default Devoir;
