import {React, useState } from "react";
import '../nav-bar/navbar.css'
function NavBar(){
 


    return (
        <div className="nav-container">
            <div className="logo">
                <img src="https://www.pngarts.com/files/3/URL-Chain-Link-PNG-Image-Background.png" alt="link_image"/>
                <p className="appName">Link</p>
            </div>
            <div className="navigation">
                <div className="home">                   
                    <img src="https://img.icons8.com/plumpy/48/000000/dog-house.png"/>
                </div>
                <div className="chat">
                  <img src="https://img.icons8.com/plumpy/24/000000/topic.png"/>
                </div>
                <div className="search">
                   <img src="https://img.icons8.com/plumpy/48/000000/search-bar.png"/>
                </div>
                <div className="camera">
                   <img src="https://static.vecteezy.com/system/resources/previews/000/349/672/original/camera-vector-icon.jpg" alt="camera-svg" />
                </div>
            </div>
            <div className="profile-picture">
                <img src='https://i.pinimg.com/736x/8a/cb/b5/8acbb5a765363f706ba1bf9df0c26df0.jpg' alt="profile-img"></img>
            </div>
        </div>
    );


}

export default NavBar;