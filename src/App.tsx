import { createContext, useEffect, useState } from 'react'
import './App.scss'
import Header from './Components/Header/Header'
import Board from './Components/Board/Board'
import '@fortawesome/fontawesome-free/css/all.min.css';
import {  addTask, deleteAllTasks, deleteTask, getIdCounter, getTasks, logSavedTasks } from './Services/taskServices';
import { TaskBoxInfo } from './types/TaskBoxInfo';
import { NewTaskInfo } from './types/NewTaskInfo';

// context definition
type TaskContextType = {
  reloadTasks: () => void
  addNewTask: (task: NewTaskInfo) => void;
  deleteCurrentTask: (task: TaskBoxInfo) => void;
}
export const AppContext = createContext<TaskContextType | undefined>(undefined);


function App() {

  // all tasks in the localStorage
  const [tasks, setTasks] = useState<TaskBoxInfo[]>([])

  // load the tasks on app render
  useEffect(()=>{
    reloadTasks();
  }, [])

  // method to reload tasks from the local storage (taskServices.tsx)
  // can be replaced with a fetch function to request them from the backend instead
  const reloadTasks = () => {
    setTasks(getTasks())
    console.log(getTasks())
  }
  
  // TASK MANIPULATION
  // add task 
  const addNewTask = (task:NewTaskInfo) => {
    addTask(task);
    reloadTasks()
  }
  // delete task
  const deleteCurrentTask = (task:TaskBoxInfo) => {
    deleteTask(task);
    reloadTasks()
  }


  // CONTEXT VALUE - for anything that the app might need
  const appContextValue = {
    reloadTasks: reloadTasks,
    addNewTask: addNewTask,
    deleteCurrentTask: deleteCurrentTask
  }
  

  return (
    <div id='app'>
      <AppContext.Provider value={appContextValue}>
        <Header></Header>
        <Board tasks={tasks}></Board>
        {/* dev buttons */}
        <div className='dev-buttons'>
          <button onClick={()=>logSavedTasks()}>log all task</button>
          <button onClick={()=>deleteAllTasks()}>delete all task</button>
        </div>
        {/* dev buttons */}
      </AppContext.Provider>      
    </div>
  )
}

export default App
