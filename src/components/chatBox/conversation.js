import axios from "axios";
import React, { useState, useEffect, useReducer, useMemo } from "react";
import "../chatBox/chat.css";

function Conversation(props) {
  const clearNotification = (e) => {
    if (props.notification > 0) {
      axios
        .post(`http://localhost:8080/api/clear/notification/${props.id}`)
        .then(() => {
          console.log("cleard");
        });
      return;
    }

    console.log("unchanged : " + 0);
  };

  return (
    <div
      onClick={(e) => {
        clearNotification(e);
      }}
    >
      <div id="conversation" onClick={props.click}>
        <img
          className="pro-img"
          src="https://static1.cbrimages.com/wordpress/wp-content/uploads/2020/08/Featured-Hated-Loved-Sasuke-Uchiha.jpg?q=50&fit=crop&w=1600&dpr=1.5"
          alt="pro-img"
        />
        <span className="names">{props.name}</span>
        <div className="notification">
          {props.notification > 0 && (
            <div id={props.notification == 0 ? "transp" : ""}>
              {props.notification}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Conversation;
