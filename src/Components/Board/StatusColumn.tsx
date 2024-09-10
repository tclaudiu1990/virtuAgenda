import React, { useState } from "react"
import { TaskBoxInfo } from "../../types/TaskBoxInfo";
import TaskBox from "../Tasks/TaskBox";

interface StatusColumProps {
    type: string;
    name: string;
    tasks: TaskBoxInfo[];   
}

const StatusColumn: React.FC<StatusColumProps> = ({type, name, tasks}) => {

    const taskBoxes = tasks.map(task => {
        return (<TaskBox key={task.id} name={name} taskBoxInfo={task}></TaskBox>)
    });

    return(
        <div className={`status-column ${type}`}>
            <div className="column-container">
                <div className="column-header">
                    <h3>{name}</h3>
                </div>
            
                {taskBoxes}
            </div>
            
            
        </div>
    )
}

export default StatusColumn;