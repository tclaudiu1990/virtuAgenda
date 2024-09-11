import { TaskBoxInfo } from "../types/TaskBoxInfo";
import { NewTaskInfo } from "../types/NewTaskInfo";

// This file contains the CRUD methods for the Task Boxes



// get all task boxes from storage
const getTasks = (): TaskBoxInfo[] => {
    const taskList = JSON.parse(localStorage.getItem('vaTasks') || '[]');
    return(taskList);
}

// add a task to storage
const addTask = (newTaskInfo: NewTaskInfo) => {
    let allTasks = getTasks();
    const newId:number = createNewId();
    
    // increment the largest id
    const newTask = {
        id: newId,
        status: 'creata',
        ...newTaskInfo
    }

    allTasks.push(newTask)
    localStorage.setItem(`vaTasks`, JSON.stringify(allTasks))
}



// update a certain task
const updateTask = (task: TaskBoxInfo) => {
    let allTasks = getTasks();

    for(let i=0; i<allTasks.length; i++) {
        if(allTasks[i].id==task.id){
            allTasks[i]=task;
            break;
        }
    }
    localStorage.setItem('vaTasks', JSON.stringify(allTasks));
}

// delete a task
const deleteTask = (task: TaskBoxInfo) => {

    let allTasks = getTasks();

    let newTasks = allTasks.filter(storedTask=>{
        return(storedTask.id!=task.id)
    })

    localStorage.setItem('vaTasks', JSON.stringify(newTasks))
    
}


// for dev - log all tasks in console
const logSavedTasks = () => {
    console.log(getTasks())
}

// delete all tasks

const deleteAllTasks = () => {
    localStorage.removeItem('vaTasks');
    localStorage.removeItem('vaIdCounter');
}


// ID COUNTER // ID COUNTER // ID COUNTER // ID COUNTER 
// ID COUNTER // ID COUNTER // ID COUNTER // ID COUNTER 
// ID COUNTER // ID COUNTER // ID COUNTER // ID COUNTER 


// idCounter - a stored id counter that automatically increments when adding a task in order to create unique ids 
// in a real world project, the unique id would be created in the backend when storing the task info in the database
const getIdCounter = ():number | null => {
    // returns the idCounter from storage as int
    const idCounter = localStorage.getItem('vaIdCounter');
    const result = idCounter?parseInt(JSON.parse(idCounter)):null;
    return(result)
}
// increments, stores and returns the id counter
const createNewId = (): number => {
    // if a counter doesn't exist, it sets it to 0 and stores it
    // if a counter exists, it increments it and stores it
    const counter:number | null = getIdCounter();
    const result = counter!=null ? counter+1 : 0;
    localStorage.setItem('vaIdCounter', JSON.stringify(result))
    return(result)    
}


export {getIdCounter, createNewId, getTasks, addTask, updateTask, deleteTask, logSavedTasks, deleteAllTasks};