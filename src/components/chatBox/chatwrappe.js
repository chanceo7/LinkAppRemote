import axios from "axios";
import React, { useEffect, useState, useContext, useRef } from "react";
import "../chatBox/chat.css";
import userData from "../form/usecontexts";

export default function Chatwrappe(props) {
  const info = useContext(userData);
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const texts = props.messages;
  const socket = props.socket;
  const detail = useRef();

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
              <img
                onClick={() => deleteMsg(i)}
                src="https://cdn.onlinewebfonts.com/svg/img_117750.png"
              />
              <div>{texts[i].message}</div>
            </div>
          );
    }
    setData(box);
  }

  const deleteMsg = (index) => {
    texts.splice(index, 1);
    text_faSliders(texts);
  };

  const clearNotif = () => {
    props.clear();
  };

  useEffect(() => {
    text_faSliders(texts);
  }, [props.messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    clearNotif();
    let conv_id = sessionStorage.getItem("conv_id");
    if (isNaN(conv_id)) {
      conv_id = "zzzz";
    }

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

  const toggleDetails = () => {
    const list = detail.current.classList;
    list.length == 2
      ? detail.current.classList.remove("hide")
      : detail.current.classList.add("hide");
    console.log(detail.current.classList);
  };

  return (
    <div>
      <div className="username">
        <b>{props.name}</b>
        <div
          className="receiver-info"
          onClick={() => {
            toggleDetails();
          }}
        >
          <h3>i</h3>
        </div>
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
      <div ref={detail} className="receiver">
        <div className="receiver-name">
          <h2>{props.name}</h2>
        </div>
        <div className="receiver-action">
          <div id="receiver-delete" onClick={props.deleteChat}>
            <p>Delete Chat</p>
          </div>
          <div id="receiver-block">
            <p>Block</p>
          </div>
          <div id="receiver-report">
            <p>Report</p>
          </div>
        </div>
      </div>
    </div>
  );
}
