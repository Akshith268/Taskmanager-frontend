import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.scss';

export default function Sidebar() {
  return (
    <div className='sidebar'>
      <ul>
        {/* Wrap each list item with a Link component */}
        <Link className='links' to="/dashboard"><li><Link to="/dashboard">Dashboard</Link></li></Link>
        <Link className='links' to="/tasks"><li><Link to="/tasks">Tasks</Link></li></Link>
        <Link className='links' to="/completed"><li><Link to="/completed">Completed</Link></li></Link>
         <Link className='links' to="/teams"><li><Link to="/teams">Teams</Link></li></Link>
        <Link className='links' to="/profile"><li><Link to="/profile">Profile</Link></li></Link>
      </ul>
    </div>
  );
}
