import React from 'react'
import './home.scss'
import { Link } from 'react-router-dom';
import Login from '../login/login';
function Home() {


  return (
    <div>
        <h1>
          Welcome to Task Manager<br/>
          <button><Link to="/register">Register</Link></button><br/>
          <button><Link to="/login">Login</Link></button><br/>
        </h1>
    </div>
  )
}

export default Home;