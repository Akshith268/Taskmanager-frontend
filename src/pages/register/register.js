import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./register.scss";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    if (!username || !email || !password || !confirmpassword) {
      setError("All fields are required.");
      return false;
    }
    if (password !== confirmpassword) {
      setError("Passwords do not match.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email.");
      return false;
    }
    return true;
  };

  const registerfunc = async (e) => {
    e.preventDefault();
    
    // Reset error before submission
    setError("");

    // Validate form inputs
    if (!validateForm()) return;

    try {
      const response = await axios.post("http://localhost:8000/api/auth/register", {
        username: username,
        email: email,
        password: password,
        confirmpassword: confirmpassword,
      });

      const res = await response.data;
      if (res.status === "ok") {
        navigate('/login');
      } else {
        setError(res.message || "Something went wrong, please try again.");
      }
    } catch (err) {
      console.log(err);
      setError("Network error. Please try again later.");
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={registerfunc}>
        {error && <div className="error-message">{error}</div>}
        
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        
        <input
          type="password"
          value={confirmpassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />
        
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
