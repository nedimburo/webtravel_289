import React, { useState, useEffect } from 'react';
import LogoutButton from "./LogoutButton";
import { Link } from 'react-router-dom';
import axios from "axios";

function Admin(){
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("user")));
    const [users, setUsers] = useState([]);
    const [travels, setTravels] = useState(null);

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

    useEffect(()=>{
        axios.get('http://localhost:3001/travel/get-travels')
        .then(response=>setTravels(response.data))
        .catch(error=>console.error("Error fetching travel informations", error));
    }, []);

    const handleStatus=async(id, type)=>{
        try{
            if (type==="OFF"){
                await axios.put("http://localhost:3001/user/deactivate-user/"+id);
            }
            if (type==="ON"){
                await axios.put("http://localhost:3001/user/activate-user/"+id);
            }
            window.location.reload();
        }catch(err){
            console.log(err);
        }
    }

    if (!userInfo){
        return <div>Loading Loggedin User Information...</div>
    }

    if (!travels){
        return <div>Loading Travels...</div>
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
            <Link to={'/create-travel'} className="btn btn-success w-10">Create New Travel</Link>
            <h2>Registered Users:</h2>
            {users.map((user, index)=>(
                <div key={index}>
                    <p>{user._id}</p>
                    <p>{user.username}</p>
                    <p>{user.email}</p>
                    <Link to={`/update-user/${user._id}`} className='btn btn-primary w-10'>UPDATE</Link>
                    {user.status==="ACTIVE" ? (
                        <button className="btn btn-danger" onClick={e=>handleStatus(user._id, "OFF")}>DEACTIVATE</button>
                        ) : (
                        <button className="btn btn-danger" onClick={e=>handleStatus(user._id, "ON")}>ACTIVATE</button>
                    )}
                </div>
            ))}
            <h2>Travel Offers:</h2>
            {travels.length === 0 ? (
                <p>No travels have been created.</p>
            ) : (
                travels.map((travel, index) => (
                    <div key={index}>
                        <p>{travel.title}</p>
                        <p>{travel.category}</p>
                        <button className='btn btn-primary w-10'>DETAILS</button>
                        <Link to={`/update-travel/${travel._id}`} className='btn btn-primary w-10'>UPDATE</Link>
                    </div>
                ))
            )}
        </div>
    )
}

export default Admin;