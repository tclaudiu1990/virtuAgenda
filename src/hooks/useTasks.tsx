import { useEffect, useState } from "react"
import { TaskBoxInfo } from "../types/TaskBoxInfo";
import FiltersInfo from "../types/FiltersInfo";
import { filterTasks } from "../Services/filteringServices";
import { addNewTask, deleteCurrentTask, getTaskById } from "../Services/taskServices";
import { NewTaskInfo } from "../types/NewTaskInfo";


const useTasks = () => {    

    // all visible tasks
    const [tasks, setTasks] = useState<TaskBoxInfo[]>([])

    // FILTER MANIPULATION // FILTER MANIPULATION // FILTER MANIPULATION // FILTER MANIPULATION // FILTER MANIPULATION // FILTER MANIPULATION // FILTER MANIPULATION 

    // selected Day
    const [selectedDay, setSelectedDay] = useState<Date>(new Date());
    // search term
    const [searchTitle, setSearchTitle] = useState('');
    // selected status
    const [selectedStatus, setSelectedStatus] = useState('');


    // change filters - sets the 3 global filters to their new values
    const changeFilters = (filters: FiltersInfo) => {
        setSelectedDay(filters.selectedDay);
        setSearchTitle(filters.title);
        setSelectedStatus(filters.status)
    }

    // filter method using filteringServices.ts and set visible tasks to filtered ones
    const filter = (filters: FiltersInfo) => {
        const filteredTasks = filterTasks(filters);
        setTasks(filteredTasks)
    }  

    // automatically filter when any filter setting is changed
    useEffect(()=>{
        reloadTasks();
    }, [selectedDay, searchTitle, selectedStatus])


    // TASK MANIPULATION // TASK MANIPULATION // TASK MANIPULATION // TASK MANIPULATION // TASK MANIPULATION // TASK MANIPULATION // TASK MANIPULATION 
    
    // LOAD the tasks on app render
    useEffect(()=>{
        reloadTasks();
    }, [])

    // Retrieve a task by ID number
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

    // method to RELOAD tasks from the local storage
    // can be considered as reaplying filters
    // used to force rerender the tasks
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