import "./App.css";
import Chat from "./components/chatBox/chat";
import Register from "./components/form/register/register";
import { BrowserRouter, Switch, Route, Link,Redirect } from "react-router-dom";
import React, { useEffect } from "react";
function App() {


  const closePopup = () => {
    const popup = document.querySelector(".top").style;
    const overlay = document.querySelector("#overlay").style;
    popup.transform = " translate(-50%,-50%) scale(0)";
    overlay.transform = " translate(-50%,-50%) scale(0)";
  };


  useEffect(()=>{
   window.addEventListener("load",()=>console.log("focused"))
   window.addEventListener("blur",()=>console.log("focused out"))
  })

  const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      sessionStorage.getItem('user_id')
        ? <Component {...props} />
        : <Redirect to='/' />
    )} />
  )


  return (
    <div className="App">
        <BrowserRouter>
          <p>
            <Link to="/">home</Link>| |<Link to="/chat">chat</Link>
          </p>
          <Switch>
            < ProtectedRoute exact path="/chat" component={Chat} />
            <Route path="/">
              <Register />
            </Route>
          </Switch>
        </BrowserRouter>
      <div id="overlay" onClick={() => closePopup()}></div>
    </div>
  );
}

export default App;
