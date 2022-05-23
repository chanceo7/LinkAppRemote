import React, { useEffect, useState, useReducer } from "react";
import Chatwrappe from "./chatwrappe";
import io from "socket.io-client";
import "../chatBox/chat.css";
import axios from "axios";

function Chat() {
  const used_id = Math.floor(Math.random() * 20);
  const [socket] = useState(() => io(":8080", { query: { id: used_id } }));
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [id, setId] = useState();
  const [text, setText] = useState();
  const [conversations, setConv] = useState([]);


  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/all/conv?id=1`)
      .then((res) => {
        console.log(res.data);
        setConv([]);
      })
      .catch((err) => console.log(err));
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

  const loadMessage = (id, username) => {};

  return (
    <>
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
          <div>
            <div>
              <p>this the very good idea</p>


            </div>
            <input
              type="number"
              value={id}
              onChange={(e) => {
                setId(e.target.value);
              }}
            />
            <input
              value={"name"}
              className={"victoria"}
              onClick={() => console.log("chance")}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
