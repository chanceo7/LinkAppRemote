import axios from "axios";
import React, { useState, useRef } from "react";
import "../chatBubble/chatBubble.css";
import treeDot_icon from '../../../image/treeDot_icon.png'
import reply_icon from '../../../image/reply_icon.png'
import { act } from "react-dom/test-utils";

function LeftBubble(props) {
  
  
  const popReaction = (e) => {
    document.querySelector(".overlay-bubble").style.visibility = "visible";
    const target=e.target.parentNode.querySelector(".reaction-bar")
    target.style.transform="scale(1)"
  };
  
  const closeReaction = () => {
    const allReaction_bar=document.querySelectorAll('.reaction-bar')
    document.querySelector(".overlay-bubble").style.visibility = "hidden";
    allReaction_bar.forEach(el=>el.style.transform="scale(0)")
  };

  const react = (e) => { 
     e.target.parentNode.style.transform="scale(0)"
     document.querySelector(".overlay-bubble").style.visibility = "hidden";
     console.log(e.target.innerHTML)
     props.reactions(e.target.innerHTML, props.index)

   }


   const onhover = (e) => {
   const first = document.querySelectorAll(".bubble-actions");
   first[props.index].style.visibility='visible';
   
     }

     const onLeave = (e) => { 
     const first = document.querySelectorAll(".bubble-actions");
     first[props.index].style.visibility='hidden';
      }
  
    const reply=(message)=>{
       props.replying(message)
    }  

  return (
    <div>
      <div
        className={props.prevReaction ? "Leftbubble margin-top" : "Leftbubble"}
      >
        <div className="frame" onMouseLeave={(e) => onLeave(e)}>
          <div
            className="Leftbubble-container"
            onMouseEnter={(e) => onhover(e)}
          >
            {props.reply && (
              <div className="Leftbubble-replied">{props.reply}</div>
            )}

            <div className="Leftbubble-text">
              <div className="reaction-bar">
                <div
                  onClick={(e) => {
                    react(e);
                  }}
                  className=""
                >
                  {"😀"}
                </div>
                <div
                  onClick={(e) => {
                    react(e);
                  }}
                  className=""
                >
                  {"😂"}
                </div>
                <div
                  onClick={(e) => {
                    react(e);
                  }}
                  className=""
                >
                  {"❤️"}
                </div>
                <div
                  onClick={(e) => {
                    react(e);
                  }}
                  className=""
                >
                  {"🙏"}
                </div>
                <div
                  onClick={(e) => {
                    react(e);
                  }}
                  className=""
                >
                  {"👍"}
                </div>
                <div
                  onClick={(e) => {
                    react(e);
                  }}
                  className=""
                >
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
            {props.reaction && (
              <div
                className="Leftbubble-reaction"
                onClick={() => props.deleteReaction(props.index)}
              >
                {props.reaction}
              </div>
            )}
          </div>
          <div className="bubble-actions">
            <img src={reply_icon} alt="actions" onClick={()=>{reply(props.text)}} />
            <img src={treeDot_icon} alt="replay" />
          </div>
        </div>
      </div>

      <div className="overlay-bubble" onClick={(e) => closeReaction(e)}></div>
    </div>
  );
}

export default LeftBubble;
