import { useEffect, useState } from "react";
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
import "./M.css";

function createData(
  n,
  id,
  name,
  enseignant,
  promo,
  coefficient,
  description,
  actions
) {
  return { n, id, name, enseignant, promo, coefficient, description, actions };
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
  const [selectedYearOne, setSelectedYearOne] = useState("");
  const [selectedPromo, setSelectedPromo] = useState("");
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [profs, setProfs] = useState([]);
  const [selectedProf, setSelectedProf] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const [formData, setFormData] = useState({
    nomModule: "",
    enseignant: "",
    coefficient: "",
    promo: "",
    description: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (Empty) => {
    if (Empty == true) {
      const newRow = createData(
        // rows.length + 1,
        rows.length + 1,
        formData.nomModule,
        formData.enseignant,
        formData.promo,
        formData.coefficient,

        formData.description
      );

      setRows([...rows, newRow]);
      setShowModal(false);
      setFormData({
        nomModule: "",
        enseignant: "",
        coefficient: "",
        promo: "",
        description: "",
      });
    }

    const formDataAdd = new FormData();

    formDataAdd.append("nom", formData.nomModule);
    formDataAdd.append("year", selectedYear);
    formDataAdd.append("coef", formData.coefficient);
    formDataAdd.append("description", formData.description);
    formDataAdd.append("semester", formData.SelectOption);
    formDataAdd.append("professor", selectedProf);
    for (let [key, value] of formDataAdd.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/module/", {
        method: "POST",
        body: formDataAdd,
      });
    } catch (error) {
      console.error("Error uploading file:", error);
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

  const handleUploadCohort = async () => {
    console.log("Fichier de cohorte chargé :", cohortFile);

    setOpenLotModal(false);

    const formDataFile = new FormData();
    formDataFile.append("file", cohortFile);
    for (let [key, value] of formDataFile.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/module/upload/", {
        method: "POST",
        body: formDataFile,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // const blob = await response.blob();
      // const url = window.URL.createObjectURL(blob);
      // const a = document.createElement("a");
      // a.style.display = "none";
      // a.href = url;
      // a.download = `student_passwords_${selectedYear}.csv`;
      // document.body.appendChild(a);
      // a.click();
      // window.URL.revokeObjectURL(url);

      // const result = await response.json();
      console.log("Upload successful:", result);
      setOpenLotModal(false);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
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
    fetchProf();
  }, []);

  const fetchData = async () => {
    try {
      // Make API call using fetch
      const response = await fetch("http://127.0.0.1:8000/module/");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json(); // Parse JSON response
      console.log("Fetched data:", data);

      // Process the data and create rows
      //  , index
      const processedData = data.map((item, index) => {
        return createData(
          index + 1,
          item.id,
          item.nom,

          item.professor,

          item.year,
          item.coef,

          item.description
        );
      });

      console.log("processed data ", processedData);

      // Update state with the fetched rows
      setRows(processedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchProf = async () => {
    try {
      // Make API call using fetch
      const response = await fetch("http://127.0.0.1:8000/professor/");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json(); // Parse JSON response
      console.log("Fetched professors:", data);
      setProfs(data);

      // Process the data and create rows
      //  const processedData = data.map((item, index) => {
      //    return createData(
      //      index + 1,
      //      item.email,
      //      item.matricule,
      //      item.name,
      //      item.description
      //    );
      //  });

      //  console.log(processedData);

      //  // Update state with the fetched rows
      //  setRows(processedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleOptionSelect = (option) => {
    if (option === "insertion par lot") {
      setOpenNewModuleModal(false);
      setOpenLotModal(true); // Ouvrir le modal d'insertion par lot
    } else {
      console.log("Option sélectionnée :", option);
      setOpenNewModuleModal(false);
    }

    // const fetchData = async () => {
    //   try {
    //     // Make API call using fetch
    //     const response = await fetch("http://127.0.0.1:8000/student/");
    //     if (!response.ok) {
    //       throw new Error("Failed to fetch data");
    //     }
    //     const data = await response.json(); // Parse JSON response
    //     console.log("Fetched data:", data);

    //     // Process the data and create rows
    //     const processedData = data.map((item, index) => {
    //       return createData(
    //         index + 1,
    //         item.user.matricule,
    //         item.year,
    //         item.user.name,
    //         item.user.email
    //       );
    //     });

    //     console.log(processedData);

    //     // Update state with the fetched rows
    //     setRows(processedData);
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // };
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
              {/* <TableCell sx={{ textAlign: "center" }}>N°</TableCell> */}
              <TableCell sx={{ textAlign: "center" }}>ID</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Nom</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Enseignant</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Promo</TableCell>
              <TableCell sx={{ textAlign: "center" }}>coefficient</TableCell>
              {/* <TableCell sx={{ textAlign: "center" }}>Description</TableCell> */}
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
                  {row.id}
                </TableCell>
                {/* <TableCell style={{ textAlign: "center" }}>{row.id}</TableCell> */}
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
                {/* <TableCell style={{ textAlign: "center" }}>
                  {row.description}
                </TableCell>  */}

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
              `Voulez-vous vraiment supprimer Module : ${selectedRow.name} ?.`}
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
            background: "white",
            borderRadius: "15px",
          }}
        >
          <h2
            id="modal-title"
            style={{ color: "#000066", marginBottom: "40px" }}
          >
            Modifier Module
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
              placeholder="Nom"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              style={{
                marginBottom: "8px",
                width: "60%",
                padding: "8px",
                border: "1px solid #000066",
                borderRadius: "4px",
              }}
            />
            <input
              type="text"
              placeholder="Enseignant"
              value={editedEnseignant}
              onChange={(e) => setEditedEnseignant(e.target.value)}
              style={{
                marginBottom: "8px",
                width: "60%",
                padding: "8px",
                border: "1px solid #000066",
                borderRadius: "4px",
              }}
            />
            <input
              type="text"
              placeholder="Promo"
              value={editedPromo}
              onChange={(e) => setEditedPromo(e.target.value)}
              style={{
                marginBottom: "8px",
                width: "60%",
                padding: "8px",
                border: "1px solid #000066",
                borderRadius: "4px",
              }}
            />
            <input
              type="text"
              placeholder="Coefficient"
              value={editedcoefficient}
              onChange={(e) => setEditedcoefficient(e.target.value)}
              style={{
                marginBottom: "8px",
                width: "60%",
                padding: "8px",
                border: "1px solid #000066",
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
      <Modal
        open={openLotModal}
        onClose={() => setOpenLotModal(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box className="lot-modal">
          <Typography variant="h5" gutterBottom>
            Ajouter des modules par lots
          </Typography>
          <form>
            <div className="file-container">
              <input
                required
                className="file"
                type="file"
                accept=".csv"
                onChange={(e) => setCohortFile(e.target.files[0])}
              />
              <div className="file-place">
                {cohortFile
                  ? cohortFile.name
                  : "ajouter des modules par lot/fichie csv"}
              </div>
            </div>
          </form>
          <div className="button-container">
            <Button onClick={() => setOpenLotModal(false)} autoFocus>
              Annuler
            </Button>
            <Button onClick={handleUploadCohort} autoFocus>
              Confirmer
            </Button>
          </div>
        </Box>
      </Modal>
      <Modal open={showModal} onClose={handleCloseModal}>
        <Box className="Modal-seul-module">
          <Typography variant="h5" gutterBottom>
            Ajouter un seule module
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
              <input
                required
                type="text"
                placeholder="Coefficient"
                name="coefficient"
                value={formData.coefficient}
                onChange={handleInputChange}
              />

              {/* <div className="file-container">
                <div>
                  {cohortFile ? cohortFile.name : "Ajouter des etudiants"}
                </div>
                <input
                  className="file"
                  type="file"
                  accept=".csv"
                  onChange={(e) => setCohortFile(e.target.files[0])}
                />
              </div> */}
              <input
                required
                type="text"
                placeholder="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
              {/* <input
                required
                type="text"
                placeholder="Matricule"
                name="Matricule"
                value={formData.Matricule}
                onChange={handleInputChange}
              /> */}
              <select
                required
                name="SelectOption"
                value={formData.SelectOption}
                onChange={handleInputChange}
              >
                <option value="semestre 1">semestre 1</option>
                <option value="semestre 2">semestre 2</option>
              </select>
              <Select
                className="year-select"
                value={selectedProf}
                onChange={(e) => setSelectedProf(e.target.value)}
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
                <MenuItem value="">Enseignant</MenuItem>
                {profs.map((prof) => (
                  <MenuItem key={prof.id} value={prof.email}>
                    {prof.email}
                  </MenuItem>
                ))}
              </Select>
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
                  className="button-submit"
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
