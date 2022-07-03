import axios from "axios";
import React, { useState, useRef } from "react";
import "../chatBubble/chatBubble.css";
import treeDot_icon from '../../../image/treeDot_icon.png'
import reply_icon from '../../../image/reply_icon.png'
function LeftBubble(props) {
  
  
  const popReaction = (e) => {
    const target=e.target.parentNode.querySelector(".reaction-bar")
    const allAnimation=target.querySelectorAll('.reaction')
    let delay=0.03
    allAnimation.forEach(el=>{
      el.style.animationDuration="0.3s";
      el.style.animationDelay=`${delay}s`
      el.style.animationName="bounce";
      delay+=0.03;
    })
    target.style.width="203px"
    target.style.boxShadow=" 0px 0px 2px 1px rgba(165, 165, 165, 0.692)"
  };
  
  const closeReaction = () => {
    const allRightReaction_bar=document.querySelectorAll('.Right-reaction-bar')
    document.querySelector(".overlay-bubble").style.visibility = "hidden";
    allRightReaction_bar.forEach(el=>el.style.transform="scale(0)")

    const allReaction_bar=document.querySelectorAll('.reaction-bar')
    document.querySelector(".overlay-bubble").style.visibility = "hidden";
    allReaction_bar.forEach(el=>el.style.transform="scale(0)")
  };

  

  const react = (e) => { 
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

    const popAction=(index)=>{
      const actions=document.querySelectorAll('.text-actions')
      actions[index].style.visibility='visible'
    }

  return (
    <div>
      <div  className={props.prevReaction ? "Leftbubble margin-top" : "Leftbubble"}>  
        <div className="frame" onMouseLeave={(e) => onLeave(e)}>
              <div className="Leftbubble-container" onMouseEnter={(e) => onhover(e)}>
                    {props.reply && ( <div className="Leftbubble-replied">{props.reply}</div> )}
                    <div className="Leftbubble-text">
                        <div className="reaction-bar">
                            <div onClick={(e) => { react(e)}} className="reaction" onAnimationEnd={(e)=>e.target.style.animationName="none"} > {"😀"}</div>
                            <div onClick={(e) => { react(e)}} className="reaction" onAnimationEnd={(e)=>e.target.style.animationName="none"}> {"😂"}</div>
                            <div onClick={(e) => { react(e)}} className="reaction" onAnimationEnd={(e)=>e.target.style.animationName="none"}> {"❤️"}</div>
                            <div onClick={(e) => { react(e)}} className="reaction" onAnimationEnd={(e)=>e.target.style.animationName="none"}> {"🙏"}</div>
                            <div onClick={(e) => { react(e)}} className="reaction" onAnimationEnd={(e)=>e.target.style.animationName="none"}> {"👍"}</div>
                            <div onClick={(e) => { react(e)}} className="reaction" onAnimationEnd={(e)=>e.target.style.animationName="none"}> {"😲"}</div>
                        </div>  
                        <div className="Leftbubble-text-message" onClick={(e) => popReaction(e)}>{props.text}</div>
                    </div>
                    {props.reaction && (  <div className="Leftbubble-reaction" onClick={() => props.deleteReaction(props.index)}> {props.reaction}</div> )}  
              </div>
              <div className="bubble-actions">
                  <img src={reply_icon} alt="actions" onClick={()=>{reply(props.text)}} />
                  <img src={treeDot_icon} alt="replay" onClick={()=>{popAction(props.index)}} />
                  <div className="text-actions">
                      <div className="forwards" onClick={()=>{props.forward(props.text,props.message_id)}}>forward</div>
                      <div className="delete" onClick={()=>{}}>delete</div>
                      <div>copy</div>
                  </div>
              </div>
        </div>
      </div>
      <div className="overlay-bubble" onClick={(e) => closeReaction(e)}></div>
    </div>
  );
}

export default LeftBubble;
