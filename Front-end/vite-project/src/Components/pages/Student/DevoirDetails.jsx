import { useState, useEffect } from "react";

import "./DevoirDetails.css";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

function DevoirDetails() {
  const devoirData = {
    nom: "Devoir 1",
    instructions:
      "Instructions pour le devoir 1, Instructions pour le devoir 1 Instructions pour le devoir 1 Instructions pour le devoir 1 Instructions pour le devoir 1 Instructions pour le devoir 1 Instructions pour le devoir 1 Instructions pour le devoir 1 Instructions pour le devoir 1 Instructions pour le devoir 1 Instructions pour le devoir 1 ",
    fichierProf: "nom-du-fichier-prof.pdf",
    deadline: new Date("2024-05-20T23:59:59"), // Nom du fichier déposé par le prof
  };

  // État pour stocker les fichiers soumis par les étudiants
  const [fichiersSoumis, setFichiersSoumis] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [nouveauFichier, setNouveauFichier] = useState("");
  const [statutEvaluation, setStatutEvaluation] = useState("Non évalué");
  const [tempsRestant, setTempsRestant] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      const maintenant = new Date();
      const differenceEnMs = devoirData.deadline - maintenant;
      const jours = Math.floor(differenceEnMs / (1000 * 60 * 60 * 24));
      const heures = Math.floor(
        (differenceEnMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (differenceEnMs % (1000 * 60 * 60)) / (1000 * 60)
      );
      const secondes = Math.floor((differenceEnMs % (1000 * 60)) / 1000);
      setTempsRestant(
        `< Temps restant :${jours}j: ${heures}h: ${minutes}m:${secondes}s >`
      );

      if (differenceEnMs < 0) {
        clearInterval(interval);
        setTempsRestant("Terminé");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Fonction pour gérer le téléchargement du fichier par l'étudiant
  const handleUpload = () => {
    if (nouveauFichier !== "") {
      setFichiersSoumis([...fichiersSoumis, nouveauFichier]);
      setModalVisible(false);
      setNouveauFichier("");
      setStatutEvaluation("Non évalué");
    }
  };

  return (
    <div className="devoir-details">
      <div className="nomETdedline">
        <h1 className="devoir-details__nom">{devoirData.nom}</h1>
        <div className="devoir-details__compteur">
          <PendingActionsIcon></PendingActionsIcon>
          <span>{tempsRestant}</span>
        </div>
      </div>

      <div style={{display:'flex',flexDirection:'column'}}>
        <div className="devoir-details__instructions">
          <div
            className="consignes-title"
            style={{ fontWeight: "bold", color: "#000066" }}
          >
            Consignes :
          </div>
          <div className="devoir-instructions">{devoirData.instructions}</div>
         
          {devoirData.fichierProf && (
            <div className="devoir-details__fichier-prof">
              <a
                className="devoir-details__fichier-prof-link"
                href={devoirData.fichierProf}
                download
              >
                Télécharger
              </a>
            </div>
          
          )}
        </div>
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", width: "700px" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              className="devoir-details__ajouter-travail-button"
              onClick={() => setModalVisible(true)}
            >
              Ajouter votre travail
            </button>
            <span
              className={
                fichiersSoumis.length > 0
                  ? "devoir-details__status-terminé"
                  : "devoir-details__status-non-terminé"
              }
            >
              {fichiersSoumis.length > 0 ? "Terminé" : "Non terminé"}
            </span>
          </div>

          <div className="devoir-details__remises-fichiers">
            <table>
              <thead>
                <tr>
                  <th>Remises de fichiers</th>
                  <th>Statut de évaluation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {fichiersSoumis.length > 0
                      ? fichiersSoumis.join(", ")
                      : "Aucun fichier"}
                  </td>
                  <td>{statutEvaluation}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {modalVisible && (
            <div className="modal">
              <div
                className="modal-content"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <input
                  type="file"
                  onChange={(e) => setNouveauFichier(e.target.files[0].name)}
                />
                <div>
                  <button onClick={handleUpload}>Ajouter</button>
                  <button onClick={() => setModalVisible(false)}>
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    
  );
}

export default DevoirDetails;
