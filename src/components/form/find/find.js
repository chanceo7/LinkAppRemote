import React, { useState } from "react";
import "../find/finds.css";

function Find(props) {
  const [results, setResults] = useState([]);
  const [input, setInput] = useState("");

  const finds = (value) => {
    setInput(value);
    const data = props.conversation;
    const found = [];

    if (value.length == "") {
      document.querySelector(".find-clear").style.visibility = "hidden";
      return props.find([], value.length);
    }

    document.querySelector(".find-clear").style.visibility = "visible";
    for (let item of data) {
      if (item.first_name.startsWith(value)) found.push(item);
    }
    setResults([...found]);
    return props.find(found, value.length);
  };

  const clear = () => {
    document.querySelector(".find-clear").style.visibility = "hidden";
    setInput("");
    props.find([], 0);
  };

  return (
    <div className="find-search">
      <input
        className="find-input"
        placeholder="Find conversation..."
        type={"text"}
        value={input}
        name="find"
        onChange={(e) => finds(e.target.value)}
      />
      <div className="find-clear" onClick={() => clear()}>
        <span>x</span>
      </div>
    </div>
  );
}

export default Find;
