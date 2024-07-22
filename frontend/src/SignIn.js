import React, { useState } from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom' ;
import "./style.css"
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
  const [user, setUser] = useState('');
  const Navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/signup" , user)
    .then((res)=> {
         console.log(res)
       Navigate('/login')
    }).catch((error)=>{
      console.log(error)
     })
    
  };

  return (
    <>
    <form onSubmit={handleSignUp}>
      <h1>Resister</h1>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) =>{
          setUser({...user , username:e.target.value})
        }}
      />
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
        onChange={(e)=>{
          setUser({...user , password : e.target.value()})
        }}
      />
      <button type="submit">Sign Up</button>
    </form>
    <p>Already have a account</p>
    <Link to = "/login" className="button">Login</Link>
     
    </>
  );
};

export default SignUp;

