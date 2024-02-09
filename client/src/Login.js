import React from "react";
import { Link } from "react-router-dom";

function Login(){
    return(
        <div>
            <h2>LOGIN</h2>
            <form action="">
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="Enter Email here..." name="email"/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter Password here..." name="password"/>
                </div>
                <button type="submit" className="btn btn-success w-10">Login</button>
                <Link to={'/register'} className="btn btn-warning w-10">Create an account</Link>
            </form>
        </div>
    )
}

export default Login;