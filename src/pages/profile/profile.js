// Profile.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import Sidebar from '../../components/sidebar/sidebar';
import './profile.scss'; // Import your CSS file for styling

export default function Profile() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        const userDataString = localStorage.getItem("user");

        if (!accessToken || !userDataString) {
            alert("You need to be logged in to access this page.");
            navigate('/login');
        } else {
            try {
                const userData = JSON.parse(userDataString);
                if (userData) {
                    setUsername(userData.username);
                    setEmail(userData.email);
                } else {
                    console.error("User data is undefined:", userDataString);
                    alert("An error occurred while fetching user data.");
                    navigate('/login');
                }
            } catch (error) {
                console.error("Error parsing user data:", error);
                alert("An error occurred while parsing user data.");
                navigate('/login');
            }
        }
    }, [navigate]);
  
    return (
        <div className="profile-container">
            <Navbar />
            <div className="bodies">
                <div className="side">
                    <Sidebar />
                </div>
                <div className="profile-content">
                    <h1 className="profile-title">Profile</h1>
                    <div className="profile-details">
                        <div className="profile-item">
                            <h2>Username:</h2>
                            <p>{username}</p>
                        </div>
                        <div className="profile-item">
                            <h2>Email:</h2>
                            <p>{email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
