/* eslint-disable no-unused-vars */
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(num, type, date, nometprenom, email) {
  return { num, type, date, nometprenom, email };
}

const rows = [
  createData(1, "type", "02-03-2024", "Nom et prenom", "nom@gmail.com"),
  createData(2, "type", "02-03-2023", "Nom et prenom", "nom@gmail.com"),
  createData(3, "type", "02-03-2022", "Nom et prenom", "nom@gmail.com"),
  createData(4, "type", "02-03-2022", "Nom et prenom", "nom@gmail.com"),
  createData(5, "type", "02-03-2025", "Nom et prenom", "nom@gmail.com"),
];

export default function BasicTable() {
  return (
    <div className="Table_recent"
    style={{backgroundColor:'#D9D9D9',marginLeft:'5px'}}>
      <h2 style={{padding:'20px',color:'#002079 '}}>Activités Récentes</h2>
      <TableContainer component={Paper}
      style={{backgroundColor:'#D9D9D9'}}>
        <Table sx={{ maxWidth: 1000 ,width:1000}}  >
          <TableHead 
          >
            <TableRow>
              <TableCell align="center">N°</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Nom et prénom</TableCell>
              <TableCell align="center">Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.num}> 
                <TableCell component="th" scope="row" align='center'>
                  {row.num}
                </TableCell>
                <TableCell align="center">{row.type}</TableCell>
                <TableCell align="center">{row.date}</TableCell>
                <TableCell align="center">{row.nometprenom}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
