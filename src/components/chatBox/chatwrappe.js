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
              <div className="me-container" onMouseLeave={(e) => hoverOut(e)}>
                <div className="me-actions">
                  <img src="https://th.bing.com/th/id/R.ccf12f5c262b2b519058da31788b63cf?rik=mP%2bRDuN7PYbpWA&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_93739.png&ehk=PqryfzeV9vZZXkeKlBWUlAfhbJAT%2f3uN4%2bn7C%2b4bRWc%3d&risl=&pid=ImgRaw&r=0" />
                  <img
                    className="me-delete"
                    onClick={() => deleteMsg(i, texts[i].id)}
                    src="https://cdn.onlinewebfonts.com/svg/img_117750.png"
                  />
                </div>
                <div onMouseEnter={(e) => hover(e)} className="me-text">
                  {texts[i].message}
                </div>
              </div>
            </div>
          );
    }
    setData(box);
  }

  const hover = (e) => {
    const element = e.target.parentNode.querySelector(".me-actions");
    element.style.visibility = "visible";
  };
  const hoverOut = (e) => {
    const target = e.target.parentNode;
    console.log(" targert ", target);
    const element = e.target.parentNode.querySelector(".me-actions");
    if (element) {
      element.style.visibility = "hidden";
    } else {
      const div = target.parentNode.querySelector(".me-actions");
      console.log("div", div);
      div.style.visibility = "hidden";
    }
    console.log(element);
  };

  const deleteMsg = (index, id) => {
    axios
      .delete(`http://localhost:8080/api/delete/massages/${id}`)
      .then((res) => {
        texts.splice(index, 1);
        text_faSliders(texts);
      });
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
    props.toggleDetails();
  };

  return (
    <div className="chat">
      <div className="chat-profile">
        <div className="chat-profile-user">
          <img
            className="chat-profile-img"
            src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/07b59814110649.5627d8aa58212.jpg"
          />
          <h2>{props.name}</h2>
        </div>
        <div
          className="receiver-info"
          onClick={() => {
            toggleDetails();
          }}
        >
          <h3
            className={
              props.toggle == true ? "action-desactive" : "action-active"
            }
          >
            i
          </h3>
        </div>
      </div>
      <div className="text-container">{data}</div>
      <div className="chat-input-container">
        <form className="text-form" onSubmit={handleSubmit}>
          <input
            className="text-input"
            type={"text"}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <svg
            onClick={(e) => handleSubmit(e)}
            class="send"
            viewBox="0 0 70 50"
          >
            <path
              stroke="transparent"
              xmlns="http://www.w3.org/2000/svg"
              d="M 0 0 L 70 25 L 0 50 L 20 25"
            />
          </svg>
        </form>
      </div>
      <div ref={detail} className="chat-action" id={props.toggle ? "hide" : ""}>
        <div className="receiver-type">
          <h4>Actions</h4>
        </div>
        <div className="receiver-action">
          <div id="receiver-delete" onClick={props.deleteChat}>
            <img src="https://th.bing.com/th/id/OIP.MeHH1uPILocqcbznizYrggHaHa?pid=ImgDet&rs=1" />
            <p>Delete Chat</p>
          </div>
          <div id="receiver-block">
            <img src="https://th.bing.com/th/id/R.5d65a339c8fb4b867e7cddb2d2c34925?rik=lv0ctMESdPTYmg&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fdownload_559077.png&ehk=r5SSG1ie5LT4J5YGqxS1wNQL7k0VSR3mMrJdd%2fCFz5E%3d&risl=&pid=ImgRaw&r=0" />
            <p>Block</p>
          </div>
          <div id="receiver-report">
            <img src="https://cdn.onlinewebfonts.com/svg/img_78870.png" />
            <p>Report</p>
          </div>
        </div>
      </div>
    </div>
  );
}
