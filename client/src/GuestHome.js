import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

function GuestHome(){
    const [travels, setTravels] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(()=>{
        axios.get('http://localhost:3001/travel/get-travels')
        .then(response=>setTravels(response.data))
        .catch(error=>console.error("Error fetching travel informations", error));
    }, []);

    const filteredTravels = selectedCategory
    ? travels.filter((travel) => travel.category === selectedCategory)
    : travels;

    if (!travels){
        return <div>Loading Travels...</div>
    }

    return(
        <div className='base-layout'>
            <div className='home-container'>
                <h1 className='text-center'>Travel Agency WebTravel 289</h1>
                <div className='loggedin-info-container'>
                    <p>Hello, Guest</p>
                    <Link to={'/login'} className="btn btn-success w-10">LOGIN</Link>
                </div>
                <div className='home-main-image-container'>
                    <img src='/images/travelagency.jpeg' className='scale-image' alt='Travel Agency Image'/>
                </div>
                <h2 className='text-center'>About us:</h2>
                <div className='about-us-container'>
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Aliquam pulvinar iaculis dictum. Vestibulum laoreet, sem 
                        vel rhoncus eleifend, tortor dui scelerisque lorem, non 
                        finibus tortor leo non mi. Cras suscipit ante eget velit 
                        tincidunt, eu viverra dui elementum. Cras semper felis a 
                        augue malesuada aliquam. Ut fermentum et metus eu pellentesque. 
                        Maecenas erat tellus, euismod nec elit sed, rhoncus malesuada purus. 
                        Morbi pharetra orci nisl, vulputate tempus dui facilisis non. 
                        Suspendisse vulputate tortor ut ultrices venenatis."</p>
                </div>
                <h2 className='text-center'>Travel Offers:</h2>
                <div className='text-center filter-buttons-container'>
                    <p className='small-container-text'>Filter by:</p>
                    <button onClick={() => setSelectedCategory('Europe')} className='btn btn-success'>Europe</button>
                    <button onClick={() => setSelectedCategory('America')} className='btn btn-success'>America</button>
                    <button onClick={() => setSelectedCategory('Australia')} className='btn btn-success'>Australia</button>
                    <button onClick={() => setSelectedCategory('Asia')} className='btn btn-success'>Asia</button>
                    <button onClick={() => setSelectedCategory('Africa')} className='btn btn-success'>Africa</button>
                    <button onClick={() => setSelectedCategory('Short Trips')} className='btn btn-success'>Short Trips</button>
                    <button onClick={() => setSelectedCategory('Long Trips')} className='btn btn-success'>Long Trips</button>
                    <button onClick={() => setSelectedCategory('Summer')} className='btn btn-success'>Summer</button>
                    <button onClick={() => setSelectedCategory('Winter')} className='btn btn-success'>Winter</button>
                    <button onClick={() => setSelectedCategory('')} className='btn btn-warning'>RESET</button>
                </div>
                {filteredTravels.length === 0 ? (
                    <p className='text-center warning-message'>No travels currently available.</p>
                ) : (
                    filteredTravels.map((travel, index) => (
                        <div key={index} className='travel-home-container'>
                            <div className='travel-home-image-container'>
                                <img src='./images/travelicon.png' className='scale-image' alt='Travel Icon'/>
                            </div>
                            <p className='small-container-text larger-font'>Title: {travel.title}</p>
                            <p className='small-container-text larger-font'>Category: {travel.category}</p>
                            <div className='travel-home-buttons-container'>
                                <Link to={`/selected-travel/${travel._id}`} className='btn btn-primary w-10'>DETAILS</Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default GuestHome;