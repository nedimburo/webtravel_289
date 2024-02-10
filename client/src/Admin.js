import React, { useState, useEffect } from 'react';
import LogoutButton from "./LogoutButton";
import { Link } from 'react-router-dom';
import axios from "axios";

function Admin(){
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("user")));
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setUserInfo(JSON.parse(localStorage.getItem("user")));
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/user/get-users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error.message);
            }
        };

        fetchUsers();
    }, []);

    if (!userInfo){
        return <div>Loading Loggedin User Information...</div>
    }

    if (!users){
        return <div>Loading Users...</div>
    }
    
    return(
        <div>
            <h1>Admin Page</h1>
            <p>Admin: {userInfo.username}</p>
            <LogoutButton />
            <Link to={'/create-user'} className="btn btn-success w-10">Create New User</Link>
            <h2>Registered Users:</h2>
            {users.map(user=>(
                <div>
                    <p>{user._id}</p>
                    <p>{user.username}</p>
                    <p>{user.email}</p>
                    <button>UPDATE</button>
                    <button>DELETE</button>
                </div>
            ))}
        </div>
    )
}

export default Admin;