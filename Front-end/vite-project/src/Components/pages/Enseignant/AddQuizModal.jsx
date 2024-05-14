import { useState } from 'react';
import { Modal, Box, Button } from '@mui/material';

// eslint-disable-next-line react/prop-types
function AddQuizModal({ isModalOpen, handleClose, handleAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [titleError, setTitleError] = useState(false); 
  const [descriptionError, setDescriptionError] = useState(false); 

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title || !description) {
      if (!title) setTitleError(true);
      if (!description) setDescriptionError(true);
      return;
    }

   
    if (isSubmitting) return;

    setIsSubmitting(true); 

    handleAdd(title, description);
    setTitle('');
    setDescription('');
    setTitleError(false); 
    setDescriptionError(false);
    setIsSubmitting(false); 
  };

  return (
    <Modal open={isModalOpen} onClose={handleClose}>
      <Box className='Modal-Add-Quizz'>
        <h2>Ajouter un Quiz</h2>
        <form className='box-input' onSubmit={handleSubmit}>
          <label>
            Titre:
          </label>
          <input
            required
            type='text'
            value={title}
            onChange={(e) => {setTitle(e.target.value); setTitleError(false)}} // Réinitialise l'état d'erreur lors de la modification du champ
            className={titleError ? 'error' : ''} // Ajoute une classe d'erreur si nécessaire
          />
        
          <label>
            Description:
          </label>
          <input
            required
            type='text'
            value={description}
            onChange={(e) => {setDescription(e.target.value); setDescriptionError(false)}} // Réinitialise l'état d'erreur lors de la modification du champ
            className={descriptionError ? 'error' : ''} // Ajoute une classe d'erreur si nécessaire
          />
        
          <Box className='button-box'>
            <Button type='submit' className='button'>
              Ajouter
            </Button>
            <Button className='button' onClick={handleClose}>
              Annuler
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

export default AddQuizModal;
