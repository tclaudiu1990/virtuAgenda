import { TaskBoxInfo } from "../types/TaskBoxInfo";
import { NewTaskInfo } from "../types/NewTaskInfo";

// This file contains the CRUD methods for the Task Boxes



// GET all task boxes from storage
const getTasks = (): TaskBoxInfo[] => {
    const taskList = JSON.parse(localStorage.getItem('vaTasks') || '[]');
    //parse dates to format correctly
    const finalList = taskList.map((task:TaskBoxInfo)=>{
        return({
            ...task,
            startDate: new Date(task.startDate)
        })
    })
    return(finalList);
}

// GET TASK by id
const getTaskById = (id:number): TaskBoxInfo | undefined => {
    let tasks:TaskBoxInfo[] = getTasks();
    for(let i=0; i < tasks.length; i++){
        if(id==tasks[i].id){
            return(tasks[i])
            break;
        }
    }
}

// CREATE a task 
const addTask = (newTaskInfo: NewTaskInfo) => {
    
    let allTasks = getTasks();

    // create a new incremented id and automatically store it
    const newId:number = createNewId();

    // create the new taskBoxInfo item
    const newTask:TaskBoxInfo = {
        id: newId,
        status: 'create',
        ...newTaskInfo
    }

    // push to all tasks and store 
    allTasks.push(newTask)
    localStorage.setItem(`vaTasks`, JSON.stringify(allTasks))
}



// UPDATE a task
const updateTask = (task: TaskBoxInfo) => {

    // extract all tasks
    let allTasks = getTasks();

    // find the task using the unique id
    // replace the stored task with new one 
    for(let i=0; i<allTasks.length; i++) {
        if(allTasks[i].id==task.id){
            allTasks[i]=task;
            break;
        }
    }
    // store the new tasks
    localStorage.setItem('vaTasks', JSON.stringify(allTasks));

}


// DELETE a task
const deleteTask = (task: TaskBoxInfo) => {
    
    let allTasks = getTasks();

    let newTasks = allTasks.filter(storedTask=>{
        return(storedTask.id!=task.id)
    })
    // reset id counter if no tasks exist
    if(newTasks.length==0){resetIdCounter()}

    localStorage.setItem('vaTasks', JSON.stringify(newTasks))
    

}


// dev - log all tasks in console
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


// idCounter = a stored id counter that automatically increments when adding a task in order to create unique ids 
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
    const result = counter!=null ? counter+1 : 1;
    localStorage.setItem('vaIdCounter', JSON.stringify(result))
    return(result)    
}

// resetting counter
const resetIdCounter = () => {
    // sets the counter to 0 in local storage
    localStorage.setItem('vaIdCounter', JSON.stringify(0))
}

export {getIdCounter, resetIdCounter, createNewId, getTasks, getTaskById, addTask, updateTask, deleteTask, logSavedTasks, deleteAllTasks};