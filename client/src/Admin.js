import React, { useState, useEffect } from 'react';
import LogoutButton from "./LogoutButton";

function Admin(){
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("user")));

    useEffect(() => {
        setUserInfo(JSON.parse(localStorage.getItem("user")));
    }, []);

    if (!userInfo){
        return <div>Loading Loggedin User Information...</div>
    }
    
    return(
        <div>
            <h1>Admin Page</h1>
            <p>Admin: {userInfo.username}</p>
            <LogoutButton />
        </div>
    )
}

export default Admin;