import React, { useState , useEffect} from "react";
import '../status/status.css'

function Status(){
 
    const [display, setDisplay]= useState()
    
    let stories=[]
    for(let i=0; i<25; i++){
        stories.push(<div key={i} className="story"><div className="story-image"></div></div>)
    }
    
    useEffect(()=>{
        setDisplay(stories)
    },[])

    return(
        <div className="status">




           <div className="stroke"></div>
                <div className="status-container">
                     <div className="box ">
                        <svg className="right" width="50" height="60" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 60"  >
                          <path className="arrow" d="M 40 00 L 10 20 Q 00 30 10 40 L 40 60 Q 50 60 50 50 L 20 30 50 10 Q 50 00 40 00" stroke="none" fill="gray" />
                        </svg>
                     </div>
                     <div className="status-story">
                       {display}
                     </div>
                     <div className="box rightBox">
                       <svg className="left"  width="50" height="60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 60" >
                          <path className="arrow" d="M 10 00 L 40 20 Q 50 30 40 40 L 10 60 Q 00 60 00 50 L 30 30 00 10 Q 00 00 10 00 " fill="gray" stroke="none" />
                        </svg>
                     </div>   
                </div> 
            </div>
    )

}

export default Status;