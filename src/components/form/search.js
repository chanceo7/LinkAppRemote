import React, { useContext, useRef, useState, useEffect } from "react";
import userData from "./usecontexts";
import axios from "axios";

function Search(props) {
  const [search, setSearch] = useState("");
  const [contacts, setContact] = useState([]);
  const info = useContext(userData);
  const conversation = props.conversation;
  const hide_cont = document.querySelector(".conct-cont");

  const handleSearch = (el) => {
    setSearch(el.value);
    document.querySelector(".search-clear").style.visibility = "visible";
    const data = el.value;
    if (data == "") {
      document.querySelector(".search-clear").style.visibility = "hidden";
      hide_cont.style.visibility = "hidden";
      return setContact([]);
    }
    axios
      .post("http://localhost:8080/api/search/contact", { search: data })
      .then((res) => {
        if (res.data.length == 0) hide_cont.style.visibility = "hidden";
        if (res.data.length > 0) hide_cont.style.visibility = "visible";
        if (res.data) setContact(res.data);
      });
  };

  const insertReceiver = (data, index) => {
    const allContact = document.querySelectorAll(".contact");
    if (data.id == info.user.id) {
      return (allContact[index].style.animationName = "shake");
    }
    for (let i = 0; i < conversation.length; i++) {
      if (data.id == conversation[i].id) {
        allContact[index].style.animationName = "shake";
        return;
      }
    }

    document.querySelector(".search-clear").style.visibility = "hidden";
    hide_cont.style.visibility = "hidden";
    props.lift([data]);
    setSearch("");
    setContact([]);
  };

  const clearInput = () => {
    setSearch("");
    setContact([]);
    document.querySelector(".search-clear").style.visibility = "hidden";
    hide_cont.style.visibility = "hidden";
  };

  return (
    <div className="search">
      <form>
        <input
          className="search-input"
          placeholder="Search contact"
          type={"text"}
          value={search}
          onChange={(e) => handleSearch(e.target)}
        />
      </form>
      <div className="conct-cont">
        {contacts.map((item, index) => {
          return (
            <div
              onAnimationEnd={(e) => (e.target.style.animationName = "none")}
              key={index + "C"}
              className="contact"
              onClick={() => insertReceiver(item, index)}
            >
              <img
                src="https://img.joomcdn.net/65b5620470f07780d09ef40e8f38feb85bef51c9_original.jpeg"
                alt="okager"
              />
              <span>{item.first_name}</span>
            </div>
          );
        })}
      </div>
      <div className="search-clear" onClick={() => clearInput()}>
        <span>X</span>
      </div>
    </div>
  );
}

export default Search;
