import React, { useState, useEffect } from 'react';
import LogoutButton from "./LogoutButton";
import { Link } from 'react-router-dom';
import axios from "axios";

function Home(){
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("user")));
    const [travels, setTravels] = useState(null);

    useEffect(() => {
        setUserInfo(JSON.parse(localStorage.getItem("user")));
    }, []);

    useEffect(()=>{
        axios.get('http://localhost:3001/travel/get-travels')
        .then(response=>setTravels(response.data))
        .catch(error=>console.error("Error fetching travel informations", error));
    }, []);

    if (!userInfo){
        return <div>Loading Loggedin User Information...</div>
    }

    if (!travels){
        return <div>Loading Travels...</div>
    }

    return(
        <div>
            <h1>Home Page</h1>
            <p>User: {userInfo.username}</p>
            <LogoutButton />
            <h2>Travel Offers:</h2>
            {travels.length === 0 ? (
                <p>No travels currently available.</p>
            ) : (
                travels.map((travel, index) => (
                    <div key={index}>
                        <p>{travel.title}</p>
                        <p>{travel.category}</p>
                        <Link to={`/selected-travel/${travel._id}`} className='btn btn-primary w-10'>DETAILS</Link>
                    </div>
                ))
            )}
        </div>
    )
}

export default Home;