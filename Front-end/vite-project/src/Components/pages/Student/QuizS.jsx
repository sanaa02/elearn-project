/* eslint-disable no-unused-vars */
import  {useContext, useState } from "react";

import "../Enseignant/Quiz.css";

class QuestionContainer {
  constructor(question, note, responses, selectedResponses) {
    this.question = question;
    this.note = note;
    this.responses = responses;
    this.selectedResponses = selectedResponses || [];
  }
}

const Quiz = () => {
   
  const [questions, setQuestions] = useState([]);
  const [selectedResponses, setSelectedResponses] = useState([]);
  const [fixedDate, setFixedDate] = useState("2024-05-17");

  const exampleQuestions = [
    new QuestionContainer("Quelle est la capitale de la France ?", "10/100", [
      "Paris",
      "Madrid",
      "Rome",
      "Berlin",
    ]),
    new QuestionContainer("Quel est le plus grand océan du monde ?", "20/100", [
      "L'océan Atlantique",
      "L'océan Pacifique",
      "L'océan Indien",
      "L'océan Arctique",
    ]),
    new QuestionContainer("Qui a peint la Joconde ?", "30/100", [
      "Leonardo da Vinci",
      "Pablo Picasso",
      "Vincent van Gogh",
      "Michel-Ange",
    ]),
    new QuestionContainer("Quel est le plus haut sommet du monde ?", "10/100", [
      "Mont Everest",
      "Mont Kilimandjaro",
      "Mont McKinley",
      "Mont Blanc",
    ]),
    new QuestionContainer(
      "Quelle est la formule chimique de l'eau ?",
      "40/100",
      ["H2O", "CO2", "NaCl", "CH4"]
    ),
  ];

  const handleCheckboxChange = (questionIndex, responseIndex) => {
    setSelectedResponses((prevSelectedResponses) => {
      const updatedResponses = [...prevSelectedResponses];
      if (!updatedResponses[questionIndex]) {
        updatedResponses[questionIndex] = [];
      }

      if (updatedResponses[questionIndex].includes(responseIndex)) {
        updatedResponses[questionIndex] = updatedResponses[questionIndex].filter(
          (index) => index !== responseIndex
        );
      } else {
        updatedResponses[questionIndex].push(responseIndex);
      }

      return updatedResponses;
    });
  };

  return (
    <div>
      <div className="quiz-title">Quiz 1</div>

      <div className="page-button-container"></div>

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
                      style={{ display: "flex", alignContent: "space-between" }}
                    >
                      <div
                        className="reponses-list-item"
                        style={{ width: "100%" }}
                      >
                        {response}
                      </div>
                      <input
                        type="checkbox"
                        className="reponse-checkbox"
                        name={`checkbox-${index}-${idx}`}
                        checked={
                          selectedResponses[index] &&
                          selectedResponses[index].includes(idx)
                        }
                        onChange={() => handleCheckboxChange(index, idx)}
                        style={{ width: "20px" }}
                      />
                    </li>
                  ))}
                </ul>
            
              </div>
            </li>
          ))}
        </ol>
        <div className="deadline-container">
          <div className="deadline-title">Dernier délai</div>
          <input type="date" className="deadline" value={fixedDate} readOnly />
        </div>
        <button className="partager">Enregistrer</button>
      </form>
    </div>
  );
};

export default Quiz;
