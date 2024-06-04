/* eslint-disable no-unused-vars */
import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';


function ConsulterDevoir() {
  const { devoirId } = useParams();
  
  // Exemple de données simulées
  const submissions = [
    { id: 1, name: 'Étudiant 1', email: 'etudiant1@example.com', submissionDate: '2024-05-16', fileUrl: '#' },
    { id: 2, name: 'Étudiant 2', email: 'etudiant2@example.com', submissionDate: '2024-05-17', fileUrl: '#' },
    { id: 3, name: 'Étudiant 3', email: 'etudiant3@example.com', submissionDate: '2024-05-18', fileUrl: '#' },
    { id: 4, name: 'Étudiant 4', email: 'etudiant4@example.com', submissionDate: '2024-05-18', fileUrl: '#' },
    { id: 5, name: 'Étudiant 5', email: 'etudiant5@example.com', submissionDate: '2024-05-20', fileUrl: '#' },
  ];

  return (
    <Box>
      <h3 style={{color:'#000066',fontSize:'22px'}}>Devoirs {devoirId} Reçu </h3>
      <TableContainer component={Paper} sx={{marginTop:'60px'}}>
        <Table sx={{width:'1000px',ml:'60px'}}>
          <TableHead>
            <TableRow>
              <TableCell sx={{textAlign:'center'}}>Nom</TableCell>
              <TableCell sx={{textAlign:'center'}}>Email</TableCell>
              <TableCell sx={{textAlign:'center'}}>Date de Soumission</TableCell>
              <TableCell sx={{textAlign:'center'}}>Voir Fichier</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {submissions.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell sx={{textAlign:'center'}}>{submission.name}</TableCell>
                <TableCell sx={{textAlign:'center'}}>{submission.email}</TableCell>
                <TableCell sx={{textAlign:'center'}}>{submission.submissionDate}</TableCell>
                <TableCell sx={{textAlign:'center'}}>
                  <Button variant="contained" href={submission.fileUrl} target="_blank" sx={{background:'#2DA771',color:'black'}}>
                    Voir le fichier
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ConsulterDevoir;
