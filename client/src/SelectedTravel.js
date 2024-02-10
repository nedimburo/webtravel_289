import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function SelectedTravel(){
    const {travelId}=useParams();
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("user")));
    const [selectedTravel, setSelectedTravel] = useState(null);

    useEffect(() => {
        setUserInfo(JSON.parse(localStorage.getItem("user")));
    }, []);

    useEffect(()=>{
        axios.get('http://localhost:3001/travel/get-selected-travel/'+travelId)
        .then(response=>setSelectedTravel(response.data.travel))
        .catch(error=>console.error("Error fetching travel information", error));
    }, []);

    if (!selectedTravel){
        return <div>Loading Selected Travel...</div>
    }

    return(
        <div>
            <h1>Travel Details</h1>
            <h2>Title: {selectedTravel.title}</h2>
            <p>Description: {selectedTravel.description}</p>
            <p>Category: {selectedTravel.category}</p>
            <p>Price: {selectedTravel.price}</p>
            <h2>Questions:</h2>
        </div>
    )
}

export default SelectedTravel;