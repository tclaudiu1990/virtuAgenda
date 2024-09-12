import { createContext, useEffect, useState } from 'react'
import './App.scss'
import Header from './Components/Header/Header'
import Board from './Components/Board/Board'
import '@fortawesome/fontawesome-free/css/all.min.css';
import {  addTask, deleteAllTasks, deleteTask, getTasks, logSavedTasks } from './Services/taskServices';
import { TaskBoxInfo } from './types/TaskBoxInfo';
import { NewTaskInfo } from './types/NewTaskInfo';
import FiltersInfo from './types/FiltersInfo';
import { filterTasks } from './Services/filteringServices';

// context definition
type TaskContextType = {
  tasks: TaskBoxInfo[];
  selectedDay: Date;
  changeFilters: (filters: FiltersInfo) => void;
  reloadTasks: () => void;
  addNewTask: (task: NewTaskInfo) => void;
  deleteCurrentTask: (task: TaskBoxInfo) => void;
  filter: (filters: FiltersInfo) => void
}
export const AppContext = createContext<TaskContextType | undefined>(undefined);


function App() {

  // all tasks in the localStorage
  const [tasks, setTasks] = useState<TaskBoxInfo[]>([])


  // FILTER MANIPULATION // FILTER MANIPULATION // FILTER MANIPULATION // FILTER MANIPULATION // FILTER MANIPULATION // FILTER MANIPULATION // FILTER MANIPULATION 

  // selected Day
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  // search term
  const [searchTitle, setSearchTitle] = useState('');
  // selected status
  const [selectedStatus, setSelectedStatus] = useState('');


  const changeFilters = (filters: FiltersInfo) => {
    setSelectedDay(filters.selectedDay);
    setSearchTitle(filters.title);
    setSelectedStatus(filters.status)
  }

  // filter method
  const filter = (filters: FiltersInfo) => {
    const filteredTasks = filterTasks(filters);
    setTasks(filteredTasks)
  }  

  // FILTER automatically when any setting is changed
  useEffect(()=>{
    reloadTasks();
  }, [selectedDay, searchTitle, selectedStatus])



  // TASK MANIPULATION // TASK MANIPULATION // TASK MANIPULATION // TASK MANIPULATION // TASK MANIPULATION // TASK MANIPULATION // TASK MANIPULATION 
  
  // LOAD the tasks on app render
  useEffect(()=>{
    reloadTasks();
  }, [])

  
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

  // RELOAD tasks method from the local storage
  const reloadTasks = () => {    
    filter({
      selectedDay: selectedDay,
      title: searchTitle,
      status: selectedStatus
    })
  }

  // FILTER TASKS // FILTER TASKS // FILTER TASKS // FILTER TASKS // FILTER TASKS // FILTER TASKS // FILTER TASKS // FILTER TASKS // FILTER TASKS 



  // CONTEXT VALUE - for anything that the app might need
  const appContextValue = {
    tasks: tasks,
    selectedDay: selectedDay,
    changeFilters: changeFilters,
    reloadTasks: reloadTasks,
    addNewTask: addNewTask,
    deleteCurrentTask: deleteCurrentTask,
    filter: filter
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
