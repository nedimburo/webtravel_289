import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

function GuestHome(){
    const [travels, setTravels] = useState(null);

    useEffect(()=>{
        axios.get('http://localhost:3001/travel/get-travels')
        .then(response=>setTravels(response.data))
        .catch(error=>console.error("Error fetching travel informations", error));
    }, []);

    if (!travels){
        return <div>Loading Travels...</div>
    }

    return(
        <div>
            <h1>Travel Agency</h1>
            <p>Hello, Guest</p>
            <Link to={'/login'} className="btn btn-success w-10">LOGIN</Link>
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

export default GuestHome;