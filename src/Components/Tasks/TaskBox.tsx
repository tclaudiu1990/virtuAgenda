import React, { useState } from "react";
import { TaskBoxInfo } from "../../types/TaskBoxInfo";
import './TaskBox.scss';
import TaskModal from "./TaskModal";
import Modal from "../Modal/Modal";
import DeleteModal from "./DeleteModal";

interface TaskBoxProps{
    name: string;
    taskBoxInfo: TaskBoxInfo;
}

const TaskBox: React.FC<TaskBoxProps> = ({name, taskBoxInfo}) => {

    const [modalVisible, setModalVisible] = useState(false);
    const closeModal = () => setModalVisible(false);

    let [modalContent, setModalContent] = useState(<></>);

    const openEdit = () => {
        setModalContent(
            <TaskModal
                    taskBoxInfo={taskBoxInfo}    
                    closeModal={closeModal}
                    openDelete={openDelete}
                /> 
        )
        setModalVisible(true);
    }
    const openDelete = () => {
        setModalContent(
            <DeleteModal
                taskBoxInfo={taskBoxInfo}    
                closeModal={closeModal}       
            /> 
        )
        setModalVisible(true);
    }

    return(
        <>
            {modalVisible &&
                <Modal closeModal={closeModal}>
                    {modalContent}
                </Modal>
            }


            <div className="task-box">
                <div className="task-box-header">
                    <div className="pill">{name}</div>
                    <div className="task-box-menu">
                        <div className="task-box-menu-btn" onClick={()=>openEdit()}>
                            <i className="fa-solid fa-edit"></i>
                        </div>
                        <div className="task-box-menu-btn">
                            <i className="fa-solid fa-trash"></i>
                        </div>
                    </div>
                </div>

                <div className="task-box-content" onClick={()=>openEdit()}>
                    <p><small className="task-box-id"><em>Task #{taskBoxInfo.id}</em></small> {taskBoxInfo.title}</p>
                </div>            
            </div>
        </>
        
    )
}

export default TaskBox;