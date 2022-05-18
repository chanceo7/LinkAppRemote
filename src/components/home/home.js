import React ,{useEffect, useMemo, useState} from "react";
import '../home/home.css';
import axios from "axios";
import Posts from "../posts/posts";


function Home(){
   
    const [user, setUser]=useState([]);

    
    useEffect(()=>{
        fetching()
    },[])
    
    

    const fetching=()=>{
        axios.get('http://localhost:8080/api/all/post')
        .then(res=>{
            console.log(res.data)
            setUser(res.data)
        })
        .catch(err=>console.log(err))
    }

    return (
        <div className="home-container">
            {/* {user.map((it,dx)=>{
                return(<Posts key={dx} data={it} />)
            })} */}
        </div>
    )
}

export default Home;