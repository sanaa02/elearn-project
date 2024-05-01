import { useState } from 'react';
import { Button, Box, Modal, Typography, TextField, IconButton, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

function MesCours() {
  const [openModal, setOpenModal] = useState(false);
  const [module, setModule] = useState('');
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [chapitres, setChapitres] = useState([]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleConfirm = () => {
    const newChapitre = { module, titre, description };
    setChapitres([...chapitres, newChapitre]);
    setModule('');
    setTitre('');
    setDescription('');
    handleCloseModal();
  };

  return (
    <Box className="content">
      <Button variant="contained" startIcon={<AddIcon />} style={{ backgroundColor: '#000066', color: 'white', fontWeight: '800px', marginBottom: '20px' }} onClick={handleOpenModal}>
        Ajouter Chapitre
      </Button>

      <Modal open={openModal} onClose={handleCloseModal} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ width: '600px', bgcolor: 'White', p: 4, borderRadius: '8px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, bgcolor: '#000066', padding: 1, paddingLeft: '20px' }}>
            <Typography variant="h6" sx={{ color: 'white' }}>Ajouter un chapitre</Typography>
            <IconButton onClick={handleCloseModal} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <TextField fullWidth label="Module" variant="outlined" value={module} onChange={(e) => setModule(e.target.value)} sx={{ mb: 2 }} />
          <TextField fullWidth label="Titre" variant="outlined" value={titre} onChange={(e) => setTitre(e.target.value)} sx={{ mb: 2 }} />
          <TextField fullWidth label="Description" multiline rows={4} value={description} onChange={(e) => setDescription(e.target.value)} sx={{ mb: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" onClick={handleConfirm} sx={{ backgroundColor: '#000066', color: 'white', fontWeight: 'bold' }}>Confirmer</Button>
          </Box>
        </Box>
      </Modal>

      {chapitres.map((chapitre, index) => (
        <Box key={index} mt={index === 0 ? 0 : 4}>
          <Typography variant="h6">{chapitre.module}</Typography>
          <Typography variant="subtitle1">Année académique</Typography>
          <Divider sx={{ mt: 1, mb: 2 }} />
          <Box display="flex" flexDirection="row" flexWrap="wrap">
            <Box sx={{ flex: '1 1 30%', mr: 2, mb: 2, border: '1px solid #ccc', borderRadius: '4px', padding: '16px' }}>
              <Typography variant="h6">{chapitre.titre}</Typography>
              <Typography>{chapitre.description}</Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default MesCours;
