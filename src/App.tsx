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
  changeSelectedDate: (date: Date) => void;
  reloadTasks: () => void;
  addNewTask: (task: NewTaskInfo) => void;
  deleteCurrentTask: (task: TaskBoxInfo) => void;
  filter: (filters: FiltersInfo) => void
}
export const AppContext = createContext<TaskContextType | undefined>(undefined);


function App() {


  // all tasks in the localStorage
  const [tasks, setTasks] = useState<TaskBoxInfo[]>([])

  // selected Day
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  // search term
  const [searchTitle, setSearchTitle] = useState('');
  // selected state
  const [selectedState, setSelectedState] = useState('');


  // FILTER MANIPULATION // FILTER MANIPULATION // FILTER MANIPULATION // FILTER MANIPULATION // FILTER MANIPULATION 

  const changeSelectedDate = (date: Date) => {
    setSelectedDay(date);
  }

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
    const allTasks = getTasks();
    setTasks(allTasks)
  }

  // FILTER TASKS // FILTER TASKS // FILTER TASKS // FILTER TASKS // FILTER TASKS // FILTER TASKS // FILTER TASKS // FILTER TASKS // FILTER TASKS 

  // filter method
  const filter = (filters: FiltersInfo) => {
    const filteredTasks = filterTasks(filters);
    setTasks(filteredTasks)
  }


  // CONTEXT VALUE - for anything that the app might need
  const appContextValue = {
    tasks: tasks,
    selectedDay: selectedDay,
    changeSelectedDate: changeSelectedDate,
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
