import React, { useState, useEffect } from 'react';
import './completed.scss';
import Navbar from '../../components/navbar/navbar';
import Sidebar from '../../components/sidebar/sidebar';
import axios from 'axios';

export default function Completed() {
  const [completedTasks, setCompletedTasks] = useState([]);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      try {
        if (!accessToken) {
          throw new Error("Access token is missing.");
        }

        const response = await axios.get(`https://taskmanager-backend-1-on7y.onrender.com/api/user/completedtasks`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        const data = response.data;

        if (data && data.length > 0) {
          setCompletedTasks(data);
        } else {
          throw new Error("No completed tasks found for the user.");
        }
      } catch (error) {
        console.error("Error fetching completed tasks:", error);
        alert("An error occurred while fetching completed tasks.");
      }
    };

    fetchCompletedTasks();
  }, [accessToken]);

  const markTaskAsIncomplete = async (taskId) => {
    try {
      await axios.put(`http://localhost:8000/api/user/taskscomplete`, {
        taskId: taskId,
        completed: false // Mark the task as incomplete
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      // Remove the task from the completed tasks list
      setCompletedTasks(completedTasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error("Error marking task as incomplete:", error);
      alert("An error occurred while marking task as incomplete.");
    }
  };

  return (
    <div className='completed'>
      <Navbar />
      <br />
      <div className='bodies'>
        <div className='side'>
          <Sidebar />
        </div>
        <div className='completed-tasks'>
          <h1>Completed Tasks</h1>
          <div className="tasking">
            {completedTasks.map(task => (
              <div className="row" key={task._id}>
                <div className="col">
                  <div className="tasks">
                    <p>{task.name}</p>
                    <p>{task.description}</p>
                    <p>Due Date: {task.date}</p>
                    <p>Due Time: {task.time}</p>
                    <button onClick={() => markTaskAsIncomplete(task._id)}>Mark as Incomplete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
