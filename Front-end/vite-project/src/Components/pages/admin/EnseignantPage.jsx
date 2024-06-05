/* eslint-disable no-unused-vars */
import  { useEffect, useState } from "react";
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
import './E.css'

function createData(n, id, Module, name, email) {
  return { n, id, name, email, Module };
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
      setOpenNewEnseignantModal(false)}
    }
      
      const handleUploadCohort = async () => {
        
        console.log("Fichier de cohorte chargé :", cohortFile);

        const formData = new FormData();
    
    formData.append("file", cohortFile);
     for (let [key, value] of formData.entries()) {
       console.log(`${key}: ${value}`);
     }

    try {
      const response = await fetch("http://127.0.0.1:8000/professor/upload/", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = `student_passwords_${selectedYear}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);

      // const result = await response.json();
      console.log("Upload successful:", result);
      setOpenLotModal(false);
    } catch (error) {
      console.error("Error uploading file:", error);
    }


        
        
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

  const [formDataOne, setFormDataOne] = useState({
    email: "",
    promo: "",
    name: "",
    matricule: "",
    role: "professor",
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
    setFormDataOne({
      ...formDataOne,
      [name]: value,
    });
  };


    


   useEffect(() => {
     


     fetchData();
   }, []);

   
  const fetchData = async () => {
    try {
      // Make API call using fetch
      const response = await fetch("http://127.0.0.1:8000/professor/");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json(); // Parse JSON response
      console.log("Fetched data:", data);

      // Process the data and create rows
      // const processedData = data.map((item, index) => {
      //   return createData(
      //     item.id,
      //     item.matricule,
      //     item.name,
      //     item.email,
      //     // "yeah"
      //     item.professor_details.modules[0].nom
      //     // index + 1,
      //   );
      // });

      const processedData = data.map((item, index) => {
        const moduleName =
          item.professor_details &&
          item.professor_details.modules &&
          item.professor_details.modules.length > 0
            ? item.professor_details.modules[0].nom
            : "No Module"; // Provide a default value if module information is missing

        return createData(
          item.id,
          item.matricule,
          item.name,
          item.email,
          moduleName
        );
      });

      console.log("processed", processedData);

      // Update state with the fetched rows
      setRows(processedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


   

   const handleSubmit = async (Empty) => {
     if (Empty == true) {
     }

     const formDataAdd = new FormData();
     formDataAdd.append("email", formDataOne.email);
     formDataAdd.append("matricule", formDataOne.matricule);
     formDataAdd.append("name", formDataOne.name);
     formDataAdd.append("role", formDataOne.role);
     
     for (let [key, value] of formDataAdd.entries()) {
       console.log(`${key}: ${value}`);
     }

     try {
       const response = await fetch("http://127.0.0.1:8000/account/register/", {
         method: "POST",
         body: formDataAdd,
       });
     } catch (error) {
       console.error("Error uploading file:", error);
     }
   };


  // const handleSubmit = (Empty) => {
  //   if (Empty == true) {
  //     const newRow = createData(
  //       rows.length + 1,
  //       rows.length + 1,
  //       formData.module,
  //       formData.nomp,
  //       formData.mail,
  //       formData.Matricule,

  //     );

  //     setRows([...rows, newRow]);
  //     setShowOneProftModal(false);
  //     setFormData({
  //       mail: "",
  //       nomp: "",
  //       Matricule: "",
  //       module:"",
  //     });
  //   }
  
  ///////////

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography
          variant="subtitle2"
          align="left"
          gutterBottom
          style={{ marginRight: "50px" }}
        >
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
          {["ANALYSE", "Archi", "System", "Acsi", "THL"].map((Module) => (
            <MenuItem key={Module} value={Module}>
              {Module}
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
              <TableCell sx={{ textAlign: "center" }}>ID</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Matricule</TableCell>

              <TableCell sx={{ textAlign: "center" }}>Nom et Prénom</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Email</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Module</TableCell>

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
                <TableCell style={{ textAlign: "center" }}>
                  {row.Module}
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
            background: "white",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "15px",
          }}
        >
          <h2
            id="modal-title"
            style={{ color: "#000066", marginBottom: "50px" }}
          >
            Confirmer la suppression
          </h2>
          <p id="modal-description" style={{ marginBottom: "50px" }}>
            {selectedRow &&
              `Voulez-vous vraiment supprimer l'Enseignant : ${selectedRow.name} ?.`}
          </p>
          <Button
            onClick={handleDelete}
            autoFocus
            style={{
              color: "white",
              background: "#000066",
              width: "100px",
              marginLeft: "10px",
            }}
          >
            Supprimer
          </Button>
          <Button
            onClick={handleCloseDeleteModal}
            autoFocus
            style={{
              color: "white",
              background: "#000066",
              width: "100px",
              marginLeft: "10px",
            }}
          >
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
            background: "white",
            borderRadius: "15px",
          }}
        >
          <h2
            id="modal-title"
            style={{ color: "#000066", marginBottom: "50px" }}
          >
            Modifier Enseignant
          </h2>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
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

          <Button
            onClick={handleSaveEdit}
            autoFocus
            style={{
              color: "white",
              background: "#000066",
              width: "100px",
              marginLeft: "10px",
            }}
          >
            confirmer
          </Button>
          <Button
            onClick={handleCloseEditModal}
            autoFocus
            style={{
              color: "white",
              background: "#000066",
              width: "100px",
              marginLeft: "10px",
            }}
          >
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
        <Box className="lot-modal">
          <Typography variant="h5" gutterBottom>
            Ajouter des enseignants par cohorte
          </Typography>
          <div className="file-container" style={{}}>
            <input
              type="file"
              accept=".csv"
              onChange={(e) => setCohortFile(e.target.files[0])}
            />
            <div className="file-place" style={{}}>
              {cohortFile
                ? cohortFile.name
                : "Ajouter des enseignants par lot/fichier CSV"}
            </div>
          </div>

          <div className="button-container">
            <Button onClick={handleUploadCohort} autoFocus>
              Confirmer
            </Button>
            <Button onClick={() => setOpenLotModal(false)} autoFocus>
              Annuler
            </Button>
          </div>
        </Box>
      </Modal>

      <Modal open={showOneProftModal} onClose={handleCloseOneProfModal}>
        <Box className="Modal-seul-prof">
          <Typography variant="h5" gutterBottom>
            Ajouter un seul enseignant
          </Typography>
          <form>
            <input
              required
              type="email"
              placeholder="Mail"
              name="email"
              value={formDataOne.email}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  document.getElementsByName("name")[0].focus();
                }
              }}
            />

            <input
              required
              type="text"
              placeholder="Nom et prenom"
              name="name"
              value={formDataOne.name}
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
              name="matricule"
              value={formDataOne.matricule}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  document.getElementsByName("module")[0].focus();
                }
              }}
            />

            <div className="button-container">
              <button
                type="submit"
                className="button-submit"
                onClick={() => {
                  handleSubmit(
                    formDataOne.email !== "" &&
                      formDataOne.name !== "" &&
                      formDataOne.matricule !== "" &&
                      formDataOne.module !== ""
                  );
                }}
              >
                Confirmer
              </button>

              <button
                className="button-submit"
                type="submit"
                onClick={handleCloseOneProfModal}
              >
                Annuler
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </Box>
  );
 }

export default EnseignantPage;