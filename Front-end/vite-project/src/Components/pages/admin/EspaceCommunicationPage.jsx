import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";


function createData(n, id, nom, createur, nbParticipants, actions) {
  return { n, id, nom, createur, nbParticipants, actions };
}

const initialRows = [
  createData(1, 1, "Général", "Maroua Djili", 35, {
    modify: () => console.log("Modifying row with ID:", 1),
    delete: () => console.log("Deleting row with ID:", 1),
  }),
  createData(2, 2, "Général", "Maroua Djili", 35, {
    modify: () => console.log("Modifying row with ID:", 2),
    delete: () => console.log("Deleting row with ID:", 2),
  }),
  createData(2, 2, "ACSI", "Boughalem feyroz", 35, {
    modify: () => console.log("Modifying row with ID:", 2),
    delete: () => console.log("Deleting row with ID:", 2),
  }),
  // Add more initial data if needed
];

function EspaceCommunicationPage() {
    const [searchQuery, setSearchQuery] = useState("");
  
  const [rows, setRows] = useState(initialRows);
  const [selectedRow, setSelectedRow] = useState(null);
  const filteredRows = rows.filter((row) => {
    return (
      row.nom.toLowerCase().includes(searchQuery.toLowerCase()) 
      
    );
  });

  const handleOpenDeleteModal = (row) => {
    setSelectedRow(row);
  };

  const handleCloseDeleteModal = () => {
    setSelectedRow(null);
  };
  const handleDelete = () => {
    if (selectedRow) {
      const updatedRows = rows.filter((r) => r.id !== selectedRow.id);
      setRows(updatedRows);
      setSelectedRow(null);
    }
  };


  return (
    <Box>
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography variant="subtitle2" align="left" gutterBottom>
        Liste des espaces
      </Typography>
      <TextField
        label="rechercher un espace"
        variant="outlined"
        size="small"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginLeft: "120px", marginBottom: "10px", width: "300px" }}
      />
      
    </Box>
    <TableContainer component={Paper}>
      <Table
        sx={{ maxWidth: 1000,width:1000, background: "#D9D9D9" }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ textAlign: "center" }}>N°</TableCell>
            <TableCell sx={{ textAlign: "center" }}>ID</TableCell>
            <TableCell sx={{ textAlign: "center" }}>Nom</TableCell>
            <TableCell sx={{ textAlign: "center" }}>Créateur</TableCell>
            <TableCell sx={{ textAlign: "center" }}>Nbre de participants</TableCell>
            <TableCell sx={{ textAlign: "center" }}>
              <Button
                sx={{
                  border:"0.5px solid #1F7848",
                  color: "white",
                  background:'#1F7848',

                  "&:hover": { background: "#D9D9D9" },
                }}
              >
                Créer un nouvel espace
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows.map((row) => (
            <TableRow
              key={row.id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                textAlign: "center",
              }}
            >
              <TableCell component="th" scope="row">
                {row.n}
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>{row.id}</TableCell>
              <TableCell style={{ textAlign: "center" }}>
                {row.nom}
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>
                {row.createur}
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>
                {row.nbParticipants}
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>
                <Button
                  size="small"
                  variant="contained"
                  style={{
                    backgroundColor:"#1F7848",
                    
                    marginRight: "0.5rem",
                  
                }}
                >
                     Voir l espace
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={() => handleOpenDeleteModal(row)}
                    style={{ background: "red" }}
                  >
                    Supprimer
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={selectedRow !== null}
        onClose={handleCloseDeleteModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 300,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            textAlign: "center",
            borderRadius: "15px",
          }}
        >
          <h2 id="modal-title">Confirmer la suppression</h2>
          <p id="modal-description">
            {selectedRow && `Voulez-vous vraiment supprimer l'espace : ${selectedRow.nom} ?`}
          </p>
          <Button 
          onClick={handleDelete} color="error" 
          autoFocus>
            Supprimer
          </Button>
          <Button onClick={handleCloseDeleteModal} autoFocus>
            Annuler
          </Button>
        </Box>
      </Modal>
    </Box>
    
  );
}

export default EspaceCommunicationPage