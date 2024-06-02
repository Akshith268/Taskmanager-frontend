import React from 'react'
import { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Register() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");

    // const history = useHistory();
    const navigate = useNavigate();

    const registerfunc = async (e) => {
        e.preventDefault();
        console.log("Registering...");
    

    try{
      const response= await axios.post("auth/register",{
        username:username,
        email: email,
        password: password,
        confirmpassword: confirmpassword
      });
     console.log(response);
      const res= await response.data;
      if(res.status==="ok"){
        navigate('/login');
      }
      else{
        alert(res.message);
      }
    }
    catch(err){
      console.log(err);
    }
    
  }
  return (
    <div>
        <h1>Register</h1>

        <form onSubmit={registerfunc}>
            <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Username" />
            <input type="email"  value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" />
            <input type="password"  value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
            <input type="password"  value={confirmpassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
            <button type='submit' onClick={registerfunc} >Register</button>
        </form>

    </div>
  )
}
