import axios from "axios";
import React, { useEffect, useState } from "react";
import Checkbox from "../form/checkbox";
import "../chatBox/chat.css";

function Forward(props) {
  const [input, setInput] = useState("");
  const [contact, setContact] = useState([]);
  const [results, setResults] = useState([]);
  const [conver, setConver] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    if (value == "") {
      return setResults([]);
    }
    axios
      .post("http://localhost:8080/api/search/contact", { search: value })
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          results(res.data);
        }
      });
  };

  const insertContact = (item) => {
    for (let i = 0; i < contact.length; i++) {
      if (contact[i].id == item.id) {
        const data = contact;
        data.splice(i, 1);
        return setContact([...data]);
      } else {
        setContact([...contact, item]);
      }
    }
    setContact([...contact, item]);
  };

  const changeState = (index) => {
    const data = conver;
    if (data[index].state == true) {
      data[index].state = false;
      console.log(data[index].state);
      return setConver([...data]);
    }

    if (data[index].state == false) {
      data[index].state = true;
      console.log(data[index].state);
      return setConver([...data]);
    }
  };

  const close = (index) => {
    for (let i = 0; i < conver.length; i++) {
      if (data[index].id == conver[i].id) {
        data[i].state = false;
        setConver(data);
      }
    }
    const data = contact;
    data.splice(index, 1);
    setContact([...data]);
    return;
  };

  let conversation = props.conversation;
  const setconv = (conv) => {
    const data = conv;
    for (let i = 0; i < data.length; i++) {
      data[i]["state"] = true;
    }
    setConver([...data]);
  };

  useEffect(() => {
    setconv(conversation);
  }, [props.conversation]);

  return (
    <div>
      <div className="forward">
        <div className="forward-container">
          <div className="forward-search">
            <span className="forward-to">To:</span>
            <div className="">
              <div className="forward-results">
                {contact.map((item, index) => {
                  return (
                    <div className="forward-contact">
                      <span>{item.first_name}</span>
                      <span className="close" onClick={() => close(index)}>
                        x
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
          <div className="forward-conversation">
            {conver.map((item, index) => {
              return (
                <div className="forward-conv-box">
                  <div className="conv-box">
                    {" "}
                    <img src="https://th.bing.com/th/id/OIP.EygFVLaHGtsc4JiwaK4ETwHaHa?w=206&h=206&c=7&r=0&o=5&pid=1.7" />{" "}
                    <span>{item.first_name}</span>
                  </div>
                  <Checkbox
                    click={() => {
                      changeState(index);
                      insertContact(item);
                    }}
                    state={item.state}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div>
        {results.map((item, index) => {
          return (
            <div className="forward-conv-box">
              <div className="conv-box">
                {" "}
                <img src="https://th.bing.com/th/id/R.12ffda7772726f505cc8f029a098ea0b?rik=%2bSlOC02qhlZC1Q&riu=http%3a%2f%2fimages4.fanpop.com%2fimage%2fphotos%2f22300000%2fKakashi-kakashi-22321330-1280-720.jpg&ehk=%2bIH2jrKOIAAle6M6Ht142Q1uCSqU31KEB7SW096%2fAXA%3d&risl=&pid=ImgRaw&r=0" />{" "}
                <span>{item.first_name}</span>
              </div>
              <Checkbox />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Forward;
