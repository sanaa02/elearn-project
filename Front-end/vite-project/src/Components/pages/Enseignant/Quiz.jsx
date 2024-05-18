/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import './Quiz.css'
//import Checkbox from "@mui/material/Checkbox";

class QuestionContainer {
  constructor(question, note, responses, selectedResponses) {
    this.question = question;
    this.note = note;
    this.responses = responses;
    this.selectedResponses = selectedResponses || [];
  }
}

const Quiz = () => {
  const [showOneStudentModal, setShowOneStudentModal] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newNote, setNewNote] = useState("");
  const [newResponses, setNewResponses] = useState(["", "", "", ""]);
  const [selectedResponses, setSelectedResponses] = useState([]);

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;

    if (type === "checkbox") {
      const index = parseInt(name.split("-")[1]);
      const updatedSelectedResponses = [...selectedResponses];
      if (event.target.checked) {
        updatedSelectedResponses.push(index);
      } else {
        const selectedIndex = updatedSelectedResponses.indexOf(index);
        if (selectedIndex !== -1) {
          updatedSelectedResponses.splice(selectedIndex, 1);
        }
      }
      setSelectedResponses(updatedSelectedResponses);
    } else {
      if (name === "question") setNewQuestion(value);
      else if (name === "note") setNewNote(value);
      else {
        const updatedResponses = [...newResponses];
        updatedResponses[Number(name)] = value;
        setNewResponses(updatedResponses);
      }
    }
  };

  const addQuestion = () => {
    if (newQuestion.trim() !== "" && newNote.trim() !== "") {
      const allResponsesFilled = newResponses.every(
        (response) => response.trim() !== ""
      );
      if (allResponsesFilled) {
        const question = new QuestionContainer(
          newQuestion,
          newNote,
          newResponses,
          selectedResponses
        );
        setQuestions([...questions, question]);
        setNewQuestion("");
        setNewNote("");
        setNewResponses(["", "", "", ""]);
        setSelectedResponses([]);
        handleCloseModal();
      } else {
        alert("Veuillez remplir toutes les réponses.");
      }
    } else {
      alert("Veuillez remplir la question et la note.");
    }
  };

  const handleOpenOneStudentModal = () => {
    setShowOneStudentModal(true);
  };

  const handleCloseModal = () => {
    setShowOneStudentModal(false);
  };
  /////////////////////////////////////////////
  const handlePratager = (inputValue, list) => {
    if (inputValue.trim() !== "" && list.length > 0) {
      // Si l'input n'est pas vide et que la liste n'est pas vide
      console.log("L'input est rempli et la liste n'est pas vide.");
      // Vous pouvez ajouter d'autres actions ici
    } else {
      // Si l'une des conditions n'est pas remplie, afficher une alerte
      alert("Veuillez remplir les champs.");
      // Vous pouvez ajouter d'autres actions ici, si nécessaire
    }
  };
  

  // Exemples de questions
  const exampleQuestions = [
    new QuestionContainer(
      "Quelle est la capitale de la France ?",
      "10/10",
      ["Paris", "Madrid", "Rome", "Berlin"]
    ),
    new QuestionContainer(
      "Quel est le plus grand océan du monde ?",
      "5/5",
      ["L'océan Atlantique", "L'océan Pacifique", "L'océan Indien", "L'océan Arctique"]
    ),
    new QuestionContainer(
      "Qui a peint la Joconde ?",
      "8/8",
      ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michel-Ange"]
    ),
    new QuestionContainer(
      "Quel est le plus haut sommet du monde ?",
      "7/7",
      ["Mont Everest", "Mont Kilimandjaro", "Mont McKinley", "Mont Blanc"]
    ),
    new QuestionContainer(
      "Quelle est la formule chimique de l'eau ?",
      "9/9",
      ["H2O", "CO2", "NaCl", "CH4"]
    ),
  ];
  const [inputValue, setInputValue] = useState("");

  return (
    <div>
      <div className="quiz-title">Quiz 1</div>
     
      <div className="page-button-container">
      <button className="add-question" onClick={handleOpenOneStudentModal}>
        <AddIcon style={{ color: "white" }} />
        Ajouter question
      </button>
     
      </div>
      
      <Modal open={showOneStudentModal} onClose={handleCloseModal}>
        <Box className="Modal-add-question">
          <Typography variant="h5" gutterBottom>
            Ajouter une question
          </Typography>
          <form>
            <div className="questionETnote">
              <label>Entrer votre question:</label>
              <label>Note:</label>
            </div>
            <div className="questionETnote-input">
              <input
                required
                type="text"
                className="question-text"
                name="question"
                placeholder="Entrer votre question ici"
                value={newQuestion}
                onChange={handleInputChange}
              />
              <input
                required
                type="text"
                className="note-text"
                name="note"
                placeholder="note/100"
                value={newNote}
                onChange={handleInputChange}
              />
            </div>
            <div className="reponse-inputs">
              {newResponses.map((response, index) => (
                <div className="reponse-zone" key={index}>
                  <input
                    type="text"
                    className="reponse-text"
                    placeholder={`Réponse ${index + 1}`}
                    name={index.toString()}
                    value={response}
                    onChange={handleInputChange}
                  />
                  <input
                    type="checkbox"
                    className="reponse-checkbox"
                    name={`checkbox-${index}`}
                    checked={selectedResponses.includes(index)}
                    onChange={handleInputChange}
                    style={{ width: "20px" }}
                  />
                </div>
              ))}
            </div>
            <div className="button-container">
              <button className="sumbit-button" onClick={addQuestion}>
                Confirmer
              </button>
              <button className="sumbit-button" onClick={handleCloseModal}>
                Annuler
              </button>
            </div>
          </form>
        </Box>
      </Modal>
      <form>

      <ol className="questions-list">
        {[...questions, ...exampleQuestions].map((question, index) => (
          <li key={index}>
            <div className="Question-affichage">
              <div className="afficher-question-titre">
                <span style={{ fontWeight: "bold", color: "#000066" }}>
                  Question {index + 1}:
                </span>
              </div>
              <div className="afficher-note">
                <span style={{ fontWeight: "bold", color: "#000066" }}>
                  Note:
                </span>{" "}
                {question.note}
              </div>
            </div>
            <div className="afficher-question">{question.question}</div>
            <div>
              <span
                className="afficher-reponse"
                style={{ fontWeight: "bold", color: "#000066" }}
              >
                Réponses
              </span>
              <ul className="reponses-list" style={{ marginBottom: "50px" }}>
                {question.responses.map((response, idx) => (
                  <li
                    key={idx}
                    className={`reponses-list-item ${
                      question.selectedResponses.includes(idx)
                        ? "selected-response"
                        : ""
                    }`}
                  >
                    {response}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
      <div className="deadline-container">
        <div className="deadline-title">Dernier délai</div>
        <input 
        required
            type="date"
            className="deadline"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
      </div>
      <button className="partager"
          onClick={() => handlePratager(questions, inputValue)} >
        Partager
      </button>
      </form>
    
    </div>
  );
};

export default Quiz;
