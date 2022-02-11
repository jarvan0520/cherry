import React from 'react'
import {  useNavigate } from 'react-router-dom';
const Auth = ({authenticate}) => {
    const navigate = useNavigate();
    const onClick =()=>{
        authenticate();
        navigate("/login")
    }
    return (
        <div>
            <h2>please authenticate to continue</h2>
            <button onClick={onClick}>Login in 123</button>
        </div>
    )
}

export default Auth
