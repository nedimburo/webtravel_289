import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register(){
    const [username, setUsername]=useState();
    const [email, setEmail]=useState();
    const [password, setPassword]=useState();
    const [firstName, setFirstName]=useState();
    const [lastName, setLastName]=useState();
    const navigate=useNavigate();

    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:3001/user/register', {username, email, password, firstName, lastName})
        .then(response=>{
            console.log("Server response:", response.data);
            if (response.status===201){
                alert(response.data.message);
                navigate("/login");
            }
        })
        .catch(error=>{
            console.log(error);
            alert(error.response.data.message);
        });
    }

    return(
        <div className="base-layout">
            <div className="base-container">
                <h2 className="text-center">REGISTRATION</h2>
                <p className="text-center font-italic">Fill out the form to create an account.</p>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input type="text" placeholder="Enter Username here..." name="username"
                        onChange={(e)=>setUsername(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" placeholder="Enter Email here..." name="email"
                        onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" placeholder="Enter Password here..." name="password"
                        onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="firstName">First Name:</label>
                        <input type="text" placeholder="Enter First Name here..." name="firstName"
                        onChange={(e)=>setFirstName(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name:</label>
                        <input type="text" placeholder="Enter Last Name here..." name="lastName"
                        onChange={(e)=>setLastName(e.target.value)}/>
                    </div>
                    <button type="submit" className="btn btn-success w-10">Register</button>
                </form>
                <div className="base-additional-container">
                    <p>Already have an account?</p>
                    <Link to={'/login'} className="btn btn-warning w-10">Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Register;