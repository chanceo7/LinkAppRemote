import React, { useState, useContext, useEffect } from "react";

import io from "socket.io-client";
import "../chatBox/chat.css";
import axios from "axios";
import userData from "../form/usecontexts";
import Conversation from "./conversation";
import Search from "../form/search";
import Chatwrappe from "./chatwrappe";

function Chat() {
  const info = useContext(userData);
  const [socket] = useState(() => io(":8080", { query: { id: info.user.id } }));
  const [conversation, setConversation] = useState([]);
  const [nomber, setNomber] = useState(0);
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const [contact, setContact] = useState({});
  const [render, setRender] = useState([]);

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
        res.data ? setConversation(res.data) : setConversation([]);
      });
  };

  const insertContact = (contact) => {
    setConversation((prev) => {
      return [contact[0], ...prev];
    });
  };

  const clearNotification = () => {
    let index = sessionStorage.getItem("index");
    let notification = sessionStorage.getItem("notification");
    if (notification == 0) {
      return;
    }
    const data = conversation;
    data[index].notification = 0;
    setConversation([...data]);
  };

  const getMessages = (receiver_id, sender_id) => {
    axios
      .get(
        `http://localhost:8080/api/load/messages/${receiver_id}/${sender_id}`
      )
      .then((res) => {
        res.data ? setMessages(res.data) : setMessages([]);
      });
  };

  useEffect(() => {
    let receiver = sessionStorage.getItem("receiver");
    received && getMessages(receiver, info.user.id);
    getConversation();
  }, [render]);

  let received = [];
  socket.on("message received", (data) => {
    setRender([...render, data]);
  });

  const rerender = () => {
    setRender([...render, "render"]);
    console.log("render");
  };

  return (
    <div className="">
      <h1>Welcome {info.user.first_name}</h1>
      <Search lift={(cont) => insertContact(cont)} />
      <button onClick={insert}>insert</button>
      <div className="chatboxs">
        <div className="conversation-container">
          {conversation.map((item, index) => {
            return (
              <Conversation
                key={index + "c"}
                id={item.conv_id}
                name={item.first_name}
                notification={item.notification}
                click={() => {
                  sessionStorage.setItem("receiver", item.receiver_id);
                  sessionStorage.setItem("conv_id", item.conv_id);
                  sessionStorage.setItem("notification", item.notification);
                  sessionStorage.setItem("index", index);
                  getMessages(item.receiver_id, info.user.id);
                  setName(item.first_name);
                  setContact(item);
                  clearNotification();
                }}
              />
            );
          })}
        </div>
        <Chatwrappe
          name={name}
          messages={messages}
          socket={socket}
          contact={contact}
          clear={() => {
            rerender();
          }}
        />
      </div>
    </div>
  );
}

export default Chat;
