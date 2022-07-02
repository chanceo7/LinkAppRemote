import axios from "axios";
import React, { useState, useRef } from "react";
import "../chatBubble/chatBubble.css";
import treeDot_icon from '../../../image/treeDot_icon.png'
import reply_icon from '../../../image/reply_icon.png'




function RightBubble(props) {

  const popReaction = (e) => {
    const target=e.target.parentNode.querySelector(".Right-reaction-bar")
    const allAnimation=target.querySelectorAll('.reaction')
    let index=4
    console.log(allAnimation)
    let delay=0.03

    for(let x=allAnimation.length-1; x>-1; x--){
      allAnimation[x].style.animationDuration="0.3s";
      allAnimation[x].style.animationDelay=`${delay}s`
      allAnimation[x].style.animationName="bounce";
      delay+=0.03;
    }
    target.style.width="203px"
    target.style.boxShadow=" 0px 0px 2px 1px rgba(165, 165, 165, 0.692)"
  };
  

  const react = (e) => { 
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
      <div  className={props.prevReaction ? "Rightbubble margin-top" : "Rightbubble"}>  
        <div className="frame" onMouseLeave={(e) => onLeave(e)}>
              <div className="bubble-actions">
                   <img src={reply_icon} alt="actions" onClick={()=>{reply(props.text)}} />
                   <img src={treeDot_icon} alt="replay" onClick={()=>{props.forward(props.text,props.message_id)}}/>
              </div>
              <div className="Rightbubble-container" onMouseEnter={(e) => onhover(e)}>
                    {props.reply && ( <div className="Rightbubble-replied">{props.reply}</div> )}
                    <div className="Rightbubble-text">
                        <div className="Right-reaction-bar">
                            <div onClick={(e) => { react(e)}} className="reaction"   onAnimationEnd={(e)=>e.target.style.animationName="none"} > {"😀"}</div>
                            <div onClick={(e) => { react(e)}} className="reaction"   onAnimationEnd={(e)=>e.target.style.animationName="none"} > {"😂"}</div>
                            <div onClick={(e) => { react(e)}} className="reaction"   onAnimationEnd={(e)=>e.target.style.animationName="none"} > {"❤️"}</div>
                            <div onClick={(e) => { react(e)}} className="reaction"   onAnimationEnd={(e)=>e.target.style.animationName="none"} > {"🙏"}</div>
                            <div onClick={(e) => { react(e)}} className="reaction"   onAnimationEnd={(e)=>e.target.style.animationName="none"} > {"👍"}</div>
                            <div onClick={(e) => { react(e)}} className="reaction"   onAnimationEnd={(e)=>e.target.style.animationName="none"} > {"😲"}</div>
                        </div>  
                        <div className="Leftbubble-text-message" onClick={(e) => popReaction(e)}>{props.text}</div>
                    </div>
                    {props.reaction && (  <div className="Rightbubble-reaction" onClick={() => props.deleteReaction(props.index)}> {props.reaction}</div> )}  
              </div>
        </div>
      </div>
    </div>
  );
}

export default RightBubble
