import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Divider } from '@mui/material';
import './Devoir.css'; 

function EvaluationDevoir() {
  const { chapterId } = useParams(); 
  const [devoirs, setDevoirs] = useState([]); 

  useEffect(() => {
    const simulatedDevoirs = [
      { id: 1, title: 'Devoir 1', description: 'Description du devoir 1', deadline: '2024-05-15' },
      { id: 2, title: 'Devoir 2', description: 'Description du devoir 2', deadline: '2024-05-20' },
      { id: 3, title: 'Devoir 3', description: 'Description du devoir 3', deadline: '2024-05-25' },
    ];

    setDevoirs(simulatedDevoirs);
  }, [chapterId]);

  return (
    <Box>
      <div className='title-devoirs'>
        <h3 style={{ flex: '1' }}>Devoirs</h3>
      </div>
      <Divider />
      <div style={{ display: 'flex', flexWrap: 'wrap'}}>
        {devoirs.map((devoir) => (
          <Link key={devoir.id} to={`devoirs/${devoir.id}`} className='Box-devoirs'style={{textDecoration:'none'}}>
            <div className='title-of-Devoir'>
              <h3>{devoir.title}</h3>
            </div>
            <div className='Description'>
              <p>{devoir.description}</p>
              <p>Date limite: {devoir.deadline}</p>
            </div>
          </Link>
        ))}
      </div>
    </Box>
  );
}

export default EvaluationDevoir;
