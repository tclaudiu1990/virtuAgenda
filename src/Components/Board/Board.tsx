
import React, { useContext, useEffect, useState } from "react";
import StatusColumn from "./StatusColumn";

import { TaskBoxInfo } from "../../types/TaskBoxInfo";
import Filters from "../Filters/Filters";
import { AppContext } from "../../App";

interface BoardProps {
    tasks: TaskBoxInfo[]
}

const Board:React.FC<BoardProps> = ({tasks}) => {

    // app context
    const appContext = useContext(AppContext);

    // the state that holds the 'create' tasks
    const [tasksCreate, setTasksCreate] = useState<TaskBoxInfo[]>([]);
    // the state that holds the 'in curs' tasks
    const [tasksInCurs, setTasksInCurs] = useState<TaskBoxInfo[]>([]);
    // the state that holds the 'finalizate' tasks
    const [tasksFinalizate, setTasksFinalizate] = useState<TaskBoxInfo[]>([]);
     
    // render all tasks on board render
    useEffect(()=>{
        appContext?.reloadTasks()
    }, [])


    // redistribute all tasks everytime tasks change
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
                        console.log(`ERROR building tasks. No such case: task status.`)
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

    // MOBILE
    // active tab state - for mobile
    const [activeTab, setActiveTab] = useState<string>('create');


    return(
        <div id="board">
            <div className="board-actions">
                <Filters></Filters>
            </div>
            
            {/* visible on mobile */}
            <div className="board-tabs"> 
                <div className="board-tab create" onClick={()=>setActiveTab(`create`)}>To do: {tasksCreate.length}</div>
                <div className="board-tab incurs" onClick={()=>setActiveTab(`incurs`)}>On it: {tasksInCurs.length}</div>
                <div className="board-tab finalizate" onClick={()=>setActiveTab(`finalizate`)}>Done: {tasksFinalizate.length}</div>
            </div>
            {/* end visible on mobile */}

            <div className="board-columns">
                <StatusColumn type={'create'} name={`To do`} tasks={tasksCreate} activeTab={activeTab}></StatusColumn>
                <StatusColumn type={'incurs'} name={`On it`} tasks={tasksInCurs} activeTab={activeTab}></StatusColumn>
                <StatusColumn type={'finalizate'} name={`Done`} tasks={tasksFinalizate} activeTab={activeTab}></StatusColumn>
            </div>
            
        </div>
    )
}

export default Board;