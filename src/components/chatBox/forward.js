import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import "../chatBox/chat.css";
import userData from "../form/usecontexts";

function Forward(props) {
  const [input, setInput] = useState("");
  const [contact, setContact] = useState([]);
  const [results, setResults] = useState([]);
  const [conver, setConver] = useState([]);
  const [disable, setDisable] = useState(true);
  const conv = useRef();
  const absolute = useRef();
  const info = useContext(userData);
  const socket = props.socket;

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    if (value == "") {
      absolute.current.style.display = "none";
      conv.current.style.display = "contents";
      return setResults([]);
    }

    if (value.length > 0) {
      conv.current.style.display = "none";
      absolute.current.style.display = "contents";
    }
    axios
      .post("http://localhost:8080/api/search/contact", { search: value })
      .then((res) => {
        if (res.data) {
          setResults(res.data);
        }
      });
  };

  const insertContact = (item) => {
    for (let i = 0; i < contact.length; i++) {
      if (contact[i].id == item.id) {
        const contactArr = document.querySelectorAll(".forward-contact");
        contactArr[i].style.animationName = "shake";
        console.log(contactArr[i]);
        return;
      }
    }
    setInput([]);
    setResults([]);
    absolute.current.style.display = "none";
    conv.current.style.display = "contents";
    setContact([...contact, item]);
    setDisable(false);
  };

  const close = (index) => {
    const data = contact;
    data.length == 1 && setDisable(true);
    data.splice(index, 1);
    return setContact([...data]);
  };

  let conversation = props.conversation;
  const setconv = (conv) => {
    const data = conv;
    setConver([...data]);
  };

  const closePopup = () => {
    setContact([]);
    const popup = document.querySelector(".top").style;
    const overlay = document.querySelector("#overlay").style;
    popup.transform = " translate(-50%,-50%) scale(0)";
    overlay.transform = " translate(-50%,-50%) scale(0)";
  };

  const ForwardMessage = () => {
    if (disable) return;
    closePopup();
    const data = {
      user_id: info.user.id,
      users: contact,
      message: props.msg,
      from: "me",
    };
    axios
      .post(`http://localhost:8080/api/forward/messages`, data)
      .then((res) => {
        console.log(res);
        arrangeConversation();
        socket.emit("forward message", contact);
      });
  };

  const arrangeConversation = () => {
    props.conv_render();
  };

  useEffect(() => {
    setconv(conversation);
    setContact([]);
  }, [props.render]);

  return (
    <div className="top">
      <div className="forward">
        <div className="forward-container">
          <div className="forward-top-bar">
            <span
              className="closeX"
              onClick={() => {
                closePopup();
              }}
            >
              X
            </span>
            <span
              className={disable ? "send-disable" : "send-able"}
              onClick={() => ForwardMessage()}
            >
              Send
            </span>
          </div>
          <div className="forward-search">
            <span className="forward-to">To:</span>
            <div className="">
              <div className="forward-results">
                {contact.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="forward-contact"
                      onAnimationEnd={(e) =>
                        (e.target.style.animationName = "none")
                      }
                    >
                      <span>{item.first_name}</span>
                      <span className="close" onClick={() => close(index)}>
                        X
                      </span>
                    </div>
                  );
                })}
              </div>
              <input
                type={"text"}
                className={"forward-input"}
                value={input}
                placeholder="search..."
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="forward-conversation" ref={conv}>
            <div>Saggestions</div>
            {conver.map((item, index) => {
              return (
                <div
                  key={index + "b"}
                  className="forward-conv-box"
                  onClick={() => {
                    insertContact(item);
                  }}
                >
                  <div className="conv-box">
                    {" "}
                    <img src="https://th.bing.com/th/id/OIP.EygFVLaHGtsc4JiwaK4ETwHaHa?w=206&h=206&c=7&r=0&o=5&pid=1.7" />{" "}
                    <span>{item.first_name}</span>
                  </div>
                </div>
              );
            })}
          </div>{" "}
          <div className="forward-absolute" ref={absolute}>
            <div>Results</div>
            {results.map((item, index) => {
              return (
                <div
                  key={index + "c"}
                  className="forward-conv-box"
                  onClick={() => {
                    insertContact(item);
                  }}
                >
                  <div className="conv-box">
                    {" "}
                    <img src="https://th.bing.com/th/id/R.12ffda7772726f505cc8f029a098ea0b?rik=%2bSlOC02qhlZC1Q&riu=http%3a%2f%2fimages4.fanpop.com%2fimage%2fphotos%2f22300000%2fKakashi-kakashi-22321330-1280-720.jpg&ehk=%2bIH2jrKOIAAle6M6Ht142Q1uCSqU31KEB7SW096%2fAXA%3d&risl=&pid=ImgRaw&r=0" />{" "}
                    <span>{item.first_name}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forward;
