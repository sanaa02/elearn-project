import { useState } from 'react';
import { Modal, Button, Box } from '@mui/material';
import './Ressources.css';

// eslint-disable-next-line react/prop-types
function AjouterRessourceModal({ isModalOpen, handleClose, handleAdd }) {
  const [newResourceTitle, setNewResourceTitle] = useState('');
  const [newResourceDescription, setNewResourceDescription] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = () => {
    if (!newResourceTitle || !newResourceDescription || !file) {
      alert('Veuillez remplir tous les champs.');
      return;
    }
    handleAdd(newResourceTitle, newResourceDescription, file);
    setNewResourceTitle('');
    setNewResourceDescription('');
    setFile(null);
  };

  return (
    <Modal open={isModalOpen} onClose={handleClose}>
      <Box className='Modal-Add-Resource'>
        <h2>Ajouter une Ressource</h2>
        <form className='box-input'>
          <label>
            Titre:
          </label>
          <input
            type="text"
            value={newResourceTitle}
            onChange={(e) => setNewResourceTitle(e.target.value)}
            required
          />
  
          <label>
            Description:
          </label>
          <input
            type="text"
            value={newResourceDescription}
            onChange={(e) => setNewResourceDescription(e.target.value)}
            required
          />
          
          <label>
            Télécharger un fichier:
          </label>
          
            <input type='file' onChange={(e) => setFile(e.target.files[0])} />
            
         
          
          <Box className='button-box'>
            <Button type='button' className='button' onClick={handleSubmit}>Ajouter</Button>
            <Button className='button' onClick={handleClose}>Annuler</Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

export default AjouterRessourceModal;
