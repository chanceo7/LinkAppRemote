import React, { useEffect, useState } from "react";
import "../register/register.css"
import axios from "axios";
import { useHistory } from "react-router-dom";


export default function Register() {
  const history = useHistory();
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
    axios.post(`http://localhost:8080/api/loggin`, lForm,{withCredentials: true}).then((res) => {
      sessionStorage.setItem('user_id', res.data[0].id)
      sessionStorage.setItem('first_name', res.data[0].first_name)
      sessionStorage.setItem('last_name', res.data[0].last_name)
      history.push("/chat");
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    axios.post(`http://localhost:8080/api/register`, form).then((res) => {
    sessionStorage.setItem('user_id', res.data.user_id)
    sessionStorage.setItem('first_name', res.data.first_name)
    sessionStorage.setItem('last_name', res.data.last_name)
    history.push("/chat");
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

  const popLogin=(e)=>{
    const login = document.querySelector('.loggin')
    login.style.opacity="1"
    login.style.pointerEvents="all"
    e.currentTarget.parentNode.style.opacity=0
    login.style.marginTop="0"
    e.currentTarget.parentNode.style.marginTop="40px"
    e.currentTarget.parentNode.style.pointerEvents="none"
  }

  const popRegistration=(e)=>{
    const register = document.querySelector('.register')
    e.currentTarget.parentNode.style.opacity="0"
    e.currentTarget.parentNode.style.pointerEvents="none"
    e.currentTarget.parentNode.style.marginTop="50px";
    register.style.marginTop="0"
    register.style.opacity="1"
    register.style.pointerEvents="all"
  }


  useEffect(() => {}, []);

  return (
    <div className="forms-contatiner">
      <div className="word">Let's chat <span role="img" aria-label="smile">😀</span></div>
      <div className="register">
      <div className="login-active" onClick={(e)=>popLogin(e)}>Login</div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <label>First name: </label>
          <input
            type={"text"}
            name={"first_name"}
            value={form.first_name}
            onChange={(e) => handlechange(e.target)}
          />
          <br />
          <span className="error">name must be at lest 2</span>
          <label>Last name: </label>
          <input
            type={"text"}
            name={"last_name"}
            value={form.last_Name}
            onChange={(e) => handlechange(e.target)}
          />
          <br />
          <span className="error">name too</span>
          <label>Email: </label>
          <input
            type={"text"}
            name={"email"}
            value={form.email}
            onChange={(e) => handlechange(e.target)}
          />
          <br />
          <span className="error"></span>
          <label>Password: </label>
          <input
            type={"password"}
            name={"password"}
            value={form.password}
            onChange={(e) => handlechange(e.target)}
          />
          <br />
          <span className="error"></span>
          <button className="register-submit" type={"submit"}>
            Register
          </button>
        </form>
      </div>

      <div className="loggin">
        <div className="login-active" onClick={(e)=>popRegistration(e)}>Register</div>
        <h1>Login</h1>
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
              type={"password"}
              name={"password"}
              value={lForm.password}
              onChange={(e) => {
                handleLoginChange(e.target);
              }}
            />
            <div>{alerted}</div>
            <br />
            <button className="register-submit loggin-width" type={"submit"}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
