import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function UpdateUser(){
    const {userId}=useParams();
    const [selectedUser, setSelectedUser]=useState(null);
    const [username, setUsername]=useState();
    const [email, setEmail]=useState();
    const [password, setPassword]=useState();
    const [firstName, setFirstName]=useState();
    const [lastName, setLastName]=useState();
    const navigate=useNavigate();

    useEffect(()=>{
        axios.get('http://localhost:3001/user/get-selected-user/'+userId)
        .then(response=>{
            setSelectedUser(response.data.user);
            setUsername(response.data.user.username);
            setEmail(response.data.user.email);
            setPassword(response.data.user.password);
            setFirstName(response.data.user.firstName);
            setLastName(response.data.user.lastName);
        })
        .catch(error=>console.error("Error fetching user information", error))
    }, [userId]);

    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.put('http://localhost:3001/user/update-user/'+userId, {username, email, password, firstName, lastName})
        .then(response=>{
            console.log("Server response:", response.data);
            if (response.status===200){
                alert("User has been successfully updated.");
                navigate("/admin");
            }
        })
        .catch(error=>{
            console.log(error);
            alert(error.response.data.message);
        });
    }

    if (!selectedUser){
        return <div>Loading Selected User Information...</div>
    }

    return(
        <div className="base-layout">
            <div className="base-container">
                <h2 className="text-center">UPDATE USER</h2>
                <Link to={'/admin'} className="btn btn-warning w-10">Return</Link>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input type="text" placeholder="Enter new Username here..." name="username"
                        onChange={(e)=>setUsername(e.target.value)} value={username}/>
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" placeholder="Enter new Email here..." name="email"
                        onChange={(e)=>setEmail(e.target.value)} value={email}/>
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" placeholder="Enter new Password here..." name="password"
                        onChange={(e)=>setPassword(e.target.value)} value={password}/>
                    </div>
                    <div>
                        <label htmlFor="firstName">First Name:</label>
                        <input type="text" placeholder="Enter new First Name here..." name="firstName"
                        onChange={(e)=>setFirstName(e.target.value)} value={firstName}/>
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name:</label>
                        <input type="text" placeholder="Enter new Last Name here..." name="lastName"
                        onChange={(e)=>setLastName(e.target.value)} value={lastName}/>
                    </div>
                    <button type="submit" className="btn btn-success w-10">Update User</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateUser;