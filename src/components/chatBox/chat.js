import React, { useEffect, useState, useReducer, useContext } from "react";
import Chatwrappe from "./chatwrappe";
import io from "socket.io-client";
import "../chatBox/chat.css";
import axios from "axios";
import userData from "../form/usecontexts";

function Chat() {
  const info = useContext(userData);
  const [socket] = useState(() => io(":8080", { query: { id: info.user.id } }));
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [contact, setContact] = useState([]);
  const [text, setText] = useState();
  const [conversations, setConv] = useState([]);
  const [search, setSearch] = useState("");
  const [receiver, setReceiver] = useState({});
  const [victoria, setv] = useState();
  useEffect(() => {}, []);
  socket.on("message received", (data) => {
    if (receiver.id == data.receiver_id) {
      setMessages([...messages, data]);
    }
    insertUser(data.sender);
  });

  const insertUser = (data) => {
    if (conversations[0]) {
      for (let item of conversations) {
        if (item.id == data.id) {
          return;
        }
      }
    }
    setConv([data, ...conversations]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const item = {
      user_id: info.user.id,
      receiver_id: receiver.id,
      message: text,
      from: "me",
      sender: {
        id: info.user.id,
        first_name: info.user.first_name,
        last_name: info.user.last_name,
      },
    };
    setMessages((prev) => {
      return [...prev, item];
    });
    axios
      .post("http://localhost:8080/api/save/received/message", item)
      .then((res) => {
        socket.emit("send message", item);
        setText("");
      });
  };

  const handleSearch = (el) => {
    setSearch(el.value);
    const data = el.value;
    axios
      .post("http://localhost:8080/api/search/contact", { search: data })
      .then((res) => {
        if (res.data) {
          setContact(res.data);
        }
      });
  };

  const createConv = (contact) => {
    for (let i = 0; i < conversations.length; i++) {
      if (conversations[i].id == contact["id"]) {
        return;
      }
    }
    setConv((prev) => {
      return [contact, ...prev];
    });
    setUsername(contact.first_name);
    setReceiver(contact);
  };

  const loadMessages = (item) => {
    setUsername(item.first_name);
    setReceiver(item);
    axios
      .get(`http://localhost:8080/api/load/messages/${item.id}/${info.user.id}`)
      .then((res) => {
        setMessages(res.data);
      });
  };

  return (
    <>
      <h1>Welcome {info.user.first_name}!!!</h1>
      <div className="">
        <label>
          <h3>Search contact</h3>
        </label>
        <input
          className="text"
          placeholder="Search"
          value={search}
          name="search"
          onChange={(e) => {
            handleSearch(e.target);
          }}
        />
        <div className="contact-container">
          {contact.map((item, index) => {
            return (
              <span
                key={index + "x"}
                onClick={() => createConv(item)}
                className="contact"
              >
                {item.first_name}
              </span>
            );
          })}
        </div>
      </div>
      <br />
      <div className="container">
        <div className="conversations">
          {conversations.map((item, index) => {
            return (
              <div key={index} id="conv" onClick={() => loadMessages(item)}>
                <p>{item.first_name}</p>
              </div>
            );
          })}
        </div>
        <div className="chat">
          <Chatwrappe
            handleSubmit={handleSubmit}
            username={username}
            text={text}
            setText={(e) => {
              setText(e.target.value);
            }}
            messages={messages}
          />
        </div>
      </div>
    </>
  );
}

export default Chat;
