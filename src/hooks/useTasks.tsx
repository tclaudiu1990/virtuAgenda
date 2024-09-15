import { useEffect, useState } from "react"
import { TaskBoxInfo } from "../types/TaskBoxInfo";
import FiltersInfo from "../types/FiltersInfo";
import { filterTasks } from "../Services/filteringServices";
import { addNewTask, deleteCurrentTask, getTaskById } from "../Services/taskServices";
import { NewTaskInfo } from "../types/NewTaskInfo";


const useTasks = () => {    

// all tasks in the localStorage
const [tasks, setTasks] = useState<TaskBoxInfo[]>([])

    // FILTER MANIPULATION // FILTER MANIPULATION // FILTER MANIPULATION // FILTER MANIPULATION // FILTER MANIPULATION // FILTER MANIPULATION // FILTER MANIPULATION 

    // selected Day
    const [selectedDay, setSelectedDay] = useState<Date>(new Date());
    // search term
    const [searchTitle, setSearchTitle] = useState('');
    // selected status
    const [selectedStatus, setSelectedStatus] = useState('');


    // change filters 
    const changeFilters = (filters: FiltersInfo) => {
        setSelectedDay(filters.selectedDay);
        setSearchTitle(filters.title);
        setSelectedStatus(filters.status)
    }

    // filter method and using taskServices.ts and set new tasks
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

    // Retrieve a tasks by ID number
    const getTask = (id:number): TaskBoxInfo | undefined => {
        const storedTask = getTaskById(id)
        return(storedTask)
    }  

    // add task 
    const addTask = (task:NewTaskInfo) => {
        addNewTask(task);
        reloadTasks()
    }
    // delete task
    const deleteTask = (task:TaskBoxInfo) => {
        deleteCurrentTask(task);
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

    return({
        tasks, 
        selectedDay,
        searchTitle,
        selectedStatus,
        changeFilters,
        filter,
        getTask,
        addTask,
        deleteTask,
        reloadTasks
    })
}


export default useTasks;