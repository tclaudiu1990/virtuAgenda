import { useState } from 'react'
import './App.scss'
import Header from './Components/Header/Header'
import Board from './Components/Board/Board'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { addTask, deleteAllTasks, logSavedTasks } from './Services/taskServices';
import { NewTaskInfo } from './types/NewTaskInfo';

function App() {

  const addNewTask = () => {
    const newTask:NewTaskInfo = {
      title: "first task ever",       
      description: "This is the first task ever to be stored inside the local storage",    
      startDate: new Date(),        
      deadline: new Date()      
    }
    addTask(newTask);
  }

  return (
    <div id='app'>
      <Header></Header>
      <Board></Board>
      {/* dev buttons */}
      <div className='dev-buttons'>
        <button onClick={()=>addNewTask()}>Add task</button>
        <button onClick={()=>logSavedTasks()}>log all task</button>
        <button onClick={()=>deleteAllTasks()}>delete all task</button>
      </div>

    </div>
  )
}

export default App
