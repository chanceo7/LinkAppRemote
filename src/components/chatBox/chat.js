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
  const [id, setId] = useState();
  const [text, setText] = useState();
  const [conversations, setConv] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    console.log(info);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8080/api/all/conv?id=2&txt=${text}&from=me`)
      .then((res) => {
        console.log(res.data);
        setMessages(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleSearch =(el)=>{
      setSearch(el.value)
      axios
      .post(``)
      .then(()=>{

      })
  }

  const loadMessage = (id, username) => {};

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
      </div>
      <br/>
      <div className="container">
        <div className="conversations">
          {conversations.map((item, index) => {
            return (
              <div
                key={index}
                id="conv"
                onClick={() => loadMessage(item.id, item.user_name)}
              >
                <p>{item.user_name}</p>
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
