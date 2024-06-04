import { useState } from 'react';
import { Box, Divider, Button, Menu, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link, useParams } from 'react-router-dom';
import './Chapitres.css';
import AddChapterModal from './AjouterChapitre';
import Quizzes from './Quizzes';

function Chapitres() {
  const { moduleId } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chapters, setChapters] = useState([
    { id: 1, title: 'Chapitre 1', description: 'Description du chapitre 1' },
    { id: 2, title: 'Chapitre 2', description: 'Description du chapitre 2' },
    { id: 3, title: 'Chapitre 3', description: 'Description du chapitre 3' },
    // Ajoutez d'autres chapitres ici
  ]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedChapterId, setSelectedChapterId] = useState(null);

  const handleAddChapter = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAdd = (title, description) => {
    const newChapter = {
      id: chapters.length + 1,
      title: title,
      description: description,
    };
    setChapters([...chapters, newChapter]);
    setIsModalOpen(false);
  };

  const handleMenuOpen = (event, chapterId) => {
    setAnchorEl(event.currentTarget);
    setSelectedChapterId(chapterId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedChapterId(null);
  };

  const handleEditChapter = (chapterId) => {
    // Logique pour modifier le chapitre
    console.log("Modifier le chapitre avec l'ID :", chapterId);
    handleMenuClose();
  };

  const handleDeleteChapter = (chapterId) => {
    // Logique pour supprimer le chapitre
    console.log("Supprimer le chapitre avec l'ID :", chapterId);
    setChapters(chapters.filter(chapter => chapter.id !== chapterId));
    handleMenuClose();
  };

  const moduleDetails = {
    name: 'Reseau 01',
    id: parseInt(moduleId, 10),
  };

  return (
    <Box>
      <h1 className='title-Modules'>{moduleDetails.name}</h1>
      <div className='title-chapters'>
        <h2 style={{ flex: '1' }}>Chapitres</h2>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddChapter}
          style={{ background: '#000066' }}
        >
          Ajouter un Chapitre
        </Button>
      </div>
      <Divider />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {chapters.map((chapter) => (
          <div key={chapter.id} className='Box-chapters'>
           
            <div className='chapter-header'>
            <Link to={`/Enseignant/Modules/${moduleId}/Chapitres/${chapter.id}`} className='link-chapitre'>
              <h3>{chapter.title}</h3>
              </Link>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={(event) => handleMenuOpen(event, chapter.id)}
                style={{color:'#000066'}}
              >
                <MoreVertIcon />
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl) && selectedChapterId === chapter.id}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => handleEditChapter(chapter.id)}>Modifier</MenuItem>
                <MenuItem onClick={() => handleDeleteChapter(chapter.id)}>Supprimer</MenuItem>
              </Menu>
            </div>
            {/* Lien vers la page de ressources du chapitre */}
              <div className='Description'>
                <p>{chapter.description}</p>
              </div>
            
          </div>
        ))}
      </div>
     
      <AddChapterModal
        isModalOpen={isModalOpen}
        handleClose={handleCloseModal}
        handleAdd={handleAdd}
      />
      <Quizzes />
    </Box>
  );
}

export default Chapitres;
