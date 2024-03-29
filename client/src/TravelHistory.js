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
        <div className='base-layout'>
            <div className='slim-container'>
                <h1 className='text-center'>Travel History</h1>
                <Link to={'/home'} className="btn btn-success w-10">Return</Link>
                <h2>Below is the list of the travels you applied for:</h2>
                {travelApplications.length === 0 ? (
                    <p className='text-center warning-message'>You haven't made any travel applications.</p>
                ) : (
                    travelApplications.map((application, index) => (
                        <div key={index} className='travel-history-container'>
                            <div className='history-image-container'>
                                <img src='./images/travelicon.png' className='scale-image' alt='Travel Icon'/>
                            </div>
                            <p className='small-container-text'>Start Date: {application.startDate}</p>
                            <p className='small-container-text'>End Date: {application.endDate}</p>
                            <p className='small-container-text'>Travel: {application.travelId.title}</p>
                            <p className='small-container-text'>Category: {application.travelId.category}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default TravelHistory;