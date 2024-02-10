import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function UpdateTravel(){
    const {travelId}=useParams();
    const [travelData, setTravelData] = useState({
        title: "",
        description: "",
        category: "Europe",
        price: 0,
    });

    const handleChange = (e) => {
        setTravelData({ ...travelData, [e.target.name]: e.target.value });
    };

    const navigate=useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:3001/travel/update-travel/'+travelId, travelData)
        .then(response=>{
            console.log("Server response:", response.data);
            if (response.status===201){
                alert(response.data.message);
                navigate("/admin");
            }
        })
        .catch(error=>{
            console.log(error);
            alert(error.response.data.message);
        });
    };

    return(
        <div>
            <h1>UPDATE TRAVEL</h1>
            <Link to={'/admin'} className="btn btn-warning w-10">Return</Link>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input type="text" placeholder="Enter new Title here..." name="title"
                    onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input type="description" placeholder="Enter new Description here..." name="description"
                    onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="category">Choose travel category:</label>
                    <select name="category" onChange={handleChange}>
                        <option value="Europe">Europe</option>
                        <option value="America">America</option>
                        <option value="Australia">Australia</option>
                        <option value="Asia">Asia</option>
                        <option value="Africa">Africa</option>
                        <option value="Short Trips">Short Trips</option>
                        <option value="Long Trips">Long Trips</option>
                        <option value="Summer">Summer</option>
                        <option value="Winter">Winter</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input type="number" step="0.01" placeholder="Enter new Price here..." name="price"
                    onChange={handleChange}/>
                </div>
                <button type="submit" className="btn btn-success w-10">Update Travel</button>
            </form>
        </div>
    )
}

export default UpdateTravel;