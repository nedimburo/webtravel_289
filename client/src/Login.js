import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login(){
    const [email, setEmail]=useState();
    const [password, setPassword]=useState();
    const navigate=useNavigate();

    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:3001/user/login', {email, password})
        .then(response=>{
            console.log("Server response:", response);
            if (response.status===200){
                navigate("/home");
            }
        })
        .catch(error=>{
            console.log(error);
            alert(error.response.data.message);
        });
    }

    return(
        <div>
            <h2>LOGIN</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="Enter Email here..." name="email"
                    onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter Password here..." name="password"
                    onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-success w-10">Login</button>
                <Link to={'/register'} className="btn btn-warning w-10">Create an account</Link>
            </form>
        </div>
    )
}

export default Login;