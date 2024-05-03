/* eslint-disable no-unused-vars */
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

function createData(n, id, Module, name, email) {
  return { n, id, Module, name, email };
}

const initialRows = [
  createData(1, 1, "Analyse", "Maroua Djili", "m.djili@esi-sba.dz"),
  createData(2, 2, "Analyse", "Maroua Djili", "m.djili@esi-sba.dz"),
  createData(3, 3, "Analyse", "Maroua Djili", "m.djili@esi-sba.dz"),
  createData(4, 4, "Analyse", "Maroua Djili", "m.djili@esi-sba.dz"),
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
      handleOpenOneproftModal();
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
              
            }
          : row
      );
      setRows(updatedRows);
      setOpenEditModal(false);
    }
  };
  ///////////////////////////adding just one teacher/////////////////////////////////////////////////
  const [showOneProftModal, setShowOneProftModal] = useState(false);
  const [formData, setFormData] = useState({
    mail: "",
    nomp: "",
    Matricule: "",
    module:"",
  });
  const handleOpenOneproftModal = () => {
    setShowOneProftModal(true);
  };
  const handleCloseOneProfModal = () => {
    setShowOneProftModal(false);
  };
  const handleAddOneprof =()=> {
    setShowOneProftModal(true);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (Empty) => {
    if (Empty == true) {
      const newRow = createData(
        rows.length + 1,
        rows.length + 1,
        formData.module,
        formData.nomp,
        formData.mail,
        formData.Matricule,

      );

      setRows([...rows, newRow]);
      setShowOneProftModal(false);
      setFormData({
        mail: "",
        nomp: "",
        Matricule: "",
        module:"",
      });
    }
  }
  ///////////

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
            background:'white',
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "15px",
            
          }}
        >
          <h2 id="modal-title" style={{color:'#000066',marginBottom:'50px'}}>Confirmer la suppression</h2>
          <p id="modal-description" style={{marginBottom:'50px'}}>
            {selectedRow &&
              `Voulez-vous vraiment supprimer l'Enseignant : ${selectedRow.name} ?.`}
          </p>
          <Button onClick={handleDelete}  autoFocus style={{color:'white',background:'#000066',width:'100px',marginLeft:'10px'}}>
            Supprimer
          </Button>
          <Button onClick={handleCloseDeleteModal} autoFocus style={{color:'white',background:'#000066',width:'100px',marginLeft:'10px'}}>
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
            background:'white',
            borderRadius: "15px",
          }}
        >
          <h2 id="modal-title" style={{color:'#000066',marginBottom:'50px'}}>Modifier Enseignant</h2>
          <form style={{display:'flex',flexDirection:'column',alignItems:'center', marginBottom:'20px'}}>
          <input
        type="text"
        placeholder="Module"
        value={editedModule}
        onChange={(e) => setEditedModule(e.target.value)}
        style={{
          marginBottom: "8px",
          
          width: "60%",
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      <input
        type="text"
        placeholder="Nom et Prénom"
        value={editedName}
        onChange={(e) => setEditedName(e.target.value)}
        style={{
          marginBottom: "8px",
          width: "60%",
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      <input
        type="email"
        placeholder="Email"
        value={editedEmail}
        onChange={(e) => setEditedEmail(e.target.value)}
        style={{
          marginBottom: "8px",
          width: "60%",
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      </form>
       
          <Button onClick={handleSaveEdit}  autoFocus style={{color:'white',background:'#000066',width:'100px',marginLeft:'10px'}}>
            confirmer
          </Button>
          <Button onClick={handleCloseEditModal} autoFocus style={{color:'white',background:'#000066',width:'100px',marginLeft:'10px'}}>
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
    







    <Modal open={showOneProftModal} onClose={handleCloseOneProfModal}>
        <Box
          sx={{
            position: "relative",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 820,
            height: 650,

            p: 4,
            borderRadius: "15px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundImage: `url('/src/assets/ajouter.png')`,
            backgroundSize: "cover",
            filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
          }}
        >
          <form >
            <div className="form">
            <input 
            autoFocus
              required
              type="email"
              placeholder="Mail"
              name="mail"
              value={formData.mail}
              onChange={handleInputChange}
              style={{
                  height: "40px",
                  width: "200px",
                  border: "none",
                  borderBottom: "0.5px solid #000066",
                  outline: "none",
                  padding: "10px",
                  background: "none",
                  marginLeft: "-80px",
                  marginTop: "150px",
                  transition: "height 0.3s",
                  position:"absolute",
              }}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  document.getElementsByName('nomp')[0].focus(); // Passer au champ promo
                }}}
            />
           
            <input
              required
              type="text"
              placeholder="Nom et prenom"
              name="nomp"
              value={formData.nomp}
              onChange={handleInputChange}
              style={{
                height: "40px",
                width: "200px",
                border: "none",
                borderBottom: "0.5px solid #000066",
                outline: "none",
                padding: "10px",
                marginLeft: "-80px",
                marginTop: "227px",
                background: "none",
                position: "absolute",
              }}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  document.getElementsByName('Matricule')[0].focus(); 
                }
              }}
            />
           
           
            <input
             required
              type="text"
              placeholder="Matricule"
              name="Matricule"
              value={formData.Matricule}
              onChange={handleInputChange}
              style={{
                height: "40px",
                width: "200px",
                border: "none",
                borderBottom: "0.5px solid #000066",
                outline: "none",
                padding: "10px",
                marginLeft: "-80px",
                background: "none",
                marginTop: "300px",
                position:"absolute"
                
                
              }}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  document.getElementsByName('module')[0].focus(); 
                }
              }}
              />
              <input required
              type="text"
              placeholder="Module"
              name="module"
              value={formData.module}
              onChange={handleInputChange}
              style={{
                height: "40px",
                width: "200px",
                border: "none",
                borderBottom: "0.5px solid #000066",
                outline: "none",
                padding: "10px",
                marginTop: "145px",
                marginLeft: "200px",
                background: "none",
                position: "absolute",
              }}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  document.getElementsByName('abc')[0].focus(); 
                }
              }}
             
            />
            <div className="button-container"
            style={{
              textAlign:' center',
              cursor: 'pointer',
              justifyContent: 'center',
              alignItems:' center',
               }}
            >
              <button
              style={{position:'absolute',
                fontSize:' 16px',
                fontWeight:'bold',
                height:' 45px',
                width:' 120px',  
                marginLeft: '-230px',
                marginTop:'400px',
                borderRadius:'6px',
                color:'#000066' ,
                border:' none',
                backgroundColor: ' #0000665C',
                zIndex:' 2',
            }}
                className="button-submit"
                type="submit"
                onClick={(
                 )=>
                { handleSubmit ( (formData.mail!==''&&formData.Matricule!==''&&formData.module!==''&&formData.nomp!==''))}}
              >
                Confirmer
              </button>

              <button
              style={{position:'absolute',
              fontSize:' 16px',
              fontWeight:'bold',
              height:' 45px',
              width:' 120px',  
              marginLeft: '65px',
              marginTop:'300px',
              borderRadius:'6px',
              color:'#000066' ,
              border:' none',
              backgroundColor: ' #0000665C',
              zIndex:' 2',
          }}
                className="button-cancel"
                type="submit"
                onClick={handleCloseOneProfModal}
              >
                Annuler
              </button>
            </div>
            </div>
            
          </form>
        </Box>
      </Modal>
    </Box>
  );
}

export default EnseignantPage;
