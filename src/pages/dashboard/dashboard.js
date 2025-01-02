// pages/dashboard/dashboard.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar/navbar';
import Sidebar from '../../components/sidebar/sidebar';
import './dashboard.scss';
import { FaTasks } from "react-icons/fa";
import Search from '../../components/search/search';
import { TiTick } from "react-icons/ti";

export default function Dashboard() {
  const [taskCount, setTaskCount] = useState(0);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchTaskCounts = async () => {
      try {
        // Fetch the total number of tasks
        const responseTasks = await axios.get(`user/usertasks`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        const totalTasks = responseTasks.data.length;

        // Fetch the number of completed tasks
        const responseCompletedTasks = await axios.get(`user/completedtasks`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        const completedTasks = responseCompletedTasks.data.length;

        // Update the counts with animation
        updateCounts(totalTasks, completedTasks);
      } catch (error) {
        console.error('Error fetching task counts:', error);
      }
    };

    // Call the fetchTaskCounts function initially and on every update
    fetchTaskCounts();
  }, [accessToken]);

  const updateCounts = (totalTasks, completedTasks) => {
    // Calculate the increment for each count
    const incrementTasks = Math.ceil(totalTasks / 50); // Increment tasks by 2% of the total count
    const incrementCompletedTasks = Math.ceil(completedTasks / 50); // Increment completed tasks by 2% of the completed count

    // Update task count
    const taskCountInterval = setInterval(() => {
      setTaskCount((prevCount) => {
        const nextCount = prevCount + incrementTasks;
        return nextCount >= totalTasks ? totalTasks : nextCount; // Stop incrementing when reaching the total count
      });
    }, 100);

    // Update completed task count
    const completedTaskCountInterval = setInterval(() => {
      setCompletedTaskCount((prevCount) => {
        const nextCount = prevCount + incrementCompletedTasks;
        return nextCount >= completedTasks ? completedTasks : nextCount; // Stop incrementing when reaching the completed count
      });
    }, 100);

    // Clear intervals when counts reach their respective targets
    if (taskCount === totalTasks && completedTaskCount === completedTasks) {
      clearInterval(taskCountInterval);
      clearInterval(completedTaskCountInterval);
    }
  };

  // Function to handle search
  const handleSearch = async (searchTerm) => {
    try {
      const response = await axios.get(`http://localhost:8000?search=${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setFilteredTasks(response.data);
    } catch (error) {
      console.error('Error searching tasks:', error);
    }
  };

  return (
    <div className="dashboard">
      <Navbar />
      <div className='bodies'>
        <Sidebar />
        <div className='task'>
          <div className='starting'>
            <Search onSearch={handleSearch} />
          </div>
          <h1 className="dashboard-title">Dashboard</h1>
          <div className="task-counts">
            <h2 className={`total-tasks ${taskCount !== 0 ? 'count-animation' : ''}`}>Total Tasks: {taskCount} &nbsp; &nbsp; <FaTasks /></h2>
            <h2 className={`completed-tasks ${completedTaskCount !== 0 ? 'count-animation' : ''}`}>Completed Tasks: {completedTaskCount}&nbsp;&nbsp;<TiTick /></h2>
          </div>
        </div>
      </div>
    </div>
  );
}
