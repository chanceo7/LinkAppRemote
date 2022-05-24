import "./App.css";
import NavBar from "./components/nav-bar/Navbar";
import Status from "./components/status/status";
import Posts from "./components/posts/posts";
import Home from "./components/home/home";
import Chat from "./components/chatBox/chat";
import Chatwrappe from "./components/chatBox/chatwrappe";
import Register from "./components/form/register";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import userData from "./components/form/usecontexts"
import React, { useState } from "react";
function App() {
  const [user,setUser]=useState({
    first_name:""
  })
  return (
    <div className="App">
      <userData.Provider value={{user,setUser}}>
        <BrowserRouter>
          <h1>navigation</h1>
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
    </div>
  );
}

export default App;
