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
  const [toggle, setToggle] = useState(true);

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
        const conv_id = sessionStorage.getItem("conv_id");
        conv_id == "zzzz" &&
          sessionStorage.setItem("conv_id", res.data[0].conv_id);
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

  const deleteChat = () => {
    const R = sessionStorage.getItem("receiver");
    const U = info.user.id;
    axios
      .delete(`http://localhost:8080/api/delete/chat/${R}/${U}`)
      .then((res) => {
        rerender();
      });
  };

  const toggleDetails = () => {
    toggle ? setToggle(false) : setToggle(true);
  };

  return (
    <div className="home">
      <div className="home-topbar">
        <div className="home-topbar-profile">
          <img
            className="home-profile-img"
            src="https://yt3.ggpht.com/a/AATXAJwx-_ZnZdDNMMZc8EhFdOsjcPkVIgj89NK8CQ=s900-c-k-c0xffffffff-no-rj-mo"
          />
          <h3> welcome {info.user.first_name}</h3>
        </div>
        <div className="home-topbar-action">
          <div className="about-logout">about</div>
          <div className="about-logout">logout</div>
        </div>
      </div>
      <Search
        lift={(cont) => insertContact(cont)}
        conversation={conversation}
      />
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
                  sessionStorage.setItem("receiver", item.id);
                  sessionStorage.setItem(
                    "conv_id",
                    isNaN(item.conv_id) ? "zzzz" : item.conv_id
                  );
                  sessionStorage.setItem("notification", item.notification);
                  sessionStorage.setItem("index", index);
                  getMessages(item.id, info.user.id);
                  setName(item.first_name);
                  setContact(item);
                  clearNotification();
                  setToggle(true);
                }}
              />
            );
          })}
        </div>
        <Chatwrappe
          name={name}
          toggleDetails={() => toggleDetails()}
          toggle={toggle}
          deleteChat={() => deleteChat()}
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
