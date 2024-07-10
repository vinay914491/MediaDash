import React,{useState,useEffect} from 'react'
import {Link,useNavigate} from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginRoute } from '../APIRoutes';

import axios from 'axios';
import './Login.css';
const Login = () => {
    const navigate=useNavigate();
    const [values,setValues]=useState({
        username:"",
        password:"",
        
    });
    
    const handleSubmit=async(event)=>{
        event.preventDefault();
        if(handleValidation()){
            console.log("in validation",loginRoute);
            const {password,username}=values;
            const {data}=await axios.post(loginRoute,{
                username,password,
            });
            if(data.status===false){
                toast.error(data.msg,toastOptions);

            }
            if(data.status===true){
                localStorage.setItem('chat-app-user',JSON.stringify(data.user));
                navigate('/dashboard');
            }
            
        }
    }

    // useEffect(()=>{
    //       if(localStorage.getItem('chat-app-user')){
    //         navigate('/');
    //       }
    //     },[])

    const toastOptions={
        position:'bottom-right',
        autoClose:8000,
        pauseOnHover:true,
        draggable:true,
        theme:"dark"
    };
 
    const handleValidation=()=>{
        const {password,username}=values;
        if(password===""){
                toast.error("password is required",toastOptions);
                return false;
        }
        else if(username.length===""){
                toast.error("Username is required ",toastOptions);
                return false;
        }
        
        return true;
        
        
            
            

    }

    const handleChange=(event)=>{
        setValues({ ...values,[event.target.name]:event.target.value});

    }
  return (
    <>
    <div class="FormCont">
        <form onSubmit={(event)=>handleSubmit(event)}>
           <div className="logo">
            
            <h1>MEDIADASH</h1>
            
           </div>
           <input type="text" placeholder="Username" name="username" onChange={(e)=>handleChange(e)} min="3"/>
           <input type="password" placeholder="Password" name="password" onChange={(e)=>handleChange(e)}/>
           <button type="submit">Login</button>
           <span> not a user? <Link to='/signup'>Signup</Link></span>
        </form>
    </div>
    <ToastContainer/>
    </>

  )
}

export default Login;
