import { createContext, useEffect, useState } from 'react'
import './App.scss'
import Header from './Components/Header/Header'
import Board from './Components/Board/Board'
import '@fortawesome/fontawesome-free/css/all.min.css';
import {  deleteAllTasks, getIdCounter, getTasks, logSavedTasks } from './Services/taskServices';
import { TaskBoxInfo } from './types/TaskBoxInfo';

// context definition
type TaskContextType = {
  renderTasks: () => void
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
  }
  
  // context containing anything the app might need
  const appContextValue = {
    renderTasks: reloadTasks,
  }



  
  const logIdCounter = () => {
    console.log(getIdCounter())
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
          <button onClick={()=>logIdCounter()}>get idCounter</button>
        </div>
        {/* dev buttons */}
      </AppContext.Provider>      
    </div>
  )
}

export default App
