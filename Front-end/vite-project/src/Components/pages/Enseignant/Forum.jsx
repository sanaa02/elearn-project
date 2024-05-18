/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
//import Likes from "./Likes";
import "../Enseignant/Forum.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import ReplayIcon from "@mui/icons-material/Replay";
import { Divider } from "@mui/material";
import { FaRegComment } from "react-icons/fa";

const Forum = () => {
  ////////////////////////////////////////////////////
  const navigate = useNavigate();
  const [thread, setThread] = useState("");

  // useEffect(() => {
  //   const checkUser = () => {
  //     if (!localStorage.getItem("_id")) {
  //       navigate("/");
  //     } else {
  //       fetch("http://localhost:4000/api/all/threads")
  //         .then((res) => res.json())
  //         .then((data) => setThreadList(data.threads))
  //         .catch((err) => console.error(err));
  //     }
  //   };
  //   checkUser();
  // }, [navigate]);

  // const createThread = () => {
  //   fetch("http://localhost:4000/api/create/thread", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       thread,
  //       userId: localStorage.getItem("_id"),
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       alert(data.message);
  //       setThreadList(data.threads);
  //     })
  //     .catch((err) => console.error(err));
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   createThread();
  //   setThread("");
  // };

  // const handleThreadClick = (threadId) => {
  //   setSelectedThread(threadId);
  //   navigate(`/${threadId}/replies`); // Naviguer vers la page Replies avec l'ID du thread
  // };

  const handleAddComment = (threadId) => {
    navigate(`/${threadId}/replies`);
    console.log(threadId);
  };
  //// //////////////////////////////////////////////////////////////////////
  const [threadList, setThreadList] = useState([
    {
      id: 1,
      title: "Premier thread ",
      name: "Mr kechar",
      replies: [
        {
          id: 1,
          text: "Première réponse au premier thread",
          name: "Mr kechar",
          date: "00:00 , 24/05/2023",
        },
        {
          id: 2,
          text: "Deuxième réponse au premier thread",
          name: "Mr kechar",
          date: "00:00 , 24/05/2023",
        },
      ],
      date: "00:00 , 24/05/2023",
    },
    {
      id: 2,
      title: "Deuxième thread",
      userId: 2,
      name: "Mr kechar",
      replies: [
        {
          id: 1,
          text: "Première réponse au deuxième thread",
          name: "Mr kechar",
          date: "00:00 , 24/05/2023",
        },
        {
          id: 2,
          text: "Deuxième réponse au deuxième thread",
          name: "Mr kechar",
          date: "00:00 , 24/05/2023",
        },
      ],
      date: "00:00 , 24/05/2023",
    },
    {
      id: 3,
      title: "Troisième thread",
      userId: 3,
      name: "Mr kechar",
      replies: [
        {
          id: 1,
          text: "Première réponse au troisième thread",
          name: "Mr kechar",
          date: "00:00 , 24/05/2023",
        },
        {
          id: 2,
          text: "Deuxième réponse au troisième thread",
          name: "Mr kechar",
          date: "00:00 , 24/05/2023",
        },
        {
          id: 3,
          text: "Troisième réponse au troisième thread",
          name: "Mr kechar",
          date: "00:00 , 24/05/2023",
        },
      ],
      date: "00:00 , 24/05/2023",
      
    },
    {
      id: 4,
      title: "quatrième thread",
      userId: 4,
      name: "Mr kechar",
      replies: [
        {
          id: 1,
          text: "Première réponse au troisième thread",
          name: "Mr kechar",
          date: "00:00 , 24/05/2023",
        },
        {
          id: 2,
          text: "Deuxième réponse au troisième thread",
          name: "Mr kechar",
          date: "00:00 , 24/05/2023",
        },
        {
          id: 3,
          text: "Troisième réponse au troisième thread",
          name: "Mr kechar",
          date: "00:00 , 24/05/2023",
        },
      ],
      date: "00:00 , 24/05/2023",
    },
    {
      id: 5,
      title: "cinqième thread",
      userId: 3,
      name: "Mr kechar",
      replies: [
        {
          id: 1,
          text: "Première réponse au troisième thread",
          name: "Mr kechar",
          date: "00:00 , 24/05/2023",
        },
        {
          id: 2,
          text: "Deuxième réponse au troisième thread",
          name: "Mr kechar",
          date: "00:00 , 24/05/2023",
        },
        {
          id: 3,
          text: "Troisième réponse au troisième thread",
          name: "Mr kechar",
          date: "00:00 , 24/05/2023",
        },
      ],
      date: "00:00 , 24/05/2023",
    },
    {
      id: 6,
      title: "cinqième thread",
      userId: 3,
      name: "Mr kechar",
      replies: [
        {
          id: 1,
          text: "Première réponse au troisième thread",
          name: "Mr kechar",
          date: "00:00 , 24/05/2023",
        },
        {
          id: 2,
          text: "Deuxième réponse au troisième thread",
          name: "Mr kechar",
          date: "00:00 , 24/05/2023",
        },
        {
          id: 3,
          text: "Troisième réponse au troisième thread",
          name: "Mr kechar",
          date: "00:00 , 24/05/2023",
        },
      ],
      date: "00:00 , 24/05/2023",
    },
    {
      id: 7,
      title: "cinqième thread",
      userId: 3,
      name: "Mr kechar",
      replies: [
        {
          id: 1,
          text: "Première réponse au troisième thread",
          name: "Mr kechar",
          date: "00:00 , 24/05/2023",
        },
        {
          id: 2,
          text: "Deuxième réponse au troisième thread",
          name: "Mr kechar",
          date: "00:00 , 24/05/2023",
        },
        {
          id: 3,
          text: "Troisième réponse au troisième thread",
          name: "Mr kechar",
          date: "00:00 , 24/05/2023",
        },
      ],
      date: "00:00 , 24/05/2023",
    },
  ]);
  ////////////////////////////////////////////////////
  const [reply, setReply] = useState("");
  const [title, setTitle] = useState("");

  const { id } = useParams();
  const addReply = () => {};

  ////////////////////////////////////////////////////

  const [selectedThreadId, setSelectedThreadId] = useState(null); // État pour stocker l'ID de l'élément sélectionné

  const toggleReplies = (threadId) => {
    setSelectedThreadId((prevId) => (prevId === threadId ? null : threadId)); // Met à jour l'ID de l'élément sélectionné
  };

  ////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      {/* <Nav /> */}

      <main className="Forum">
        <div
          className="ForumTitle"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            marginBottom: "30px",
            width: "70%",
          }}
        >
          <h2 className="homeTitle">Espace Réseaux 1</h2>
          <Divider />
        </div>

        <div className="thread__container">
          {threadList.map((thread) => (
            <div key={thread.id}>
              <div className="thread-user">
                <p style={{ fontWeight: "bold" }}>{thread.name}</p>
              </div>
              <div className="thread__item">
                <p
                  style={{
                    background: "white",
                    wordWrap: "break-word",
                    maxWidth: "90%",
                  }}
                >
                  {thread.title}
                </p>

                <div
                  className="react__container"
                  style={{ background: "white" }}
                >
                  <div onClick={() => toggleReplies(thread.id)}>
                    <FaRegComment
                      style={{
                        color: "#000066",
                        cursor: "pointer",
                        width: "40px",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="thread-date">{thread.date}</div>
              {selectedThreadId === thread.id && (
                <div className="replay_box" style={{ marginTop: "20p" }}>
                  {thread.replies.map((reply) => (
                    <div key={reply.id}>
                      <div className="react__container">
                        <p style={{ fontWeight: "bold" }}>{reply.name}</p>
                      </div>
                      <div className="reply__item">
                        <div className="replay__item">
                          <p
                            style={{
                              background: "white",
                              wordWrap: "break-word",
                              maxWidth: "100%",
                            }}
                          >
                            {reply.text}
                          </p>
                        </div>
                        
                      </div>
                      <div className="replay-date">{reply.date}</div>
                    </div>
                  ))}
                  <form
                    className="homeForm" //</main>onSubmit={handleSubmitReply}
                  >
                    <div className="home__container">
                      <div className="replyInput">
                        <input
                          className="replyinput"
                          placeholder="Ajouter une réponse"
                          value={reply}
                          onChange={(e) => setReply(e.target.value)}
                          type="text"
                          name="reply"
                          required
                          style={{
                            marginLeft: "0px",
                            background: "white",
                            width: "100%",
                          }}
                        />
                        <SendIcon style={{ color: "#000066" }}></SendIcon>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
          ))}
          <div
            className="vide"
            style={{
              height: "115px",
              background: "#f1f5f9",
              border: "none",
              width: "100vw",
              position: "fixed",
              bottom: "0%",
              outline: "none",
            }}
          ></div>
          <form className="ForumForm">
            <div className="messageInput">
              <input
                placeholder="Ajouter un message"
                type="text"
                name="thread"
                required
                value={thread}
                onChange={(e) => setThread(e.target.value)}
                style={{
                  marginLeft: "0px",
                  background: "white",
                  width: "100%",
                }}
              />

              <SendIcon style={{ color: "#000066" }}></SendIcon>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Forum;
