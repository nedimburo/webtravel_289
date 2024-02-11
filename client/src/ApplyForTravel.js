import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from "axios";

function ApplyForTravel(){
    const { travelId } = useParams();
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("user")));
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const navigate=useNavigate();

    useEffect(() => {
        setUserInfo(JSON.parse(localStorage.getItem("user")));
    }, []);

    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:3001/application/create-application', {
            startDate: startDate,
            endDate: endDate,
            userId: userInfo._id,
            travelId: travelId,
        })
        .then(response => {
            console.log("Server response:", response.data);
            if (response.status===201){
                alert(response.data.message);
                navigate("/home");
            }
        })
        .catch(error => {
            console.log(error);
            alert(error.response.data.message);
        });
    };

    if (!userInfo){
        return <div>Loading Loggedin User Information...</div>
    }

    return(
        <div className='base-layout'>
            <div className='base-container'>
                <h2 className='text-center'>CREATE TRAVEL APPLICATION</h2>
                <Link to={'/home'} className='btn btn-warning w-10'>Return</Link>
                <p className='mt-2'>Choose the dates when you want to plan the travel.</p>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="startDate">Start Date:</label>
                        <input type="date" name="startDate" onChange={(e) => setStartDate(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="endDate">End Date:</label>
                        <input type="date" name="endDate" onChange={(e) => setEndDate(e.target.value)}/>
                    </div>
                    <button type="submit" className='btn btn-success w-10'>APPLY</button>
                </form>
            </div>
        </div>
    )
}

export default ApplyForTravel;