/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import '../Enseignant/listForum.css'
import Divider from "@mui/material/Divider";
import { Link, useParams } from 'react-router-dom';


const Forum = () => {
  const [forumList, setForumList] = useState([
    {
      id: 1,
      title: "Espaces Réseaux",
      description:
        "Espace Réseaux est un espace de communication destinée aux 1Cs Espace Réseaux est un espace de communication destinée aux 1Cs Espace Réseaux est un espace de communication destinée aux 1Cs  ",
      

      messagesNumber: 30,
    },
    {
      id: 2,
      title: "Espaces Réseaux",
      description:
        "Espace Réseaux est un espace de communication destinée aux 1Cs Espace Réseaux est un espace de communication destinée aux 1Cs Espace Réseaux est un espace de communication destinée aux 1Cs  ",
     
      messagesNumber: 30,
    },
    {
      id: 5,
      title: "Espaces Réseaux",
      description:
        "Espace Réseaux est un espace de communication destinée aux 1Cs Espace Réseaux est un espace de communication destinée aux 1Cs Espace Réseaux est un espace de communication destinée aux 1Cs  ",

      messagesNumber: 30,
    },
    {
      id: 3,
      title: "Espaces Réseaux",
      description:
        "Espace Réseaux est un espace de communication destinée aux 1Cs Espace Réseaux est un espace de communication destinée aux 1Cs Espace Réseaux est un espace de communication destinée aux 1Cs  ",
     
      messagesNumber: 30,
    },
    {
      id: 4,
      title: "Espaces Réseaux",
      description:
        "Espace Réseaux est un espace de communication destinée aux 1Cs Espace Réseaux est un espace de communication destinée aux 1Cs Espace Réseaux est un espace de communication destinée aux 1Cs  ",
   
      messagesNumber: 30,
    },
  ]);

  return (
    <div>
      <h1 className="forumPageTitle">Forums</h1>
      <Divider
        style={{ color: "#00194F33", width: "89%", marginLeft: "20px" }}
      ></Divider>
      <div className="forum-list-container">
        {forumList.map((forum) => (
          <div className="forum-item-container" key={forum.id}>
             
             <Link to={`/StudentPage/Forums/${forum.id}`} className='link-chapitre' > 
             
          


            <div className="forum-item-left">
              <div className="forum-item-title">{forum.title}</div>
              <div className="forum-item-description">
                <p> {forum.description}</p>
              </div>
            </div>
</Link>
          
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forum;