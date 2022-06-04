import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import "../chatBox/chat.css";
import userData from "../form/usecontexts";

export default function Chatwrappe(props) {
  const info = useContext(userData);
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const texts = props.messages;
  const socket = props.socket;

  function text_faSliders(texts) {
    const box = [];
    for (let i = 0; i < texts.length; i++) {
      texts[i].from == "other"
        ? box.push(
            <div key={i} className="other">
              <div>{texts[i].message}</div>
            </div>
          )
        : box.push(
            <div key={i} className="me">
              <div>{texts[i].message}</div>
            </div>
          );
    }
    setData(box);
  }

  const clearNotif = () => {
    props.clear();
  };

  useEffect(() => {
    text_faSliders(texts);
  }, [props.messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    clearNotif();
    const conv_id = sessionStorage.getItem("conv_id");
    const data = {
      user_id: info.user.id,
      receiver_id: props.contact.id,
      message: text,
      from: "me",
      sender: {
        id: info.user.id,
        name: info.user.first_name,
      },
    };
    axios
      .post(`http://localhost:8080/api/save/received/message/${conv_id}`, data)
      .then((res) => {
        console.log(res);
        socket.emit("send message", data);
        texts.push(data);
        setText("");
        text_faSliders(texts);
      });
  };

  return (
    <div>
      <div className="username">
        <b>{props.name}</b>
      </div>
      <div className="text-container">{data}</div>
      <div className="input">
        <form onSubmit={handleSubmit}>
          <input
            className="text"
            type={"text"}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <input className="send" type={"submit"} value={"send"} />
        </form>
      </div>
    </div>
  );
}
