/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
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
import './a.css'

function createData(id, matricule, name, email, promo, actions) {
  return { id, matricule, name, email, promo, actions };
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
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedYearOne, setSelectedYearOne] = useState("");
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
  const [years, setYears] = useState([]);
  //////////////////////////////////////////////ajouter un seul etudiant////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [showOneStudentModal, setShowOneStudentModal] = useState(false);
  const [formData, setFormData] = useState({
    mail: "",
    promo: "",
    nomp: "",
    cohorte: "",
    Matricule: "",
  });

  const [formDataOne, setFormDataOne] = useState({
    email: "",
    promo: "",
    nom: "",
    matricule: "",
    role:"student"
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
const handleInputChangeOne = (e) => {
  const { name, value } = e.target;
  setFormDataOne({
    ...formDataOne,
    [name]: value,
  });
};
  const handleSubmit = async  (Empty) => {
    if (Empty == true) {
    }

    const formDataAdd = new FormData();
    formDataAdd.append("email", formDataOne.email);
    formDataAdd.append("matricule", formDataOne.matricule);
    formDataAdd.append("name", formDataOne.nom);
    formDataAdd.append("year", selectedYearOne);
    formDataAdd.append("role", formDataOne.role);
    for (let [key, value] of formDataAdd.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/account/register/",
        {
          method: "POST",
          body: formDataAdd,
        }
      );
    } catch (error) {
      console.error("Error uploading file:", error);
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
 
if (option === "insertion par lot") {
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
      row.email.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedPromo === "" || row.year === selectedPromo)
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

  useEffect(() => {
    // Fetch the list of years from the backend
    const fetchYears = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/module/years/");
        const data = await response.json();
        setYears(data);
        console.log("Years fetched:", data);
        
      } catch (error) {
        console.error("Error fetching years:", error);
      }
    };

    fetchYears();
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Make API call using fetch
      const response = await fetch("http://127.0.0.1:8000/student/");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json(); // Parse JSON response
      console.log("Fetched data:", data);

      // Process the data and create rows
      const processedData = data.map((item, index) => {
        return createData(

          item.user.id,
          item.user.matricule,
          item.user.name,
          item.user.email,

          item.year,

          // index + 1,
        );
      });

      console.log(processedData)

      // Update state with the fetched rows
      setRows(processedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleUploadCohort = async () => {
    // Gérer l'envoi du fichier de la cohorte
    console.log("Nom de la cohorte :", cohortName);
    console.log("Promotion sélectionnée :", selectedYear);
    console.log("Fichier de la cohorte :", cohortFile);

    // if (!selectedPromo || !cohortFile) {
    //   alert("Please select a promo and a file.");
    //   return;
    // }

    // setSelectedPromo()

    const formData = new FormData();
    formData.append("year", selectedYear);
    formData.append("file", cohortFile);
     for (let [key, value] of formData.entries()) {
       console.log(`${key}: ${value}`);
     }

    try {
      const response = await fetch("http://127.0.0.1:8000/student/upload/", {
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
          {years.map((promo) => (
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
              <TableCell sx={{ textAlign: "center" }}>ID</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Matricule</TableCell>

              <TableCell sx={{ textAlign: "center" }}>Nom et Prénom</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Email</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Année</TableCell>
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
                {/* <TableCell
                  component="th"
                  scope="row"
                  style={{ textAlign: "center" }}
                >
                  {row.n}
                </TableCell> */}
                <TableCell style={{ textAlign: "center" }}>{row.id}</TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {row.matricule}
                </TableCell>

                <TableCell style={{ textAlign: "center" }}>
                  {row.name}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {row.email}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {row.promo}
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
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 280,
            height: 150,
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
              `Voulez-vous vraiment supprimer l'apprenant : ${selectedRow.name} ?.`}
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
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "15px",
          }}
        >
          <h2
            id="modal-title"
            style={{ color: "#000066", marginBottom: "50px" }}
          >
            Modifier apprenant
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
            Confirmer
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

      <Modal open={openLotModal} onClose={() => setOpenLotModal(false)}>
        <Box className="modal-lot">
          <Typography variant="h5" gutterBottom>
            Ajouter des apprenants par fichier csv
          </Typography>
          <form>
            {/* <input
              type="text"
              value={selectedPromo}
              onChange={(e) => setSelectedPromo(e.target.value)}
              placeholder="Promo"
            /> */}
            {/* ///sanaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa */}
            {/* <Select
              value={selectedPromo}
              onChange={(e) => setSelectedPromo(e.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Year
              </MenuItem>
              {years.map((year) => (
                <MenuItem key={promo.value} value={promo.value}>
                  {promo.label}
                </MenuItem>
              ))}
            </Select> */}

            <Select
              className="year-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              sx={{
                margin: "20px",
                backgroundColor: "#D9D9D9",
                borderRadius: "5px",
                paddingLeft: "5px",
                paddingRight: "5px",
                height: "40px",
                width: "350px",
                position: "relative",
                marginBottom: "10px",
              }}
              size="small"
            >
              <MenuItem value="">Année</MenuItem>
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>

            <div className="file-container">
              <input
                type="file"
                accept=".csv"
                onChange={(e) => setCohortFile(e.target.files[0])}
              />
              <div className="file-place">
                {cohortFile ? cohortFile.name : "Ajouter des etudiants"}
              </div>
            </div>
          </form>
          <div className="button-container">
            <Button
              onClick={() => handleUploadCohort(selectedPromo, cohortFile)}
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
                name="email"
                value={formDataOne.email}
                onChange={handleInputChangeOne}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    document.getElementsByName("promo")[0].focus();
                  }
                }}
              />
              {/* <input
                type="text"
                placeholder="Promo"
                required
                name="promo"
                value={formDataOne.promo}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    document.getElementsByName("nomp")[0].focus();
                  }
                }}
              /> */}
              <Select
                className="year-select"
                value={selectedYearOne}
                onChange={(e) => setSelectedYearOne(e.target.value)}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                sx={{
                  margin: "20px",
                  backgroundColor: "#D9D9D9",
                  borderRadius: "5px",
                  paddingLeft: "5px",
                  paddingRight: "5px",
                  height: "40px",
                  width: "350px",
                  position: "relative",
                  marginBottom: "10px",
                }}
                size="small"
              >
                <MenuItem value="">Année</MenuItem>
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
              <input
                required
                type="text"
                placeholder="Nom et prenom"
                name="nom"
                value={formDataOne.nom}
                onChange={handleInputChangeOne}
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
                placeholder="Matricule"
                name="matricule"
                value={formDataOne.matricule}
                onChange={handleInputChangeOne}
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
                      formDataOne.email !== "" &&
                        formDataOne.matricule !== "" &&
                        formDataOne.promo !== "" &&
                        formDataOne.nom !== ""
                    );
                  }}
                >
                  Confirmer
                </button>

                <button
                  type="submit"
                  onClick={handleCloseModal}
                  className="button-submit"
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
