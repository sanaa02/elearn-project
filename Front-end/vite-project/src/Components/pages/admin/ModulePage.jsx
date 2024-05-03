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
import '../../styles/ModulePage.css'

function createData(n, id, name, enseignant, promo, coefficient, actions) {
  return { n, id, name, enseignant, promo, coefficient, actions };
}

const initialRows = [
  createData(1, 1, "Analyse", "Maroua Djili", "2021/2022", "4", {
    modify: () => console.log("Modifying row with ID:", 1),
    delete: () => console.log("Deleting row with ID:", 1),
  }),
  createData(2, 2, "Analyse", "Maroua Djili", "2021/2022", "4", {
    modify: () => console.log("Modifying row with ID:", 2),
    delete: () => console.log("Deleting row with ID:", 2),
  }),
  createData(3, 3, "Analyse", "Maroua Djili", "2021/2022", "4", {
    modify: () => console.log("Modifying row with ID:", 3),
    delete: () => console.log("Deleting row with ID:", 3),
  }),
  createData(4, 4, "Analyse", "Maroua Djili", "2021/2022", "4", {
    modify: () => console.log("Modifying row with ID:", 4),
    delete: () => console.log("Deleting row with ID:", 4),
  }),
  createData(5, 5, "Analyse", "Maroua Djili", "2021/2022", "4", {
    modify: () => console.log("Modifying row with ID:", 5),
    delete: () => console.log("Deleting row with ID:", 5),
  }),
];

function ModulePage() {
  const [openNewModuleModal, setOpenNewModuleModal] = useState(false);

  const [selectedRow, setSelectedRow] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editedRow, setEditedRow] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedEnseignant, setEditedEnseignant] = useState("");
  const [editedPromo, setEditedPromo] = useState("");
  const [editedcoefficient, setEditedcoefficient] = useState("");
  const [cohortFile, setCohortFile] = useState(null);
  const [openLotModal, setOpenLotModal] = useState(false);

  
  
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const [formData, setFormData] = useState({
    nomModule: "",
    enseignat: "",
    coefficient: "",
    promo: "",
    Matricule: "",
  });
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
        formData.nomModule,
        formData.enseignant,
        formData.promo,
        formData.coefficient,
        formData.Matricule
      );

      setRows([...rows, newRow]);
      setShowModal(false);
      setFormData({
        nomModule: "",
        coefficient: "",
        promo: "",
        Matricule: "",
      });
    }
  };

  const [rows, setRows] = useState(initialRows);

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

  const handleUploadCohort = () => {
    console.log("Fichier de cohorte chargé :", cohortFile);

    setOpenLotModal(false);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterByname = (name) => {
    setSelectedModule(name);
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
    setEditedPromo(row.promo);
    setEditedEnseignant(row.enseignant);
    setEditedcoefficient(row.coefficient);

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
              enseignant: editedEnseignant,
              name: editedName,
              promo: editedPromo,
              coefficient: editedcoefficient,
            }
          : row
      );
      setRows(updatedRows);
      setOpenEditModal(false);
    }
  };
  const handleNewModule = () => {
    setOpenNewModuleModal(true);
  };

  const handleOptionSelect = (option) => {
    if (option === "insertion par lot") {
      setOpenNewModuleModal(false);
      setOpenLotModal(true); // Ouvrir le modal d'insertion par lot
    } else {
      console.log("Option sélectionnée :", option);
      setOpenNewModuleModal(false);
    }
  };

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography
          variant="subtitle2"
          align="left"
          gutterBottom
          style={{ marginRight: "50px" }}
        >
          Liste des Modules
        </Typography>
        <TextField
          label="rechercher un Module"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={handleSearch}
          style={{ marginLeft: "10px", marginBottom: "10px", width: "300px" }}
        />
        <Select
          value={selectedModule}
          onChange={(e) => handleFilterByname(e.target.value)}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          sx={{
            marginLeft: "auto",
            backgroundColor: "#D9D9D9",
            borderRadius: "5px",
            paddingLeft: "5px",
            paddingRight: "5px",
            width: "150px",
          }}
          size="small"
        >
          <MenuItem value="">Tous</MenuItem>
          {["ANALYSE", "Archi", "System", "Acsi", "THL"].map((name) => (
            <MenuItem key={name} value={name}>
              {name}
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
              <TableCell sx={{ textAlign: "center" }}>Nom</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Enseignant</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Promo</TableCell>
              <TableCell sx={{ textAlign: "center" }}>coefficient</TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                <Button
                  onClick={handleNewModule}
                  sx={{
                    background: "#1F7848",
                    color: "white",
                    "&:hover": { background: "#000066" },
                  }}
                >
                  Nouveau Module
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
                  {row.name}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {row.enseignant}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {row.promo}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {row.coefficient}
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
              `Voulez-vous vraiment supprimer Module : ${selectedRow.name} ?.`}
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
        open={openNewModuleModal}
        onClose={() => setOpenNewModuleModal(false)}
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
              onClick={handleOpenModal}
              variant="contained"
              style={{
                backgroundColor: "#1F7848",
                marginBottom: "0.2rem",
                width: "80%",
                fontSize: "0.7rem",
              }}
            >
              Un seul Module
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
          <h2 id="modal-title">Modifier Module</h2>
          <TextField
            label="nom"
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
            label="enseignant"
            variant="outlined"
            size="small"
            value={editedEnseignant}
            onChange={(e) => setEditedEnseignant(e.target.value)}
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
            label="promo"
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
            label="coefficient"
            variant="outlined"
            size="small"
            value={editedcoefficient}
            onChange={(e) => setEditedcoefficient(e.target.value)}
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
        onClose={()=> setOpenLotModal(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box className="lot-modal">
        <Typography variant="h5" gutterBottom>
            Ajouter des modules par lots
          </Typography>
         <form>
         <div className="file-container"
           
           >
             <input className="file"
               type="file"
               accept=".csv"
               onChange={(e) => setCohortFile(e.target.files[0])}
             
             />
             <div className="file-place"
               
             >
               {cohortFile
                 ? cohortFile.name
                 : "ajouter des modules par lot/fichie csv"}
             </div>
           </div>
         </form>

          <div className="button-container">
            <Button
              onClick={() => setOpenLotModal(false)}
              autoFocus
             
            >
              Annuler
            </Button>
            <Button
              onClick={handleUploadCohort}
              autoFocus
            >
              Confirmer
            </Button>
          </div>
        </Box>
      </Modal>
      <Modal open={showModal} onClose={handleCloseModal}>
        <Box
         className="Modal-seul-module"
        >
           <Typography variant="h5" gutterBottom>
            Ajouter une seule module
          </Typography>
          <form>
            <div className="form">
              <input
                required
                type="text"
                placeholder="Nom du module"
                name="nomModule"
                value={formData.nomModule}
                onChange={handleInputChange}
                onFocus={(e) => {
                  e.target.style.height = "40px";
                }}
                onBlur={(e) => {
                  e.target.style.height = "40px";
                }}
              />

              <input
                type="text"
                placeholder="Promo"
                required
                name="promo"
                value={formData.promo}
                onChange={handleInputChange}
              />
              <input
                required
                type="text"
                placeholder="Coefficient"
                name="coefficient"
                value={formData.coefficient}
                onChange={handleInputChange}
              />

              <div className="file-container"
               
              >
                <div>
                  {cohortFile ? cohortFile.name : "Ajouter des enseignants"}
                </div>
                <input className="file"
                  type="file"
                  accept=".csv"
                  onChange={(e) => setCohortFile(e.target.files[0])}
                
                />
                
              </div>

              <input
                required
                type="text"
                placeholder="Matricule"
                name="Matricule"
                value={formData.Matricule}
                onChange={handleInputChange}
              />
              <div
                className="button-container"
                style={{
                  textAlign: " center",
                  cursor: "pointer",
                  justifyContent: "center",
                  alignItems: " center",
                }}
              >
                <button
                  className="button-submit"
                  type="submit"
                  onClick={() => {
                    handleSubmit(
                      formData.nomModule !== "" &&
                        formData.coefficient !== "" &&
                        formData.promo !== "" &&
                        formData.Matricule !== ""
                    );
                  }}
                
                >
                  Confirmer
                </button>

                <button
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

export default ModulePage;
