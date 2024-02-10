import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function CreateUser(){
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
                alert("User has been successfully created.");
                navigate("/admin");
            }
        })
        .catch(error=>{
            console.log(error);
            alert(error.response.data.message);
        });
    }

    return(
        <div>
            <h2>CREATE NEW USER</h2>
            <Link to={'/admin'} className="btn btn-warning w-10">Return</Link>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" placeholder="Enter Username here..." name="username"
                    onChange={(e)=>setUsername(e.target.value)}/>
                </div>
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
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" placeholder="Enter First Name here..." name="firstName"
                    onChange={(e)=>setFirstName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" placeholder="Enter Last Name here..." name="lastName"
                    onChange={(e)=>setLastName(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-success w-10">Create User</button>
            </form>
        </div>
    )
}

export default CreateUser;