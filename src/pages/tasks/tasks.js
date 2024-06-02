import React, { useState, useEffect } from 'react';
import './tasks.scss';
import Navbar from '../../components/navbar/navbar';
import Sidebar from '../../components/sidebar/sidebar';
import Search from '../../components/search/search';
import axios from 'axios';
import Taskcreate from '../../components/taskcreate/taskcreate';

export default function Tasks() {
  const [isCreateWindowOpen, setIsCreateWindowOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null); // Track the ID of the task being edited
  const [searchQuery, setSearchQuery] = useState('');
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (!accessToken) {
          throw new Error("Access token is missing.");
        }

        const response = await axios.get(`user/usertasks`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        const data = response.data;

        if (data && data.length > 0) {
          setTasks(data);
        } else {
          throw new Error("No tasks found for the user.");
        }
      } catch (error) {
        console.error("Error fetching user tasks:", error);
        alert("An error occurred while fetching tasks.");
      }
    };

    fetchTasks();
  }, [accessToken]);

  const openWindow = () => {
    setIsCreateWindowOpen(true);
  };

  const closeWindow = () => {
    setIsCreateWindowOpen(false);
  };

  const startEditingTask = (taskId) => {
    setEditingTaskId(taskId);
  };

  const cancelEditingTask = () => {
    setEditingTaskId(null);
  };

  const saveEditedTask = async (editedTaskData) => {
    try {
      // Send a PUT request to update the task data
      await axios.put(`user/tasksupdate`, {
        taskId: editedTaskData._id,
        name: editedTaskData.name,
        description: editedTaskData.description,
        date: editedTaskData.date,
        time: editedTaskData.time,
        completed: editedTaskData.completed // Include completed status in the update
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      // Update the task data locally if needed
      // ...

      setEditingTaskId(null);
      window.location.reload();
    } catch (error) {
      console.error("Error updating task:", error);
      alert("An error occurred while updating the task.");
    }
  };

  const deleteTask = async (taskId) => {
    try {
      // Send a DELETE request to delete the task
      await axios.delete(`user/tasksdelete`, {
        data: {
          taskId: taskId
        },
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      // Remove the deleted task from the local state
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("An error occurred while deleting the task.");
    }
  };

  const toggleTaskCompletion = async (taskId, completed) => {
    try {
      await axios.put(`user/taskscomplete`, {
        taskId: taskId,
        completed: !completed // Toggle the completion status
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
  
      if (!completed) {
        // Remove the completed task from the list
        setTasks(tasks.filter(task => task._id !== taskId));
      }
    } catch (error) {
      console.error("Error toggling task completion:", error);
      alert("An error occurred while toggling task completion.");
    }
  };
  

  const handleDelete = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(taskId);
    }
  };

  const handleEdit = (taskId) => {
    startEditingTask(taskId);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Filter tasks based on search query
  // Filter tasks based on search query and completion status
const filteredTasks = tasks.filter(task =>
  task.name.toLowerCase().includes(searchQuery.toLowerCase()) && !task.completed
);

  return (
    <div className='tasks'>
      <Navbar />
      <br />
      <div className='bodies'>
        <div className='side'>
          <Sidebar />
        </div>
        <div className='task'>
          <div className='starting'>
            <Search className='search' onSearch={handleSearch} />
            <button onClick={openWindow}>ADD TASK</button>
          </div>
          <br/>
          <h1>To Do Tasks</h1>
          <br/>
          <div className="tasking">
            {filteredTasks.map(task => (
              <div className="row" key={task._id}>
                {editingTaskId === task._id ? (
                  <TaskEditForm task={task} onSave={saveEditedTask} onCancel={cancelEditingTask} />
                ) : (
                  <Task
                    task={task}
                    onDelete={() => handleDelete(task._id)}
                    onEdit={() => handleEdit(task._id)}
                    onToggleCompletion={() => toggleTaskCompletion(task._id, task.completed)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Conditionally render Taskcreate */}
      {isCreateWindowOpen && <Taskcreate closewindow={closeWindow} />}
    </div>
  );
}

// Task component to display task details and buttons for edit, delete, and completion
function Task({ task, onDelete, onEdit, onToggleCompletion }) {
  return (
    <div className="col">
      <div className="tasks">
        <p>{task.name}</p>
        <p>{task.description}</p>
        <p>Due Date: {task.date}</p> {/* Display due date */}
        <p>Due Time: {task.time}</p> {/* Display due time */}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={onToggleCompletion}
        /> Completed &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={onEdit} className='editbutton' >Edit</button>&nbsp;
        <button onClick={onDelete} className='deletebutton'>Delete</button>
      </div>
    </div>
  );
}

// TaskEditForm component to edit task details including due date and time
function TaskEditForm({ task, onSave, onCancel }) {
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedTask);
  };

  return (
    <div className="col">
      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input
            type="text"
            id="title"
            name="title"
            value={editedTask.title}
            onChange={handleChange}
            className="form-control"
          />
        </div><br/>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={editedTask.description}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <br/>
        <div className="form-group">
          <label htmlFor="date">Due Date:</label>&nbsp;&nbsp;&nbsp;
          <input
            type="date"
            id="date"
            name="date"
            value={editedTask.date}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <br/>
        <div className="form-group">
          <label htmlFor="time">Due Time:</label>&nbsp;&nbsp;&nbsp;
          <input
            type="time"
            id="time"
            name="time"
            value={editedTask.time}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <br/>
        <div className="button-group">
          <button type="submit" className="btn btn-primary savebutton" >
            Save
          </button>&nbsp;&nbsp;&nbsp;
          <button type="button" onClick={onCancel} className="btn btn-secondary cancelbutton" >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
