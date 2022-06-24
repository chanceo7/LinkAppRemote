import React, { useState, useRef } from "react";
import "../chatBubble/chatBubble.css";

function LeftBubble(props) {
  let current

  const popReaction = (e) => {
    document.querySelector(".overlay-bubble").style.visibility = "visible";
    const target=e.target.parentNode.querySelector(".reaction-bar")
    target.style.transform="scale(1)"
    current=e.target.parentNode.querySelector(".reaction-bar");
  };

  const closeReaction = () => {
    document.querySelector(".overlay-bubble").style.visibility = "hidden";
    current.style.transform="scale(0)"
  };
  return (
    <div>
      <div
        className={
          props.prev == props.actual ? "Leftbubble margin-top" : "Leftbubble"
        }
      >
        <div className="Leftbubble-container">
          {props.reply && (
            <div className="Leftbubble-replied">{props.reply}</div>
          )}

          <div className="Leftbubble-text">
            <div className="reaction-bar">
              <div onClick={() => {}} className="">
                {"😀"}
              </div>
              <div onClick={() => {}} className="">
                {"😂"}
              </div>
              <div onClick={() => {}} className="">
                {"❤️"}
              </div>
              <div onClick={() => {}} className="">
                {"🙏"}
              </div>
              <div onClick={() => {}} className="">
                {"👍"}
              </div>
              <div onClick={() => {}} className="">
                {"😲"}
              </div>
            </div>
            <div
              className="Leftbubble-text-message"
              onClick={(e) => popReaction(e)}
            >
              {props.text}
            </div>
          </div>
          <div className="Leftbubble-reaction">{props.reaction}</div>
        </div>
      </div>
      <div className="overlay-bubble" onClick={(e) => closeReaction(e)}></div>
    </div>
  );
}

export default LeftBubble;
