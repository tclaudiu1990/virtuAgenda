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
    
    // increment the largest id
    const newTask = {
        id: 1,
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
    localStorage.setItem('vaTasks', JSON.stringify([]));
}


export {getTasks, addTask, updateTask, deleteTask, logSavedTasks, deleteAllTasks};