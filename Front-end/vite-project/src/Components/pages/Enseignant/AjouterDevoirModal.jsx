import { useState } from 'react';
import { Modal, Button, Box } from '@mui/material';
import './Devoir.css'; // Assurez-vous d'avoir votre propre fichier CSS pour les styles

// eslint-disable-next-line react/prop-types
function AjouterDevoirModal({ isModalOpen, handleClose, handleAdd }) {
  const [newDevoirTitle, setNewDevoirTitle] = useState('');
  const [newDevoirDescription, setNewDevoirDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = () => {
    if (!newDevoirTitle || !newDevoirDescription || !deadline ) {
      alert('Veuillez remplir tous les champs.');
      return;
    }
    handleAdd(newDevoirTitle, newDevoirDescription, deadline, file);
    handleClose(); // Fermer le modal après avoir ajouté le devoir
    // Remarque : idéalement, la fermeture du modal devrait être gérée dans le composant parent
    // où vous utilisez ce modal, pour plus de flexibilité.
    
    // Réinitialiser les valeurs des champs après l'ajout du devoir
    setNewDevoirTitle('');
    setNewDevoirDescription('');
    setDeadline('');
    setFile(null);
  };

  return (
    <Modal open={isModalOpen} onClose={handleClose}>
      <Box className='Modal-Add-Devoir'>
        <h2>Ajouter un Devoir</h2>
        <form className='box-input'>
          <label>
            Titre:
          </label>
          <input
            type="text"
            value={newDevoirTitle}
            onChange={(e) => setNewDevoirTitle(e.target.value)}
            required
          />
  
          <label>
            Description:
          </label>
          <input
            type="text"
            value={newDevoirDescription}
            onChange={(e) => setNewDevoirDescription(e.target.value)}
            required
          />
          
          <label>
            Date limite:
          </label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
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

export default AjouterDevoirModal;
