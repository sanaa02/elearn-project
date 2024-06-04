import { useState } from 'react';
import { Box, Divider } from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';
import { Link } from 'react-router-dom'; // Importer le composant Link
import './Quizzes.css';

function EvaluationQuizz() {
  const [quizzes] = useState([
    { id: 1, title: 'Quiz 1', description: 'Description du quiz 1' },
    { id: 2, title: 'Quiz 2', description: 'Description du quiz 2' },
    { id: 3, title: 'Quiz 3', description: 'Description du quiz 3' },
  ]);

  return (
    <Box>
      <div className='title-quizzes'>
        <h2 style={{ flex: '1' }}>Quizzs</h2>
      </div>
      <Divider />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {quizzes.map((quiz) => (
          <Link key={quiz.id} to={`quizzes/${quiz.id}`} className='Box-quizzes' style={{textDecoration:'none'}}>
            <div className='title-of-Quiz'>
              <div className='box-title'>
                <QuizIcon style={{ marginRight: '8px', }} />
                <h3>{quiz.title}</h3>
              </div>
            </div>
            <div className='Description'>
              <p>{quiz.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </Box>
  );
}

export default EvaluationQuizz;
