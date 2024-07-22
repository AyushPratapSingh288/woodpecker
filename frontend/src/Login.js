import React, { useState } from 'react';
import axios from 'axios';
import "./style.css"
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [user , setUser] = useState(null)
  const navigate = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault();
    axios.post("server" , user)
    .then((e)=>{
      console.log(e)
      if(e.data==="success"){
        navigate("dekh lo")
      }
    })
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        onChange={(e)=>{
          setUser({...user , email: e.target.value}) ;
        }}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setUser({...user , password: e.target.value})}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;