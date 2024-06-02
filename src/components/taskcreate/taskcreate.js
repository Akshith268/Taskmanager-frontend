import React, { useEffect, useState } from 'react';
import './taskcreate.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  

export default function Taskcreate({ closewindow }) {
  const [task, setTask] = useState({ name: "", description: "", date: "", time: "" });
  const accessToken = localStorage.getItem("accessToken");
  const userDataString = localStorage.getItem("user");
   
  const navigate = useNavigate();
  if(!accessToken || !userDataString) {
    alert("You need to be logged in to access this page.");
    navigate('/login');
  }


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleCreateTask = async (event) => {
    event.preventDefault(); // Prevent form submission

    try{
      const userData = JSON.parse(userDataString);
      const response = await axios.post("tasks/create", {
        name: task.name,
        description: task.description,
        date: task.date,
        time: task.time,
        userId: userData._id
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      const data = response.data;
      console.log(data);
      if(data.status === "ok"){
        alert("Task created successfully!");
        closewindow();
        window.location.reload();
      }
      else{
        alert(data);
        closewindow();
      }
        
    }
    catch(error){
      console.error("Error creating task:", error);
      alert("An error occurred while creating the task.");
    }
    
   window.location.reload();
    closewindow(); // Close the task creation window
  };

  const handleCancel = () => {
    closewindow(); // Close the task creation window
  };

  return (
    <div className='taskcreate-overlay'>
      <div className='taskcreate-form'>
        <form onSubmit={handleCreateTask}>
          <input
            type='text'
            name='name'
            value={task.name}
            onChange={handleInputChange}
            placeholder='Task Name'
          />
          <input
            type='text'
            name='description'
            value={task.description}
            onChange={handleInputChange}
            placeholder='Task Description'
          />
          <input
            type='date'
            name='date'
            value={task.date}
            onChange={handleInputChange}
            placeholder='Task Date'
          />
          <input
            type='time'
            name='time'
            value={task.time}
            onChange={handleInputChange}
            placeholder='Task Time'
          />
          <button type='submit'>Create Task</button>
          <button type='button' className='cancel' onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
