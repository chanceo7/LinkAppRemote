import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "../chatBox/chat.css";
import axios from "axios";
import Conversation from "./conversation";
import Search from "../form/search";
import Chatwrappe from "./chatwrappe";
import Find from "../form/find/find";
import { useHistory } from "react-router-dom";
axios.defaults.withCredentials=true




function Chat() {
  const [socket] = useState(() => io(":8080", { query: { id: sessionStorage.getItem('user_id') } }));
  const [conversation, setConversation] = useState([]);
  const [allconversations, setAllconversations] = useState([]);
  const [nomber, setNomber] = useState(0);
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const [contact, setContact] = useState({});
  const [render, setRender] = useState([]);
  const [toggle, setToggle] = useState(true);
  const history = useHistory()

  const insert = () => {
    const data = {
      first_name: "chance",
      notification: nomber,
    };
    setConversation((prev) => {
      return [data, ...prev];
    });
    setNomber(nomber + 1);
  };


  

  const reactions=(emoji,index)=>{
      const data = {
        id:messages[index].id,
        reaction:emoji
      }
      axios.post("http://localhost:8080/api/post/reaction", data)
      .then(res=>{
        const current=messages
        current[index].reaction=emoji
        setMessages([...current])
      })
  }

  const deleteReaction=(index)=>{
    const id=messages[index].id
    axios.delete(`http://localhost:8080/api/delete/reaction/${id}`).then(res=>{
       const current = messages;
       current[index].reaction ="";
       setMessages([...current]);
    })
  }

  const getConversation = () => {
    axios
      .get(`http://localhost:8080/api/get/conv/${sessionStorage.getItem('user_id')}`)
      .then((res) => {
        if (res.data) {
          setConversation(res.data);
          setAllconversations(res.data);
        } else {
          setAllconversations([]);
          setConversation([]);
        }
        const conv_id = sessionStorage.getItem("conv_id");
        conv_id === "zzzz" && sessionStorage.setItem("conv_id", res.data[0].conv_id);       
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
    if (notification === 0) {
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
    received && getMessages(receiver, sessionStorage.getItem('user_id'));
    getConversation();
    const chat = document.querySelector('.chat')
    chat.addEventListener('click',(e)=>{
      const reactions = document.querySelectorAll('.reaction-bar')
      const Rightreactions = document.querySelectorAll('.Right-reaction-bar')
      const actions = document.querySelectorAll('.text-actions')
      Rightreactions && Rightreactions.forEach(el=> {
        el.style.width="0px"
        el.style.boxShadow="none"
      })
      reactions && reactions.forEach(el=>{ 
        el.style.width="0px"
        el.style.boxShadow="none"
      })
      actions && actions.forEach((el)=>{
        el.style.visibility="hidden"
      })
    })
   
}, [render]);

  let received = [];

  // socket----------------------------------
  socket.on("message received", (data) => {
    setRender([...render, data]);
  });

  socket.on("fowarded received", (rendr) => {
    setRender([...render, "render"]);
  });

  socket.on("typing receiver",(data)=>{
      
  })

  // socket ----------------------------------

  const rerender = () => {
    setRender([...render, "render"]);
    console.log("render");
  };

  const deleteChat = () => {
    const R = sessionStorage.getItem("receiver");
    const U = sessionStorage.getItem('user_id');
    axios
      .delete(`http://localhost:8080/api/delete/chat/${R}/${U}`)
      .then((res) => {
        rerender();
      });
  };

  const toggleDetails = () => {
    toggle ? setToggle(false) : setToggle(true);
  };

  const find = (results, len) => {
    if (len === 0) return setConversation([...allconversations]);
    setConversation([...results]);
  };


  const logout =()=>{
    sessionStorage.clear()
    history.push('/')
    axios.post(`http://localhost:8080/api/logout`)
          .then(res=>console.log(res))
  }

  return (
    <div className="home">
      <div className="home-topbar">
        <div className="home-topbar-profile">
          <img
            className="home-profile-img"
            src="https://yt3.ggpht.com/a/AATXAJwx-_ZnZdDNMMZc8EhFdOsjcPkVIgj89NK8CQ=s900-c-k-c0xffffffff-no-rj-mo"
            alt="profile"
          />
          <h3> welcome {sessionStorage.getItem('first_name')} {sessionStorage.getItem('last_name')}</h3>
        </div>
        <div className="home-topbar-action">
          <div className="about-logout">about</div>
          <div className="about-logout" onClick={()=>logout()}>logout</div>
        </div>
      </div>
      <Search
        lift={(cont) => insertContact(cont)}
        conversation={conversation}
      />
      <button onClick={insert}>insert</button>
      <div className="chatboxs">
        <div className="conversation-container">
          <Find
            conversation={conversation}
            find={(results, length) => find(results, length)}
          />
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
                  getMessages(item.id, sessionStorage.getItem('user_id'));
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
          deleteReaction={(index)=>deleteReaction(index)}
          reactions={(emoji,index)=>reactions(emoji,index)}
          name={name}
          toggleDetails={() => toggleDetails()}
          toggle={toggle}
          deleteChat={() => deleteChat()}
          messages={messages}
          conversation={conversation}
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
