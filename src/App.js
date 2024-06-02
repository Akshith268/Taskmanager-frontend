import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch ,Routes} from 'react-router-dom';
import Home from './pages/home/home';
import Register from './pages/register/register';
import Login from './pages/login/login';
import Tasks from './pages/tasks/tasks';
import Taskcreate from './components/taskcreate/taskcreate';
import { useState } from 'react';
import Profile from './pages/profile/profile';
import Dashboard from './pages/dashboard/dashboard';
import Team from './pages/teams/teams';
import Completed from './pages/completed/completed';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/tasks" element={<Tasks/>} />
        <Route path="/taskcreate" element={<Taskcreate/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/completed" element={<Completed/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/teams" element={<Team/>}/>
         
      </Routes>
    </Router>
  );
}

export default App;
