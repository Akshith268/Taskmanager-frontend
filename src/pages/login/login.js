import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.scss'; // Import the CSS file

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://taskmanager-backend-1-on7y.onrender.com/api/auth/login", {
                email: email,
                password: password
            });
            const data = response.data;
            if (data.status === "ok") {
                localStorage.setItem("accessToken", data.accessToken);
                localStorage.setItem("user", JSON.stringify(data));
                navigate('/profile');
            } else {
                alert(data);
            }
        } catch (error) {
            console.error("Error logging in:", error);
            alert("An error occurred while logging in.");
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1><br/><br/>
            <form onSubmit={login}>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email" 
                /><br/><br/>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password" 
                /><br/><br/>
                <button type='submit'>Login</button>
            </form>
        </div>
    );
}
