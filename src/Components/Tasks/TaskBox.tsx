import React, { useState } from "react";
import { TaskBoxInfo } from "../../types/TaskBoxInfo";
import './TaskBox.scss';
import TaskModal from "./TaskModal";

interface TaskBoxProps{
    name: string;
    taskBoxInfo: TaskBoxInfo;
}

const TaskBox: React.FC<TaskBoxProps> = ({name, taskBoxInfo}) => {

    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);


    return(
        <div className="task-box">

            {modalVisible &&
                <TaskModal
                    taskBoxInfo={taskBoxInfo}    
                    openModal={openModal}
                    closeModal={closeModal}       
                />         
            }

            <div className="task-box-header">
                <div className="pill">{name}</div>
                <div className="task-box-menu">
                    <div className="task-box-menu-btn" onClick={()=>openModal()}>
                        <i className="fa-solid fa-edit"></i>
                    </div>
                    <div className="task-box-menu-btn">
                        <i className="fa-solid fa-trash"></i>
                    </div>
                </div>
            </div>

            <div className="task-box-content" onClick={()=>openModal()}>
                <p>{taskBoxInfo.title}</p>
                <small><em>#{taskBoxInfo.id}</em></small>
            </div>
             
            
        </div>
    )
}

export default TaskBox;