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

    const handleTravelDelete=async(id)=>{
        axios.delete(`http://localhost:3001/travel/delete-travel/${id}`)
        .then(response => {
            console.log("Server response:", response.data);
            window.location.reload();
        })
        .catch(error => {
            console.log(error);
            alert(error.response.data.message);
        });
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
        <div className='base-layout'>
            <div className='slim-container'>
                <h1>Admin Page</h1>
                <div className='admin-header-buttons-container'>
                    <Link to={'/create-user'} className="btn btn-success w-10">Create New User</Link>
                    <Link to={'/create-travel'} className="btn btn-success w-10">Create New Travel</Link>
                    <LogoutButton />
                </div>
                <h2>Registered Users:</h2>
                {users.map((user, index)=>(
                    <div key={index} className='user-admin-container'>
                        <div className='user-admin-image-container'>
                            <img src='/images/usericon.png' className='scale-image' alt='Avatar Icon'/>
                        </div>
                        <p className='small-container-text'>ID: {user._id}</p>
                        <p className='small-container-text'>First Name: {user.firstName}</p>
                        <p className='small-container-text'>Email: {user.email}</p>
                        <p className='small-container-text'>Last Name: {user.lastName}</p>
                        <p className='small-container-text'>Username: {user.username}</p>
                        <p className='small-container-text'>Role: {user.role}</p>
                        <div className='user-admin-buttons-container'>
                            <Link to={`/update-user/${user._id}`} className='btn btn-primary w-10'>UPDATE</Link>
                            {user.status==="ACTIVE" ? (
                                <button className="btn btn-danger" onClick={e=>handleStatus(user._id, "OFF")}>DEACTIVATE</button>
                                ) : (
                                <button className="btn btn-danger" onClick={e=>handleStatus(user._id, "ON")}>ACTIVATE</button>
                            )}
                        </div>
                    </div>
                ))}
                <h2>Travel Offers:</h2>
                {travels.length === 0 ? (
                    <p>No travels have been created.</p>
                ) : (
                    travels.map((travel, index) => (
                        <div key={index} className='travel-admin-container'>
                            <div className='travel-admin-image-container'>
                                <img src='./images/travelicon.png' className='scale-image' alt='Travel Icon'/>
                            </div>
                            <p className='small-container-text larger-font'>Title: {travel.title}</p>
                            <p className='small-container-text larger-font'>Category: {travel.category}</p>
                            <div className='travel-admin-buttons-container'>
                                <Link to={`/selected-travel/${travel._id}`} className='btn btn-primary w-10'>DETAILS</Link>
                                <Link to={`/update-travel/${travel._id}`} className='btn btn-primary w-10'>UPDATE</Link>
                                <button className="btn btn-danger" onClick={e=>handleTravelDelete(travel._id)}>DELETE</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Admin;