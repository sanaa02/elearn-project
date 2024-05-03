/* eslint-disable no-unused-vars */
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
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";


function createData(n, id, promo, name, email, actions) {
  return { n, id, promo, name, email, actions };
}

const initialRows = [
  createData(1, 1, "Promo1", "Maroua Djili", "m.djili@esi-sba.dz", {
    modify: () => console.log("Modifying row with ID:", 1),
    delete: () => console.log("Deleting row with ID:", 1),
  }),
  createData(2, 2, "Promo2", "Maroua Djili", "m.djili@esi-sba.dz", {
    modify: () => console.log("Modifying row with ID:", 2),
    delete: () => console.log("Deleting row with ID:", 2),
  }),
  createData(3, 3, "Promo3", "Maroua Djili", "m.djili@esi-sba.dz", {
    modify: () => console.log("Modifying row with ID:", 3),
    delete: () => console.log("Deleting row with ID:", 3),
  }),
  createData(4, 4, "Promo4", "Maroua Djili", "m.djili@esi-sba.dz", {
    modify: () => console.log("Modifying row with ID:", 4),
    delete: () => console.log("Deleting row with ID:", 4),
  }),
  createData(5, 5, "Promo5", "Inas Chaala", "c.chaala@esi-sba.dz", {
    modify: () => console.log("Modifying row with ID:", 5),
    delete: () => console.log("Deleting row with ID:", 5),
  }),
];

function ApprenantPage() {
  const [openNewApprenantModal, setOpenNewApprenantModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPromo, setSelectedPromo] = useState("");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editedRow, setEditedRow] = useState(null);
  const [editedPromo, setEditedPromo] = useState("");
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [setSelectedOption] = useState(null);
  const [rows, setRows] = useState(initialRows);
  const [openCohortModal, setOpenCohortModal] = useState(false);
  const [openLotModal, setOpenLotModal] = useState(false);
  const [cohortName, setCohortName] = useState("");
  const [cohortFile, setCohortFile] = useState(null);
  //////////////////////////////////////////////ajouter un seul etudiant////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [showOneStudentModal, setShowOneStudentModal] = useState(false);
  const [formData, setFormData] = useState({
    mail: "",
    promo: "",
    nomp: "",
    cohorte: "",
    Matricule: "",
  });
  const handleOpenOneStudentModal = () => {
    setShowOneStudentModal(true);
  };
  const handleCloseModal = () => {
    setShowOneStudentModal(false);
  };

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
        formData.promo,
        formData.nomp,
        formData.mail,
        formData.cohorte,
        formData.Matricule,

      );

      setRows([...rows, newRow]);
      setShowOneStudentModal(false);
      setFormData({
        mail: "",
        promo: "",
        nomp: "",
        cohorte: "",
        Matricule: "",
      });
    }
  };

  ///////////////////////////////////////////////////////////////////////////ajouter un seul etudiant finnnnnnnnnnnnnnnnnnnnnnnnnnn////////////////////////////////////////

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

  const handleNewApprenant = () => {
    setOpenNewApprenantModal(true);
    setSelectedOption(null);
  };

  const handleOptionSelect = (option) => {
    if (option === "insertion par cohorte") {
      setOpenNewApprenantModal(false);
      setOpenCohortModal(true);
    } else if (option === "insertion par lot") {
      setOpenNewApprenantModal(false);
      setOpenLotModal(true);
    } else if (option==="un seul apprenant") {
      setOpenNewApprenantModal(false);
      setShowOneStudentModal(true)
    }
     else 
    {
      console.log("Option sélectionnée :", option);
      setSelectedOption(option);
      setOpenNewApprenantModal(false);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterByPromo = (promo) => {
    setSelectedPromo(promo);
  };

  const filteredRows = rows.filter((row) => {
    return (
      row.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedPromo === "" || row.promo === selectedPromo)
    );
  });

  const handleOpenEditModal = (row) => {
    setEditedRow(row);
    setEditedPromo(row.promo);
    setEditedName(row.name);
    setEditedEmail(row.email);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleSaveEdit = () => {
    if (editedRow) {
      const updatedRows = initialRows.map((row) =>
        row.id === editedRow.id
          ? {
              ...row,
              promo: editedPromo,
              name: editedName,
              email: editedEmail,
            }
          : row
      );
      setRows(updatedRows);
      setOpenEditModal(false);
    }
  };

  const handleUploadCohort = () => {
    // Gérer l'envoi du fichier de la cohorte
    console.log("Nom de la cohorte :", cohortName);
    console.log("Promotion sélectionnée :", selectedPromo);
    console.log("Fichier de la cohorte :", cohortFile);
    setOpenCohortModal(false);
  };

  return (
    <Box style={{  }}>
      <Box sx={{ display: "flex" }}>
        <Typography variant="subtitle2" align="left" gutterBottom>
          Liste des apprenants
        </Typography>
        <TextField
          label="rechercher un apprenant"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={handleSearch}
          style={{ marginLeft: "120px", marginBottom: "10px", width: "300px" }}
        />
        <Select
          value={selectedPromo}
          onChange={(e) => handleFilterByPromo(e.target.value)}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          sx={{
            marginLeft: 'auto',
            backgroundColor: '#D9D9D9',
            borderRadius: '5px',
            paddingLeft: '5px',
            paddingRight: '5px',
            width: "150px",
            marginBottom:'10px'
          }}
          size="small"
        >
          <MenuItem value="">Tous</MenuItem>
          {["Promo1", "Promo2", "Promo3", "Promo4", "Promo5"].map((promo) => (
            <MenuItem key={promo} value={promo}>
              {promo}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <TableContainer component={Paper}>
        <Table
          sx={{ maxWidth: 1000, width: 1000, background: "#D9D9D9" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ textAlign: "center" }}>N°</TableCell>
              <TableCell sx={{ textAlign: "center" }}>ID</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Promo</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Nom et Prénom</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Email</TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                <Button
                  onClick={handleNewApprenant}
                  sx={{
                    background: "#1F7848",
                    color: "white",
                    "&:hover": { background: "#000066" },
                  }}
                >
                  Nouvel apprenant
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
                  {row.promo}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {row.name}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {row.email}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  <Button
                    onClick={() => handleOpenEditModal(row)}
                    size="small"
                    variant="contained"
                    style={{
                      backgroundColor: "#1F7848",
                      marginRight: "0.5rem",
                    }}
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
        open={openNewApprenantModal}
        onClose={() => setOpenNewApprenantModal(false)}
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
              onClick={() => handleOptionSelect("un seul apprenant")}
              variant="contained"
              style={{
                backgroundColor: "#1F7848",
                marginBottom: "0.2rem",
                width: "80%",
                fontSize: "0.7rem",
              }}
            >
              Un seul apprenant
            </Button>
            <Button
              onClick={() => handleOptionSelect("insertion par cohorte")}
              variant="contained"
              style={{
                backgroundColor: "#1F7848",
                marginBottom: "0.2rem",
                width: "80%",
                fontSize: "0.7rem",
              }}
            >
              Insertion par cohorte
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
              `Voulez-vous vraiment supprimer l'apprenant : ${selectedRow.name} ?.`}
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
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "15px",
          }}
        >
          <h2 id="modal-title" style={{color:'#000066',marginBottom:'50px'}}>Modifier apprenant</h2>
          <form style={{display:'flex',flexDirection:'column',alignItems:'center', marginBottom:'20px'}}>
          <input
        type="text"
        placeholder="Promo"
        value={editedPromo}
        onChange={(e) => setEditedPromo(e.target.value)}
        style={{
          marginBottom: "8px",
          display: "block",
          width: "60%",
          padding: "8px",
        }}
      />
      <input
        type="text"
        placeholder="Nom et Prénom"
        value={editedName}
        onChange={(e) => setEditedName(e.target.value)}
        style={{
          marginBottom: "8px",
          display: "block",
          width: "60%",
          padding: "8px",
        }}
      />
      <input
        type="email"
        placeholder="Email"
        value={editedEmail}
        onChange={(e) => setEditedEmail(e.target.value)}
        style={{
          marginBottom: "8px",
          display: "block",
          width: "60%",
          padding: "8px",
        }}
      />
      </form>
          <Button onClick={handleSaveEdit}  autoFocus style={{color:'white',background:'#000066',width:'100px',marginLeft:'10px'}}>
            Confirmer
          </Button>
          <Button onClick={handleCloseEditModal} autoFocus style={{color:'white',background:'#000066',width:'100px',marginLeft:'10px'}}>
            Annuler
          </Button>
        </Box>
      </Modal>
      <Modal
        open={openCohortModal}
        onClose={() => setOpenCohortModal(false)}
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
            justifyContent: "space-between",
            backgroundImage: `url('/src/assets/ajouter.png')`,
            backgroundSize: "cover",
            filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
          }}
        >
          <div>
            <input
              type="text"
              placeholder="Nom de la cohorte"
              value={cohortName}
              onChange={(e) => setCohortName(e.target.value)}
              style={{
                width: "30%",
                marginBottom: "10px",
                borderBottom: "1px solid black",
                borderTopLeftRadius: "2px",
                borderTopRightRadius: "2px",
                borderLeft: "none",
                borderRight: "none",
                borderTop: "none",
                outline: "none",
                fontSize: "0.8rem",
                padding: "8px 12px",
                textAlign: "center",
                marginLeft: "100px",
                marginTop: "170px",
                backgroundColor: "transparent",
              }}
              required
            />

            <Box
              sx={{
                width: "30%",
                height: "40px",
                marginBottom: "10px",
                position: "relative",
              }}
            >
              <input
                type="text"
                value={selectedPromo}
                onChange={(e) => setSelectedPromo(e.target.value)}
                placeholder="Promo"
                style={{
                  border: "none",
                  outline: "none",
                  backgroundColor: "transparent",
                  paddingLeft: "5px",
                  paddingRight: "5px",
                  marginTop: "20px",
                  fontSize: "0.8rem",
                  width: "100%",
                  height: "100%",
                  marginLeft: "100px",
                  borderBottom: "1px solid ",
                  textAlign: "center",
                }}
              />
            </Box>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <div
              style={{
                marginLeft: "auto",
                width: "60%",
                position: "relative",
                overflow: "hidden",
                borderRadius: "4px",
                backgroundColor: "#f0f0f0",
                marginRight: "200px",
                marginBottom: "600px",
                marginTop: "-20%",
              }}
            >
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
              <div
                style={{
                  padding: "8px 12px",
                  fontSize: "0.8rem",
                  whiteSpace: "nowrap",
                  textAlign: "center",
                  borderBottom: "1px solid black",
                  borderTopLeftRadius: "2px",
                  borderTopRightRadius: "2px",
                }}
              >
                fichier
              </div>
            </div>

            <Button
              onClick={handleUploadCohort}
              color="primary"
              autoFocus
              style={{
                width: "60%",
                marginBottom: "10px",
                padding: "10px",
                fontSize: "1rem",
                fontWeight:'bold',
                backgroundColor: "#0000665C",
                color: "#000066",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "-900px",
                marginLeft: "-350px",
                marginRight: "120px",
              }}
            >
              Confirmer
            </Button>
            <Button
              onClick={() => setOpenCohortModal(false)}
              style={{
                width: "60%",
                padding: "10px",
                fontSize: "1rem",
                fontWeight:'bold',
                backgroundColor: "#0000665C",
                color: "#000066",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "-910px",
              }}
            >
              Annuler
            </Button>
          </div>
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
            justifyContent: "space-between",
            backgroundImage: `url('/src/assets/Ajouter.png')`,
            backgroundSize: "cover",
            filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
          }}
        >
          <Box
            sx={{
              width: "30%",
              height: "40px",
              marginBottom: "10px",
              position: "relative",
            }}
          >
            <input
              type="text"
              value={selectedPromo}
              onChange={(e) => setSelectedPromo(e.target.value)}
              placeholder="Promo"
              style={{
                border: "none",
                outline: "none",
                backgroundColor: "transparent",
                paddingLeft: "5px",
                paddingRight: "5px",
                marginTop: "200px",
                fontSize: "0.8rem",
                width: "100%",
                height: "100%",
                marginLeft: "100px",
                borderBottom: "1px solid ",
                textAlign: "center",
              }}
            />
          </Box>
          <div style={{ marginLeft: "auto" }}>
            <div
              style={{
                marginLeft: "auto",
                width: "60%",
                position: "relative",
                overflow: "hidden",
                borderRadius: "4px",
                backgroundColor: "#f0f0f0",
                marginRight: "200px",
                marginBottom: "600px",
                marginTop: "60%",
              }}
            >
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
              <div
                style={{
                  padding: "8px 12px",
                  fontSize: "0.8rem",
                  whiteSpace: "nowrap",
                  textAlign: "center",
                  borderBottom: "1px solid black",
                  borderTopLeftRadius: "2px",
                  borderTopRightRadius: "2px",
                }}
              >
                fichier
              </div>
            </div>

            <Button
              onClick={handleUploadCohort}
              color="primary"
              autoFocus
              style={{
                width: "60%",
                marginBottom: "10px",
                padding: "10px",
                fontSize: "1rem",
                fontWeight:'bold',
                backgroundColor: "#0000665C",
                color: "#000066",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "-900px",
                marginLeft: "-350px",
                marginRight: "120px",
              }}
            >
              Confirmer
            </Button>
            <Button
              onClick={() =>  setOpenLotModal(false)}
              autoFocus
              style={{
                width: "60%",
                padding: "10px",
                fontSize: "1rem",
                fontWeight:'bold',
                backgroundColor: "#0000665C",
                color: "#000066",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "-910px",
              }}
            >
              Annuler
            </Button>
          </div>
        </Box>
      </Modal>
      {/* this part is about  adding one student ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

      <Modal open={showOneStudentModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position:"relative",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 820,
            height: 650,
            backgroundColor:"transparent",
            border:"0px",
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
            <div className="form"
         
            >
            <input 
             
              required
              type="text"
              placeholder="Mail"
              name="mail"
              value={formData.mail}
              onChange={handleInputChange}
              style={{
                borderRadius:'0',
                height: "20px",
                width: "200px",
                border: "none",
                borderBottom: "0.5px solid #000066",
                outline: "none",
                background: "none",
                position:"absolute",
                marginLeft:"-100px",
               marginTop:"150px",
              }}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  document.getElementsByName('promo')[0].focus(); // Passer au champ promo
                }}}
            />
            <input
              type="text"
              placeholder="Promo"
              required
              name="promo"
              value={formData.promo}
              onChange={handleInputChange}
              style={{
                borderRadius:'0',
                height: "40px",
                width: "200px",
                border: "none",
                borderBottom: "0.5px solid #000066",
                outline: "none",
                
                position:"absolute",
                marginLeft:"220px",
                marginTop:"130px",
              }}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  document.getElementsByName('nomp')[0].focus(); 
                }
              }}
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
                borderRadius:'0',
                background: "none", 
                position:"absolute",
                marginLeft:"-100px",
               marginTop:"210px",
              }}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  document.getElementsByName('cohorte')[0].focus(); 
                }
              }}
            />
            <input required
              type="text"
              placeholder="Cohorte"
              name="cohorte"
              value={formData.cohorte}
              onChange={handleInputChange}
              style={{
                height: "40px",
                width: "200px",
                border: "none",
                borderBottom: "0.5px solid #000066",
                outline: "none",
                borderRadius:'0',
                position:"absolute",
                background: "none",
                marginLeft:"220px",
                marginTop:"210px",
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
               position:"absolute",
                background: "none",
                borderRadius:'0',
                marginLeft:"-100px",
                marginTop:"290px",
              }}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  document.getElementsByName('vide')[0].focus(); 
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
                marginLeft: '-250px',
                marginTop:'390px',
                borderRadius:'6px',
                color:'#000066' ,
                border:' none',
                backgroundColor: ' #0000665C',
                zIndex:' 2',
                cursor:"pointer",
            }}
                className="button-submit"
                type="submit"
                onClick={(
                 )=>
                { handleSubmit ( (formData.mail!==''&&formData.Matricule!==''&&formData.promo!==''&&formData.cohorte!==''&&formData.nomp!==''))}}
              >
                Confirmer
              </button>

              <button
              style={{position:'absolute',
              fontSize:' 16px',
              fontWeight:'bold',
              height:' 45px',
              width:' 120px',  
             
              marginLeft: '80px',
                marginTop:'340px',
              borderRadius:'6px',
              color:'#000066' ,
              border:' none',
              backgroundColor: ' #0000665C',
              zIndex:' 2',
              cursor: 'pointer',
          }}
                className="button-cancel"
                type="submit"
                onClick={handleCloseModal}
                
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

export default ApprenantPage;
