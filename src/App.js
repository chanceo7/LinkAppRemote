import "./App.css";
import NavBar from "./components/nav-bar/Navbar";
import Status from "./components/status/status";
import Posts from "./components/posts/posts";
import Home from "./components/home/home";
import Chat from "./components/chatBox/chat";
import Chatwrappe from "./components/chatBox/chatwrappe";
import Checkbox from "./components/form/checkbox";
import Register from "./components/form/register";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import userData from "./components/form/usecontexts";
import React, { useState } from "react";
function App() {
  const [user, setUser] = useState({
    first_name: "",
  });

  const closePopup = () => {
    const popup = document.querySelector(".top").style;
    const overlay = document.querySelector("#overlay").style;
    popup.transform = " translate(-50%,-50%) scale(0)";
    overlay.transform = " translate(-50%,-50%) scale(0)";
  };

  return (
    <div className="App">
      <userData.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <p>
            <Link to="/">home</Link>| |<Link to="/chat">chat</Link>
          </p>
          <Switch>
            <Route path="/chat">
              <Chat />
            </Route>
            <Route path="/">
              <Register />
            </Route>
          </Switch>
        </BrowserRouter>
      </userData.Provider>
      <div id="overlay" onClick={() => closePopup()}></div>
    </div>
  );
}

export default App;
