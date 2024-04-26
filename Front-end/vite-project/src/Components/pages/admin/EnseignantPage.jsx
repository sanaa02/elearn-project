import  { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  Typography,
  Box,
  TextField,
  MenuItem,
  Select,
} from "@mui/material";

function createData(n, id, Module, name, email, role) {
  return { n, id, Module, name, email, role };
}

const initialRows = [
  createData(1, 1, "Analyse", "Maroua Djili", "m.djili@esi-sba.dz", "charge de cours"),
  createData(2, 2, "Analyse", "Maroua Djili", "m.djili@esi-sba.dz", "charge de cours"),
  createData(3, 3, "Analyse", "Maroua Djili", "m.djili@esi-sba.dz", "charge de cours"),
  createData(4, 4, "Analyse", "Maroua Djili", "m.djili@esi-sba.dz", "charge de cours"),
  createData(5, 5, "Analyse", "Inas Chaala", "c.chaala@esi-sba.dz", "charge de cours"),
];

function EnseignantPage() {
  const [openNewEnseignantModal, setOpenNewEnseignantModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editedRow, setEditedRow] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedModule, setEditedModule] = useState("");
  const [editedRole, setEditedRole] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [rows, setRows] = useState(initialRows);
  const [cohortFile, setCohortFile] = useState(null);
  const [openLotModal, setOpenLotModal] = useState(false);

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

  const handleNewEnseignant = () => {
    setOpenNewEnseignantModal(true);
  };

  const handleOptionSelect = (option) => {
    if (option === "insertion par lot") {
      setOpenNewEnseignantModal(false);
      setOpenLotModal(true); // Ouvrir le modal d'insertion par lot
    } else {
      console.log("Option sélectionnée :", option);
      setOpenNewEnseignantModal(false)}}
      const handleUploadCohort = () => {
        
        console.log("Fichier de cohorte chargé :", cohortFile);
        
        setOpenLotModal(false);
      };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterByModule = (module) => {
    setSelectedModule(module);
  };

  const filteredRows = rows.filter((row) => {
    return (
      row.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedModule === "" || row.Module === selectedModule)
    );
  });

  const handleOpenEditModal = (row) => {
    setEditedRow(row);
    setEditedName(row.name);
    setEditedEmail(row.email);
    setEditedModule(row.Module);
    setEditedRole(row.role);

    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleSaveEdit = () => {
    if (editedRow) {
      const updatedRows = rows.map((row) =>
        row.id === editedRow.id
          ? {
              ...row,
              Module: editedModule,
              name: editedName,
              email: editedEmail,
              role: editedRole,
            }
          : row
      );
      setRows(updatedRows);
      setOpenEditModal(false);
    }
  };

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="subtitle2" align="left" gutterBottom style={{ marginRight: "50px" }}>
          Liste des enseignants
        </Typography>
        <TextField
          label="rechercher un enseignant"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={handleSearch}
          style={{ marginLeft: "10px", marginBottom: "10px", width: "300px" }}
        />
        <Select
          value={selectedModule}
          onChange={(e) => handleFilterByModule(e.target.value)}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          sx={{
            marginLeft: 'auto',
            backgroundColor: '#D9D9D9',
            borderRadius: '5px',
            paddingLeft: '5px',
            paddingRight: '5px',
            width: "150px"
          }}
          size="small"
        >
          <MenuItem value="">Tous</MenuItem>
          {["ANALYSE", "Archi", "System", "Acsi", "THL"].map((Module) => (
            <MenuItem key={Module} value={Module}>
              {Module}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ maxWidth: 1000, width: 1000, background: "#D9D9D9" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ textAlign: "center" }}>N°</TableCell>
              <TableCell sx={{ textAlign: "center" }}>ID</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Module</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Nom et Prénom</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Email</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Role</TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                <Button
                  onClick={handleNewEnseignant}
                  sx={{
                    background: "#1F7848",
                    color: "white",
                    "&:hover": { background: "#000066" },
                  }}
                >
                  Nouvel Enseignant
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
                <TableCell style={{ textAlign: "center" }}>{row.Module}</TableCell>
                <TableCell style={{ textAlign: "center" }}>{row.name}</TableCell>
                <TableCell style={{ textAlign: "center" }}>{row.email}</TableCell>
                <TableCell style={{ textAlign: "center" }}>{row.role}</TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  <Button
                    onClick={() => handleOpenEditModal(row)}
                    size="small"
                    variant="contained"
                    style={{ backgroundColor: "#1F7848", marginRight: "0.5rem" }}
                  >
                    Modifier
                  </Button>
                  <Button
                    onClick={() => handleOpenDeleteModal(row)}
                    size="small"
                    variant="contained"
                    color="error"
                    style={{ backgroundColor: "red" }}
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
        open={openNewEnseignantModal}
        onClose={() => setOpenNewEnseignantModal(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "51.5%",
            left: "82%",
            transform: "translate(-50%, -50%)",
            width: 280,
            height: 200,
            boxShadow: 25,
            p: 4,
            textAlign: "center",
            borderRadius: "15px",
            background: "#D9D9D9",
          }}
        >
          <h4 id="modal-title" style={{ fontSize: "0.8rem" }}>
            Choisissez une option
          </h4>
          <Box>
            <Button
              onClick={() => handleOptionSelect("un seul Enseignant")}
              variant="contained"
              style={{
                backgroundColor: "#1F7848",
                marginBottom: "0.2rem",
                width: "80%",
                fontSize: "0.7rem",
              }}
            >
              Un seul Enseignant
            </Button>
            <Button
              onClick={() => handleOptionSelect("insertion par lot")}
              variant="contained"
              style={{
                backgroundColor: "#1F7848",
                width: "80%",
                fontSize: "0.7rem",
              }}
            >
              Insertion par lot
            </Button>
          </Box>
        </Box>
      </Modal>

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
            backgroundImage: `url('/src/assets/dialog.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "15px",
          }}
        >
          <h2 id="modal-title">Confirmer la suppression</h2>
          <p id="modal-description">
            {selectedRow &&
              `Voulez-vous vraiment supprimer l'enseignant : ${selectedRow.name} ?.`}
          </p>
          <Button onClick={handleDelete} color="error" autoFocus>
            Supprimer
          </Button>
          <Button onClick={handleCloseDeleteModal} autoFocus>
            Annuler
          </Button>
        </Box>
      </Modal>

      <Modal
        open={openEditModal}
        onClose={handleCloseEditModal}
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
            height: 350,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            textAlign: "center",
            backgroundImage: `url('/src/assets/dialog.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "15px",
          }}
        >
          <h2 id="modal-title">Modifier apprenant</h2>
          <TextField
            label="Module"
            variant="outlined"
            size="small"
            value={editedModule}
            onChange={(e) => setEditedModule(e.target.value)}
            InputLabelProps={{
              shrink: true,
              style: {
                fontSize: "0.8rem",
              },
            }}
            sx={{
              marginBottom: "10px",
              display: "block",
              width: "100%",
            }}
          />
          <TextField
            label="Nom et Prénom"
            variant="outlined"
            size="small"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            InputLabelProps={{
              shrink: true,
              style: {
                fontSize: "0.8rem",
              },
            }}
            sx={{
              marginBottom: "10px",
              display: "block",
              width: "100%",
            }}
          />
          <TextField
            label="Email"
            variant="outlined"
            size="small"
            value={editedEmail}
            onChange={(e) => setEditedEmail(e.target.value)}
            InputLabelProps={{
              shrink: true,
              style: {
                fontSize: "0.8rem",
              },
            }}
            sx={{
              marginBottom: "10px",
              display: "block",
              width: "100%",
            }}
          />
          <TextField
            label="Role"
            variant="outlined"
            size="small"
            value={editedRole}
            onChange={(e) => setEditedRole(e.target.value)}
            InputLabelProps={{
              shrink: true,
              style: {
                fontSize: "0.8rem",
              },
            }}
            sx={{
              marginBottom: "10px",
              display: "block",
              width: "100%",
            }}
          />
          <Button onClick={handleSaveEdit} color="primary" autoFocus>
            enregistrer
          </Button>
          <Button onClick={handleCloseEditModal} autoFocus>
            Annuler
          </Button>
        </Box>
      </Modal>
      <Modal
      open={openLotModal}
      onClose={() => setOpenLotModal(false)}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 820,
          height: 650,
          p: 4,
          borderRadius: "15px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundImage: `url('/src/assets/ajouter1.png')`,
          backgroundSize: "cover",
          filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
        }}
      >
        <div style={{ width: "50%", marginBottom: "10px", position: "relative", marginTop:'25%'}}>
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setCohortFile(e.target.files[0])}
            style={{
              opacity: 0,
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              cursor: "pointer",
              
            }}
          />
          <div style={{
            padding: "8px 12px",
            fontSize: "0.8rem",
            whiteSpace: "nowrap",
            textAlign: "center",
            borderBottom: "1px solid black",
            borderTopLeftRadius: "2px",
            borderTopRightRadius: "2px",
          }}>
            {cohortFile ? cohortFile.name : "Ajouter des enseignants par lot/fichier CSV"}
          </div>
        </div>

        <div style={{ display: "flex", width: "50%", marginTop:'100px' }}>
          <Button
            onClick={() => setOpenLotModal(false)}
            autoFocus
            style={{
              flex: 1,
              marginRight: "10px",
              padding: "10px",
              fontSize: "1rem",
              backgroundColor: "#000066",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Annuler
          </Button>
          <Button
            onClick={handleUploadCohort}
            autoFocus
            style={{
              flex: 1,
              padding: "10px",
              fontSize: "1rem",
              backgroundColor: "#000066",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Confirmer
          </Button>
        </div>
      </Box>
    </Modal>
    </Box>
  );
}

export default EnseignantPage;
