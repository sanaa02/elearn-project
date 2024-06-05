
import { useParams } from 'react-router-dom';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';

function ConsulterQuiz() {
    const { quizId } = useParams();
  
    // Exemple de données simulées
    const submissions = [
      { id: 1, name: 'Étudiant 1', email: 'etudiant1@example.com', submissionDate: '2024-05-16', note: 15 },
      { id: 2, name: 'Étudiant 2', email: 'etudiant2@example.com', submissionDate: '2024-05-17', note: 18 },
      { id: 3, name: 'Étudiant 3', email: 'etudiant3@example.com', submissionDate: '2024-05-18', note: 20 },
      { id: 4, name: 'Étudiant 4', email: 'etudiant4@example.com', submissionDate: '2024-05-18', note: 12 },
      { id: 5, name: 'Étudiant 5', email: 'etudiant5@example.com', submissionDate: '2024-05-20', note: 19 },
    ];

    return (
        <Box>
          <h3 style={{color:'#000066',fontSize:'24px'}}>Quizz {quizId} </h3>
          <TableContainer component={Paper} sx={{marginTop:'60px'}}>
            <Table sx={{width:'1000px',ml:'60px'}}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{textAlign:'center'}}>Nom</TableCell>
                  <TableCell sx={{textAlign:'center'}}>Email</TableCell>
                  <TableCell sx={{textAlign:'center'}}>Date de Soumission</TableCell>
                  <TableCell sx={{textAlign:'center'}}>Note</TableCell> 
                </TableRow>
              </TableHead>
              <TableBody>
                {submissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell sx={{textAlign:'center'}}>{submission.name}</TableCell>
                    <TableCell sx={{textAlign:'center'}}>{submission.email}</TableCell>
                    <TableCell sx={{textAlign:'center'}}>{submission.submissionDate}</TableCell>
                    <TableCell sx={{textAlign:'center'}}> <div className="note-cell">{submission.note}</div></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      );
    }

export default ConsulterQuiz;
