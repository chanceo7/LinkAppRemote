import React, { useState, useContext, useEffect } from "react";

import io from "socket.io-client";
import "../chatBox/chat.css";
import axios from "axios";
import userData from "../form/usecontexts";
import Conversation from "./conversation";
import Search from "../form/search";

function Chat() {
  const info = useContext(userData);
  const [socket] = useState(() => io(":8080", { query: { id: info.user.id } }));
  const [conversation, setConversation] = useState([]);
  const [nomber, setNomber] = useState(0);

  const insert = () => {
    const data = {
      first_name: "chance",
      notification: nomber,
    };

    setConversation((prev) => {
      return [data, ...prev];
    });
    setNomber(nomber + 1);
    console.log(conversation);
  };

  const getConversation = () => {
    axios
      .get(`http://localhost:8080/api/get/conv/${info.user.id}`)
      .then((res) => {
        console.log(res.data);
        setConversation(res.data);
      });
  };

  const insertContact = (contact) => {
    setConversation((prev) => {
      return [contact[0], ...prev];
    });
  };

  useEffect(() => {
    getConversation();
  }, []);

  return (
    <div>
      <h1>Welcome {info.user.first_name}</h1>
      <Search lift={(cont) => insertContact(cont)} />
      <div className="chatbox">
        <button onClick={insert}>insert</button>
        <div className="conversation-container">
          {conversation.map((item, index) => {
            return <Conversation key={index + "c"} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Chat;
