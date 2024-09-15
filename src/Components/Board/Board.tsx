
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

    // toggle active class when activeTab changes
    useEffect(()=>{
        addRemoveActiveClass('board-tab');
        addRemoveActiveClass('status-column');
    }, [activeTab])
    
    // toggle active classes on items
    // provide an item class ex:(.board-tab)
    // will cicle through the items that contain that class and if those items also contain activeTab classes ('create', 'incurs' or 'finalizate'), will activate the appropriate item
    const addRemoveActiveClass = (itemClass:string) => {
        document.querySelectorAll(`.${itemClass}`).forEach(item=>{
            item.classList.contains(activeTab)?item.classList.add(`active`) : item.classList.remove(`active`);
        });
    }


    return(
        <div id="board">
            <div className="board-actions">
                <Filters></Filters>
            </div>
            
            {/* visible on mobile */}
            <div className="board-tabs"> 
                <div className="board-tab create" onClick={()=>setActiveTab(`create`)}>Create: {tasksCreate.length}</div>
                <div className="board-tab incurs" onClick={()=>setActiveTab(`incurs`)}>În Curs: {tasksInCurs.length}</div>
                <div className="board-tab finalizate" onClick={()=>setActiveTab(`finalizate`)}>Finalizate: {tasksFinalizate.length}</div>
            </div>
            {/* end visible on mobile */}

            <div className="board-columns">
                <StatusColumn type={'create'} name={`Create`} tasks={tasksCreate}></StatusColumn>
                <StatusColumn type={'incurs'} name={`În Curs`} tasks={tasksInCurs}></StatusColumn>
                <StatusColumn type={'finalizate'} name={`Finalizate`} tasks={tasksFinalizate}></StatusColumn>
            </div>
            
        </div>
    )
}

export default Board;