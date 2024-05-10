import { useState } from 'react';
import { Modal, Button, Box } from '@mui/material';
import './Chapitres.css';

function AddChapterModal({ isModalOpen, handleClose, handleAdd }) {
  const [newChapterTitle, setNewChapterTitle] = useState('');
  const [newChapterDescription, setNewChapterDescription] = useState('');

  const handleSubmit = () => {
    if (newChapterTitle.trim() && newChapterDescription.trim()) {
      handleAdd(newChapterTitle, newChapterDescription);
      setNewChapterTitle('');
      setNewChapterDescription('');
      handleClose();
    }
  };

  return (
    <Modal open={isModalOpen} onClose={handleClose}>
      <Box className='Modal-Add-Chapter'>
        <h2>Ajouter un Chapitre</h2>
        <form className='box-input'>
          <label>
            Titre:
          </label>
          <input
            type="text"
            value={newChapterTitle}
            onChange={(e) => setNewChapterTitle(e.target.value)}
          />
  
          <label>
            Description:
          </label>
          <input
            type="text"
            value={newChapterDescription}
            onChange={(e) => setNewChapterDescription(e.target.value)}
          />
          <Box className='button-box'>
            <Button className='button' onClick={handleSubmit}>Ajouter</Button>
            <Button className='button' onClick={handleClose}>Annuler</Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

export default AddChapterModal;
