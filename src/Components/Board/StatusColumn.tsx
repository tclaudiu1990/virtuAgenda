import React from "react"
import { TaskBoxInfo } from "../../types/TaskBoxInfo";
import TaskBox from "../Tasks/TaskBox";

interface StatusColumProps {
    type: string;
    name: string;
    tasks: TaskBoxInfo[];   
}

const StatusColumn: React.FC<StatusColumProps> = ({type, name, tasks}) => {

    // generates the task boxes
    const taskBoxes = tasks.map(task => {
        return (<TaskBox key={task.id} name={name} taskBoxInfo={task}></TaskBox>)
    });

    return(
        <div className={`status-column ${type}`} >
            <div className="column-header">
                <h3>{name}</h3>
                <span className="task-count pill">{taskBoxes.length}</span>
            </div>
            <div className="column-container">            
                {taskBoxes.length>0?taskBoxes:<h3 className="no-tasks-ui">There are no tasks here yet.</h3>}
            </div>
            
            
        </div>
    )
}

export default StatusColumn;