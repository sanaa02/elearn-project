/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Box, Divider, Button, Menu, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import QuizIcon from '@mui/icons-material/Quiz';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './Quizzes.css';
import AddQuizModal from './AddQuizModal';
/////////////////////////////////////////////////////////////////////
import { Link, useParams } from 'react-router-dom';

function Quizzes() {
  ///////////////////////////////////////////
  const { moduleId } = useParams();
  const moduleDetails = {
    name: 'Reseau 01',
    id: parseInt(moduleId, 10),
  };
////////////////////////////////////////////////////////////////
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quizzes, setQuizzes] = useState([
    { id: 1, title: 'Quiz 1', description: 'Description du quiz 1' },
    { id: 2, title: 'Quiz 2', description: 'Description du quiz 2' },
    { id: 3, title: 'Quiz 3', description: 'Description du quiz 3' },
   
  ]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedQuizId, setSelectedQuizId] = useState(null);

  const handleAddQuiz = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAdd = (title, description) => {
    const newQuiz = {
      id: quizzes.length + 1,
      title: title,
      description: description,
    };
    setQuizzes([...quizzes, newQuiz]);
    setIsModalOpen(false);
  };

  const handleMenuOpen = (event, quizId) => {
    setAnchorEl(event.currentTarget);
    setSelectedQuizId(quizId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedQuizId(null);
  };

  const handleEditQuiz = (action) => {
    
    console.log("Modifier le quiz avec l'action :", action);
    handleMenuClose();
  };

  const handleDeleteQuiz = () => {
    // Logique pour supprimer le quiz
    console.log("Supprimer le quiz avec l'ID :", selectedQuizId);
    setQuizzes(quizzes.filter(quiz => quiz.id !== selectedQuizId));
    handleMenuClose();
  };

  return (
    <Box>
      <div className='title-quizzes'>
        <h2 style={{ flex: '1' }}>Quizzes</h2>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddQuiz}
          style={{ background: '#000066' }}
        >
          Ajouter un Quiz
        </Button>
      </div>
      <Divider />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {quizzes.map((quiz) => (
          <div key={quiz.id} className='Box-quizzes'>
            <div className='title-of-Quiz'>
             <Link to={`/Enseignant/Modules/${moduleId}/Quizzes/${quiz.id}`} className='link-chapitre'> 
              <div className='box-title'>
              <QuizIcon style={{ marginRight: '8px', marginTop: '4px' }} />
              <h3>{quiz.title}</h3>
              </div>
            </Link>
              <Button
                aria-controls={`quiz-menu-${quiz.id}`}
                aria-haspopup="true"
                onClick={(event) => handleMenuOpen(event, quiz.id)}
                style={{color:'#000066'}}
              >
                <MoreVertIcon />
              </Button>
              <Menu
                id={`quiz-menu-${quiz.id}`}
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl) && selectedQuizId === quiz.id}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => handleEditQuiz('Modifier')}>Modifier</MenuItem>
                <MenuItem onClick={handleDeleteQuiz}>Supprimer</MenuItem>
              </Menu>
            </div>
            <div className='Description'>
              <p>{quiz.description}</p>
            </div>
          </div>
        ))}
      </div>
      <AddQuizModal
        isModalOpen={isModalOpen}
        handleClose={handleCloseModal}
        handleAdd={handleAdd}
      />
    </Box>
  );
}

export default Quizzes;
