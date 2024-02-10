import React from "react";
import { useNavigate } from "react-router-dom";

function LogoutButton(){

    const navigate=useNavigate();

    const handleLogout=()=>{
        localStorage.removeItem("user");
        console.log('Logout successful');
        navigate("/login");
    }

    return(
        <button onClick={handleLogout} className="btn btn-danger">LOGOUT</button>
    )
}

export default LogoutButton;