import React, { useEffect, useState } from "react";
import '../posts/posts.css'
import axios from 'axios'

function Posts(props){

    const [user,setUser]=useState(props.data)
   

     const like=(e)=>{
        const target=e.target
        setUser({
            ...user,
            ['likes']:user.likes+1
        })
    
    }
  

    return (
        <div className="post-container">
             <div>
                 <p>Name: {user.first_name}</p>
                 <p onClick={like}> likes: {user.likes}</p>
             </div>
        </div>
    )
}

export default Posts;