import React from 'react';

export default function Tasks({ task ,key }) {
     
    //  const func= (async()=>{
        
    //  })
  return (
    <div className='tasking'>
      
        <div className='task' key={task._id}>
          <div className='card'>
            <div className='card-body'>
              <h5 className='card-title'>{task.name}</h5>
              <p className='card-text'>{task.description}</p>
              <span>Due date: {task.date}</span><br/>
              {/* Add more details if needed */}
              {/* <button className='btn btn-primary' >Edit</button> &nbsp; */}
              {/* <button className='btn btn-danger'>Delete</button> */}
            </div>
          </div>
        </div>
    </div>
  );
}
