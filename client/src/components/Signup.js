import React,{useState,useEffect} from 'react'
import {Link,useNavigate} from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { signupRoute } from '../APIRoutes';
import './Signup.css';
const Signup = () => {
const navigate=useNavigate();
    const [values,setValues]=useState({
        username:"",
        email:"",
        password:"",
        confirmpassword:""
    });
    


    const handleSubmit=async(event)=>{
        event.preventDefault();
        if(handleValidation()){
            console.log("in validation",signupRoute);
            const {password,confirmpassword,username,email}=values;
            const {data}=await axios.post(signupRoute,{
                username,email,password,
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
    //     if(localStorage.getItem('chat-app-user')){
    //       navigate('/');
    //     }
    //   },[])
    
    const toastOptions={
        position:'bottom-right',
        autoClose:7000,
        pauseOnHover:true,
        draggable:true,
        theme:"dark"
    };
    const handleValidation=()=>{
        const {password,confirmpassword,username,email}=values;
        
        if(password!==confirmpassword){
                console.log('inm validation',toast);
                toast.error("password didn't match",toastOptions);
                return false;
        }
        else if(username.length>0 && username.length<3){
                toast.error("Username should have greater than 3 characters",toastOptions);
                return false;
        }
        else if(username==="")
        {
            toast.error("Please fill the username",toastOptions);
            return false;
        }
        else if(email===""){
            toast.error("email is required",toastOptions);
            return false;
        }
        else if(email.length>0 && email.length<3){
            toast.error("Email should have greater than 3 characters",toastOptions);
            return false;
        }
        else if(password.length<8 && password.length>0){
            toast.error("Password should have greater than 8 characters",toastOptions);
            return false;
        }
        
        else if(password.length===0)
        {
            toast.error("Please fill the password",toastOptions);
            return false;
        }
        
        return true;
        
        
            
            

    }

    const handleChange=(event)=>{
        setValues({ ...values,[event.target.name]:event.target.value});

    }
  return (
    <>
    <div class="FormContainer">
        <form onSubmit={(event)=>handleSubmit(event)}>
           <div className="logo">
            <h1>MEDIADASH</h1>
            
           </div>
           <input type="text" placeholder="Username" name="username" onChange={(e)=>handleChange(e)}/>
           <input type="email" placeholder="Email" name="email" onChange={(e)=>handleChange(e)}/>
           <input type="password" placeholder="Password" name="password" onChange={(e)=>handleChange(e)}/>
           <input type="password" placeholder="Confirm password" name="confirmpassword" onChange={(e)=>handleChange(e)}/>
           <button type="submit">Create User</button>
           <span>Already have an account? <Link to='/'>Login</Link></span>
        </form>
    </div>
    <ToastContainer/>
    </>

  )
}

export default Signup
