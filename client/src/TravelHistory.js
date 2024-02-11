import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

function TravelHistory(){
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("user")));
    const [travelApplications, setTravelApplications] = useState(null);

    useEffect(() => {
        setUserInfo(JSON.parse(localStorage.getItem("user")));
    }, []);

    useEffect(()=>{
        axios.get('http://localhost:3001/application/get-user-applications/'+userInfo._id)
        .then(response=>setTravelApplications(response.data.applications))
        .catch(error=>console.error("Error fetching user applications information", error));
    }, [userInfo._id]);

    if (!userInfo){
        return <div>Loading Loggedin User Information...</div>
    }

    if (!travelApplications){
        return <div>Loading Travel Applications Information...</div>
    }

    return(
        <div>
            <h1>Travel History</h1>
            <Link to={'/home'} className="btn btn-success w-10">Return</Link>
            <h2>Below is the list of the travels you applied for:</h2>
            {travelApplications.length === 0 ? (
                <p>No travel applications created.</p>
            ) : (
                travelApplications.map((application, index) => (
                    <div key={index}>
                        <p>Start Date: {application.startDate}</p>
                        <p>End Date: {application.endDate}</p>
                        <p>Travel: {application.travelId.title}</p>
                        <p>Category: {application.travelId.category}</p>
                    </div>
                ))
            )}
        </div>
    )
}

export default TravelHistory;