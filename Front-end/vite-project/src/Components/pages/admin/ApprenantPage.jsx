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
import "../../styles/apprenantpage.css";
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
        formData.Matricule
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
    } else if (option === "un seul apprenant") {
      setOpenNewApprenantModal(false);
      setShowOneStudentModal(true);
    } else {
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
    setOpenCohortModal(false);
  
  };


  return (
    <Box style={{}}>
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
            marginLeft: "auto",
            backgroundColor: "#D9D9D9",
            borderRadius: "5px",
            paddingLeft: "5px",
            paddingRight: "5px",
            width: "150px",
            marginBottom: "10px",
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
      {/* /////////////////////////////////modal de choix d'ajout ////////////////////////////////////////// */}
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
            backgroundImage: `url('/src/assets/dialog.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "15px",
          }}
        >
          <h2 id="modal-title">Confirmer la suppression</h2>
          <p id="modal-description">
            {selectedRow &&
              `Voulez-vous vraiment supprimer l'apprenant : ${selectedRow.name} ?.`}
          </p>
          <Button onClick={handleDelete} color="error" autoFocus>
            Supprimer
          </Button>
          <Button onClick={handleCloseDeleteModal} autoFocus>
            Annuler
          </Button>
        </Box>
      </Modal>
      {/* //////////////////////////////////////////////////modal de modification////////////////////////////////////////////////// */}
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
            label="Promo"
            variant="outlined"
            size="small"
            value={editedPromo}
            onChange={(e) => setEditedPromo(e.target.value)}
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
          <Button onClick={handleSaveEdit} color="primary" autoFocus>
            enregistrer
          </Button>
          <Button onClick={handleCloseEditModal} autoFocus>
            Annuler
          </Button>
        </Box>
      </Modal>
      {/* /////////////////////////////insertion par cohoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooorte */}
      <Modal
        open={openCohortModal}
        onClose={() => setOpenCohortModal(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box className="cohorte-modal">
          <Typography variant="h5" gutterBottom>
            Ajouter des apprenants par cohorte
          </Typography>
          <form>
            <input
              required
              type="text"
              placeholder="Nom de la cohorte"
              value={cohortName}
              onChange={(e) => setCohortName(e.target.value)}
            />

            <input
              required
              type="text"
              value={selectedPromo}
              onChange={(e) => setSelectedPromo(e.target.value)}
              placeholder="Promo"
            />

            <div className="file-container">
              <div className="file-place">{cohortFile ? cohortFile.name : "Ajouter des enseignants"}</div>
              <input
                type="file"
                accept=".csv"
                onChange={(e) => setCohortFile(e.target.files[0])}
              />
            </div>

            <div className="button-container" sx={{ position: "relative" }}>
              <Button onClick={handleUploadCohort} color="primary" autoFocus>
                Confirmer
              </Button>
              <Button onClick={() => setOpenCohortModal(false)}>Annuler</Button>
            </div>
          </form>
        </Box>
      </Modal>
      {/* //////////////////////////////insertion par lot */}
      <Modal open={openLotModal} onClose={() => setOpenLotModal(false)}>
        <Box className="modal-lot">
          <Typography variant="h5" gutterBottom>
            Ajouter des apprenants par fichier csv
          </Typography>
          <form
           
          >
            <input
              type="text"
              value={selectedPromo}
              onChange={(e) => setSelectedPromo(e.target.value)}
              placeholder="Promo"
             
            />

            
              <div className="file-container"
               
              >
                <input 
                  type="file"
                  accept=".csv"
                  onChange={(e) => setCohortFile(e.target.files[0])}
                
                />
                <div className="file-place"
                
                >
                {cohortFile ? cohortFile.name : "Ajouter des enseignants"}
                </div>
              </div>
           
         

          <div
            className="button-container"
         
          >
            <Button
              onClick={handleUploadCohort}
              color="primary"
              autoFocus
              className="button-submit"
            >
              Confirmer
            </Button>
            <Button
              onClick={() => setOpenLotModal(false)}
              autoFocus
             className="button-submit"
            >
              Annuler
            </Button>
          </div>
          </form>
        </Box>
      </Modal>
      {/* this part is about  adding one student ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

      <Modal open={showOneStudentModal} onClose={handleCloseModal}>
        <Box className="Modal-seul-appr">
          <Typography variant="h5" gutterBottom>
            Ajouter un nouvel apprenant
          </Typography>
          <form>
            <div className="form">
              <input
                required
                type="text"
                placeholder="Mail"
                name="mail"
                value={formData.mail}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    document.getElementsByName("promo")[0].focus(); 
                  }
                }}
              />
              <input
                type="text"
                placeholder="Promo"
                required
                name="promo"
                value={formData.promo}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    document.getElementsByName("nomp")[0].focus();
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
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    document.getElementsByName("cohorte")[0].focus();
                  }
                }}
              />
              <input
                required
                type="text"
                placeholder="Cohorte"
                name="cohorte"
                value={formData.cohorte}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    document.getElementsByName("Matricule")[0].focus();
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
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    document.getElementsByName("vide")[0].focus();
                  }
                }}
              />
              <div
                className="button-container"
                style={{
                  textAlign: " center",
                  cursor: "pointer",
                }}
              >
                <button
                  className="button-submit"
                  type="submit"
                  onClick={() => {
                    handleSubmit(
                      formData.mail !== "" &&
                        formData.Matricule !== "" &&
                        formData.promo !== "" &&
                        formData.cohorte !== "" &&
                        formData.nomp !== ""
                    );
                  }}
                >
                  Confirmer
                </button>

                <button type="submit" onClick={handleCloseModal} className="button-submit">
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
