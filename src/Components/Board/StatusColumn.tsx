import React, { useContext, useState } from "react"
import { TaskBoxInfo } from "../../types/TaskBoxInfo";
import TaskBox from "../Tasks/TaskBox";
import { updateTask } from "../../Services/taskServices";
import { AppContext } from "../../App";

interface StatusColumProps {
    type: string;
    name: string;
    tasks: TaskBoxInfo[];
    activeTab: string
}

const StatusColumn: React.FC<StatusColumProps> = ({type, name, tasks, activeTab}) => {

    const appContext = useContext(AppContext)

    // dragover class
    const [dragOver, setDragOver] = useState(false)

    // generates the task boxes
    const taskBoxes = tasks.map(task => {
        return (<TaskBox key={task.id} name={name} taskBoxInfo={task}></TaskBox>)
    });

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        // get the dragged task info from the event data
        const taskInfo = JSON.parse(e.dataTransfer.getData('draggedTaskInfo'))
        // update the task info if the column and task statuses do not match
        if(taskInfo.status!=type){
            // define the new task info
            const newTaskInfo = {
                id: taskInfo.id,
                status: type,                
                title: taskInfo.title,
                description: taskInfo.description,
                startDate: taskInfo.startDate || new Date()
            }
            // update and reload tasks
            updateTask(newTaskInfo);
            appContext?.reloadTasks();
        }         
    }

    
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(true)
    }
    const handleDragLeave= (e: React.DragEvent) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setDragOver(false)
        }
    }



    return(
        <div className={`status-column ${type} ${dragOver?'dragging-on':''} ${activeTab==type?'active':''}`} 
            onDrop={handleDrop} 
            onDragOver={e=>handleDragOver(e)} 
            onDragLeave={e=>handleDragLeave(e)}
            >
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