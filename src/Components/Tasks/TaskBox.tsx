import React from "react";
import { TaskBoxInfo } from "../../types/TaskBoxInfo";
import './TaskBox.scss';

interface TaskBoxProps{
    name: string;
    taskBoxInfo: TaskBoxInfo;
}

const TaskBox: React.FC<TaskBoxProps> = ({name, taskBoxInfo}) => {
    return(
        <div className="task-box">
            <div className="task-box-header">
                <div className="pill">{name}</div>
                <div className="task-box-menu">
                    <div className="task-box-menu-btn">
                        <i className="fa-solid fa-edit"></i>
                    </div>
                    <div className="task-box-menu-btn">
                        <i className="fa-solid fa-trash"></i>
                    </div>
                </div>
            </div>

            <div className="task-box-content">
                <p>{taskBoxInfo.title}</p>
                <small><em>#{taskBoxInfo.id}</em></small>
            </div>
             
            
        </div>
    )
}

export default TaskBox;