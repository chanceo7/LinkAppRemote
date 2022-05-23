
import React ,{useState} from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';


export default function Register() {

    const history=useHistory()
    const [form,setForm]=useState({
        first_name:"",
        last_name:"",
        email:"",
        password:""
    })

    
    
    function handlechange(element){
        const data={
            ...form,
        }
        data[element.name]=element.value;
        setForm(data)
    }

    const style={
        color:'white',
        backgroundColor:'blue',
        cusor:'pointer'
    }

    function handleSubmit(e){
        e.preventDefault();
        history.push('/chat') 
        // axios
        //   .post(`http://localhost:8080/api/register`,form)
        //   .then((res) => {
        //     console.log(res);
        //   });


    }

     
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label>first name: </label>
          <input
            type={"text"}
            name={"first_name"}
            value={form.first_name}
            onChange={(e) => handlechange(e.target)}
          />
          <br />
          <label>last name: </label>
          <input
            type={"text"}
            name={"last_name"}
            value={form.last_Name}
            onChange={(e) => handlechange(e.target)}
          />
          <br />
          <label>email: </label>
          <input
            type={"text"}
            name={"email"}
            value={form.email}
            onChange={(e) => handlechange(e.target)}
          />
          <br />
          <label>password: </label>
          <input
            type={"text"}
            name={"password"}
            value={form.password}
            onChange={(e) => handlechange(e.target)}
          />
          <br/>
          <input style={style} type={'submit'} value={'register'}/>
        </form>

        <h1>logging</h1>
        <form onSubmit={login}>
          
        </form>

      </div>
    );
}
