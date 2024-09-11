
import React, { useEffect, useState } from "react";
import StatusColumn from "./StatusColumn";

import { TaskBoxInfo } from "../../types/TaskBoxInfo";
import Filters from "../Filters/Filters";



const Board = () => {

    // the state that holds the 'creata' tasks
    const [tasksCreate, setTasksCreate] = useState<TaskBoxInfo[]>([]);
    // the state that holds the 'in curs' tasks
    const [tasksInCurs, setTasksInCurs] = useState<TaskBoxInfo[]>([]);
    // the state that holds the 'finalizate' tasks
    const [tasksFinalizate, setTasksFinalizate] = useState<TaskBoxInfo[]>([]);
     

    useEffect(()=>{

        let newTasks = [];
        
        // fill tasksCreate
        for(let i=0;i<5;i++){
            newTasks.push({
                id: `task${i}`,
                title: `Task ${i} title`,
                description: `Aceasta este descrierea sarcinii create task${i}`,
                status: `creata`,
                startDate: new Date(),
                deadline: new Date(),
            })
        }

        setTasksCreate(newTasks);

        // fill tasksInCurs

        newTasks = [];
        for(let i=0;i<3;i++){
            newTasks.push({
                id: `task${i}`,
                title: `Task ${i} title lorem ipsum dolor sit amet lorem ipsum dolor sit amet omg`,
                description: `Aceasta este descrierea sarcinii in curs task${i}`,
                status: `incurs`,
                startDate: new Date(),
                deadline: new Date(),
            })
        }
        setTasksInCurs(newTasks);

        // fill tasksFinalizate
        newTasks = [];
        for(let i=0;i<4;i++){
            newTasks.push({
                id: `task${i}`,
                title: `Task ${i} title`,
                description: `Aceasta este descrierea sarcinii finalizate task${i}`,
                status: `finalizat`,
                startDate: new Date(),
                deadline: new Date(),
            })
        }
        setTasksFinalizate(newTasks);


    }, [])




    return(
        <div id="board">
            <div className="board-actions">
                <Filters></Filters>
                <button className="btn">+ Creaza Task Nou</button>
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