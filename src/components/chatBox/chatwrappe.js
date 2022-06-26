import axios from "axios";
import React, { useEffect, useState, useContext, useRef } from "react";
import "../chatBox/chat.css";
import userData from "../form/usecontexts";
import Forward from "./forward";
import coverMessage from "../../image/coverMessage.png";
import emoji from "../../image/emoji.png";
import Emoji from "../form/emoji/emoji";
import LeftBubble from "./chatBubble/chatBubble";
import RightBubble from "./chatBubble/RightBubble";



export default function Chatwrappe(props) {
  const info = useContext(userData);
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const [toFoward, setToFoward] = useState({});
  const [replyMessage, setReplyMessage] = useState("");
  const texts = props.messages;
  const socket = props.socket;
  const detail = useRef();
  const [render, setRender] = useState([]);

  function text_faSliders(message_info) {
    const box = [];
    for (let i = 0; i < message_info.length; i++) {
      message_info[i].from == "other"
        ? box.push(
            <LeftBubble
              deleteReaction={(index) => props.deleteReaction(index)}
              key={i + "lb"}
              select={i + "lb"}
              text={message_info[i].message}
              prevReaction={
                message_info[i - 1] ? message_info[i - 1].reaction : ""
              }
              reaction={message_info[i].reaction}
              reply={message_info[i].reply}
              reactions={(emoji, index) => props.reactions(emoji, index)}
              index={i}
              replying={(message) => replying(message)}
              message_id={message_info[i].id}
              forward={(msg,msg_id)=>{forward(msg,msg_id)}}
            />
          )
        : box.push(
          <RightBubble
              deleteReaction={(index) => props.deleteReaction(index)}
              key={i + "lb"}
              select={i + "lb"}
              text={message_info[i].message}
              prevReaction={
                message_info[i - 1] ? message_info[i - 1].reaction : ""
              }
              reaction={message_info[i].reaction}
              reply={message_info[i].reply}
              reactions={(emoji, index) => props.reactions(emoji, index)}
              index={i}
              replying={(message) => replying(message)}
              message_id={message_info[i].id}
              forward={(msg,msg_id)=>{forward(msg,msg_id)}}
        />
          );
    }
    setData(box);
  }

  const forward = (msg,msg_id) => {
    setRender([...render, "render"]);
    setToFoward({msg:msg,msg_id:msg_id });
    const popup = document.querySelector(".top").style;
    const overlay = document.querySelector("#overlay").style;
    popup.transform = " translate(-50%,-50%) scale(1)";
    overlay.transform = " translate(-50%,-50%) scale(2)";
    console.log("message :"+msg, "id :"+msg_id)
  };

  const replying = (message) => {
    setReplyMessage(message);
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
    let conv_id = sessionStorage.getItem("conv_id");
    if (isNaN(conv_id)) {
      conv_id = "zzzz";
    }

    const data = {
      user_id: info.user.id,
      receiver_id: props.contact.id,
      reply:replyMessage,
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
        clearNotif();
        socket.emit("send message", data);
        texts.push(data);
        setText("");
        const textarea=document.querySelector('.text-input')
        textarea.style.height="2.5rem"
        setReplyMessage("")
        text_faSliders(texts);
      });
  };

  const toggleDetails = () => {
    props.toggleDetails();
  };

  const coverChat = () => {
    document.querySelector(".chatwrappe-cover").style.visibility = "visible";
    props.deleteChat();
  };

  const hide = (emoji) => {
    let data = text;
    data += emoji;
    setText(data);
  };

  const handleText = (el) => { 
    setText(el.value);
    if(el.value.length==42){
      const textarea=document.querySelector('.text-input')
      textarea.style.height="4rem"
    }
    if(el.value.length==80){
      const textarea=document.querySelector('.text-input')
      textarea.style.height="5.1rem"
    }
    if(el.value.length==41){
      const textarea=document.querySelector('.text-input')
      textarea.style.height="2.5rem"
     }
  }

  return (
    <div className="chat">
      <Forward
        conversation={props.conversation}
        msg={toFoward}
        socket={socket}
        render={render}
        conv_render={() => props.clear()}
      />
      <div className="chat-profile">
        <div className="chat-profile-user">
          <img
            className="chat-profile-img"
            src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/07b59814110649.5627d8aa58212.jpg"
          />
          <h2>{props.name}</h2>
        </div>
        <div className="receiver-info"onClick={() => { toggleDetails()}}   >
          <h3 className={ props.toggle == true ? "action-desactive" : "action-active" }>i</h3>
        </div>
      </div>
      <div className="text-container">{data}</div>
      <div className="chat-input-container">
        {replyMessage && (
          <div className="chat-reply ">
            <div className="chat-reply-topbar">
              <p id="replying">Replying to</p>
              <p id="reply-close" onClick={()=>{setReplyMessage("")}}>X</p>
            </div>
            <div className="chat-reply-message">{replyMessage}</div>
          </div>
        )}
        <div className="text-form"> 
          <img
            className="emoji-picture"
            src={emoji}
            alt="emoji"
            onClick={() =>
              (document.querySelector(".emoji-container").style.visibility =
                "visible")
            }
          />
          <textarea
            className="text-input"
            type={"text"}
            value={text}
            maxLength={325}
            onChange={(e) => {
              handleText(e.target)
            }}
          />
          <svg
            onClick={(e) => handleSubmit(e)}
            className="send"
            viewBox="0 0 70 50"
          >
            <path
              stroke="transparent"
              xmlns="http://www.w3.org/2000/svg"
              d="M 0 0 L 70 25 L 0 50 L 20 25"
            />
          </svg>
        </div>
      </div>
      <div ref={detail} className="chat-action" id={props.toggle ? "hide" : ""}>
        <div className="receiver-type">
          <h4>Actions</h4>
        </div>
        <div className="receiver-action">
          <div
            id="receiver-delete"
            onClick={() => {
              coverChat();
            }}
          >
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
      <div className="chatwrappe-cover">
        <img src={coverMessage} alt="coverMessage" />
      </div>
      <Emoji insert={(emoji) => hide(emoji)} />
    </div>
  );
}
