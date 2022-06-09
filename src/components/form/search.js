import React, { useContext, useState } from "react";
import userData from "./usecontexts";
import axios from "axios";

function Search(props) {
  const [search, setSearch] = useState("");
  const [contacts, setContact] = useState([]);
  const [receiverList, setReceiverList] = useState([]);
  const info = useContext(userData);
  const conversation = props.conversation;

  const handleSearch = (el) => {
    setSearch(el.value);
    const data = el.value;
    if (data == "") {
      return setContact([]);
    }
    axios
      .post("http://localhost:8080/api/search/contact", { search: data })
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          setContact(res.data);
        }
      });
  };

  const insertReceiver = (data) => {
    if (data.id == info.user.id) return;
    setReceiverList([data]);
  };

  const lift = (e) => {
    setReceiverList([]);
    setContact([]);
    setSearch("");
    for (let item of conversation) {
      if (item.id == receiverList[0].id) return;
    }
    props.lift(receiverList);
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
      <div className="List-cont">
        {receiverList.map((item, index) => {
          return (
            <div key={index + "L"} className="conct">
              <p onClick={(e) => lift(e)}>{item.first_name}</p>
              <p onClick={() => setReceiverList([])}> X</p>
            </div>
          );
        })}
      </div>
      <div className="conct-cont">
        {contacts.map((item, index) => {
          return (
            <div
              key={index + "C"}
              className="contact"
              onClick={() => insertReceiver(item)}
            >
              {item.first_name}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Search;
