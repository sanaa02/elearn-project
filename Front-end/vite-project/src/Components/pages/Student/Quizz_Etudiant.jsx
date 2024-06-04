import { useState } from 'react';
import { Box, Divider, Button } from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';
import './Quizz_Etudiant.css'
/////////////////////////////////////////////////////////////////////
import { Link} from 'react-router-dom';

function Quizz_Etudiant() {
  const [quizzes, setQuizzes] = useState([
    { id: 1, title: 'Quiz 1', description: 'Description du quiz 1', completed: false },
    { id: 2, title: 'Quiz 2', description: 'Description du quiz 2', completed: false },
    { id: 3, title: 'Quiz 3', description: 'Description du quiz 3', completed: false },
    // Ajoutez d'autres quizzes ici
    
  ]);

  const handleCompleteQuiz = (quizId) => {
    setQuizzes(
      quizzes.map((quiz) =>
        quiz.id === quizId ? { ...quiz, completed: true } : quiz
      )
    );
  };

  return (
    <Box>
      <div className='title-quizzes'>
        <h2 style={{ flex: '1' }}>Quizzes</h2>
      </div>
      <Divider />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {quizzes.map((quiz) => (
          <div key={quiz.id} className='Box-quizzes'>
            <div className='title-of-Quizz'>
            <Link to={`/StudentPage/Quizz_Etudiant/${quiz.id}`} style={{ textDecoration: 'none'}}>
              <div className='box-title'>
                <QuizIcon style={{ marginRight: '8px', marginTop: '4px' }} />
                <h3>{quiz.title}</h3>
                </div>
                </Link>
                <Button

                  variant="contained"
                  size="small"
                  style={{ marginLeft: '8px', backgroundColor: quiz.completed ? "#1F7848" : "#EF4444", color: 'white' }}
                  onClick={() => handleCompleteQuiz(quiz.id)}
                  disabled={quiz.completed}
                >
                  {quiz.completed ? "Terminé" : "Non terminé"}
                </Button>
              
            </div>
            <div className='Description'>
              <p>{quiz.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Box>
  );
}

export default Quizz_Etudiant;
