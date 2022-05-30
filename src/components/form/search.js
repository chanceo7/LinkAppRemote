import React, { useState } from "react";
import axios from "axios";

function Search(props) {
  const [search, setSearch] = useState("");
  const [contacts, setContact] = useState([]);
  const [receiverList, setReceiverList] = useState([]);

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
    setReceiverList((prev) => {
      return [data, ...prev];
    });
  };

  const lift = (e) => {
    props.lift(receiverList);
  };

  return (
    <div>
      <form>
        <label>Search :</label>
        <input
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
