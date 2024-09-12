
import React, { useContext, useEffect, useState } from "react";
import StatusColumn from "./StatusColumn";

import { TaskBoxInfo } from "../../types/TaskBoxInfo";
import Filters from "../Filters/Filters";
import { addTask } from "../../Services/taskServices";
import { NewTaskInfo } from "../../types/NewTaskInfo";
import { AppContext } from "../../App";

interface BoardProps {
    tasks: TaskBoxInfo[]
}

const Board:React.FC<BoardProps> = ({tasks}) => {

    // app context
    const appContext = useContext(AppContext);

    // the state that holds the 'creata' tasks
    const [tasksCreate, setTasksCreate] = useState<TaskBoxInfo[]>([]);
    // the state that holds the 'in curs' tasks
    const [tasksInCurs, setTasksInCurs] = useState<TaskBoxInfo[]>([]);
    // the state that holds the 'finalizate' tasks
    const [tasksFinalizate, setTasksFinalizate] = useState<TaskBoxInfo[]>([]);
     
    // grab all task on board render and set the state
    useEffect(()=>{
        appContext?.reloadTasks()
    }, [])



    // redistribute all tasks when tasks change
    useEffect(()=>{
        distributeTasks(tasks)
    }, [tasks])


    // distribute tasks to columns based on status
    const distributeTasks = (tasks:TaskBoxInfo[]) => {        

        // create temp arrays for each column task list
        let createTasks:TaskBoxInfo[] = [];
        let inCursTasks:TaskBoxInfo[] = [];
        let finalizateTasks:TaskBoxInfo[] = [];

        // distribute tasks to column arrays if tasks exist
        if(tasks.length>0){

            tasks.forEach(task => {
                switch(task.status){
                    case 'create': createTasks.push(task);
                        break;
                    case 'incurs': inCursTasks.push(task);
                        break;
                    case 'finalizate': finalizateTasks.push(task);
                        break;
                    default:
                        console.log(`ERROR building tasks. No such case.`)
                }
            });

            // set state for each column array
            // reversed to show newest task first
            setTasksCreate(createTasks.reverse());
            setTasksInCurs(inCursTasks.reverse());
            setTasksFinalizate(finalizateTasks.reverse());
        } else {
            // empty arrays if tasks don't exist       
            setTasksCreate([]);
            setTasksInCurs([]);
            setTasksFinalizate([]);
        }
    }




    return(
        <div id="board">
            <div className="board-actions">
                <Filters></Filters>
            </div>
            
            <div className="board-columns">
                <StatusColumn type={'create'} name={`Create`} tasks={tasksCreate}></StatusColumn>
                <StatusColumn type={'incurs'} name={`In Curs`} tasks={tasksInCurs}></StatusColumn>
                <StatusColumn type={'finalizate'} name={`Finalizate`} tasks={tasksFinalizate}></StatusColumn>
            </div>
            
        </div>
    )
}

export default Board;