import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import userData from "./usecontexts";

export default function Register() {
  const history = useHistory();
  const info = useContext(userData);
  const [alerted, setAlert] = useState("");
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [lForm, setLform] = useState({
    email: "",
    password: "",
  });

  const loggin = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:8080/api/loggin`, lForm).then((res) => {
      if (res.data.length > 0) {
        info.setUser(res.data[0]);
      }
      history.push("/chat");
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    history.push("/chat");
    axios.post(`http://localhost:8080/api/register`, form).then((res) => {
      console.log(res);
    });
  }

  const handleLoginChange = (el) => {
    const data = {
      ...lForm,
    };
    data[el.name] = el.value;
    setLform(data);
  };

  function handlechange(element) {
    const data = {
      ...form,
    };
    data[element.name] = element.value;
    setForm(data);
  }

  const style = {
    color: "white",
    backgroundColor: "blue",
    cusor: "pointer",
  };

  useEffect(() => {}, []);

  return (
    <div>
      <div>{info.user.name}</div>
      <div></div>
      <form onSubmit={handleSubmit}>
        <label>first name: </label>
        <input
          type={"text"}
          name={"first_name"}
          value={form.first_name}
          onChange={(e) => handlechange(e.target)}
        />
        <br />
        <label>last name: </label>
        <input
          type={"text"}
          name={"last_name"}
          value={form.last_Name}
          onChange={(e) => handlechange(e.target)}
        />
        <br />
        <label>email: </label>
        <input
          type={"text"}
          name={"email"}
          value={form.email}
          onChange={(e) => handlechange(e.target)}
        />
        <br />
        <label>password: </label>
        <input
          type={"text"}
          name={"password"}
          value={form.password}
          onChange={(e) => handlechange(e.target)}
        />
        <br />
        <input style={style} type={"submit"} value={"register"} />
      </form>

      <h1>logging</h1>
      <form onSubmit={loggin}>
        <div>
          <label>email: </label>
          <input
            type={"text"}
            name={"email"}
            value={lForm.email}
            onChange={(e) => {
              handleLoginChange(e.target);
            }}
          />
          <br />
          <label>password : </label>
          <input
            type={"text"}
            name={"password"}
            value={lForm.password}
            onChange={(e) => {
              handleLoginChange(e.target);
            }}
          />
          <div>{alerted}</div>
          <br />
          <input style={style} type={"submit"} value={"submit"} />
        </div>
      </form>
    </div>
  );
}
