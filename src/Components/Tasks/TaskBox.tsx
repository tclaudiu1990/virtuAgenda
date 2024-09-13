import React, { useState } from "react";
import { TaskBoxInfo } from "../../types/TaskBoxInfo";
import './TaskBox.scss';
import TaskModal from "../Modal/TaskModal";
import Modal from "../Modal/Modal";
import DeleteModal from "../Modal/DeleteModal";

interface TaskBoxProps{
    name: string;
    taskBoxInfo: TaskBoxInfo;
}

const TaskBox: React.FC<TaskBoxProps> = ({name, taskBoxInfo}) => {

    const [modalVisible, setModalVisible] = useState(false);
    const closeModal = () => setModalVisible(false);

    let [modalContent, setModalContent] = useState(<></>);

    const openEdit = (taskInfo:TaskBoxInfo) => {
        console.log(`openModal NEW TaskBoxInfo`)
        console.log(taskInfo)
        setModalContent(
            <TaskModal
                    key={taskInfo.id}  
                    taskBoxInfo={taskInfo}    
                    openModal={openEdit} 
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


            <div className="task-box" onClick={()=>openEdit(taskBoxInfo)}>
                <div className="task-box-header">
                    <div className="pill">{name}</div>
                    <div className="task-box-menu">
                        <div className="task-box-menu-btn" onClick={()=>openEdit(taskBoxInfo)}>
                            <i className="fa-solid fa-edit"></i>
                        </div>
                        <div className="task-box-menu-btn" onClick={(e)=>{
                                e.stopPropagation()
                                openDelete()
                            }}>
                            <i className="fa-solid fa-trash"></i>
                        </div>
                    </div>
                </div>

                <div className="task-box-content">
                    <p><small className="task-box-id"><em>Task #{taskBoxInfo.id}</em></small> {taskBoxInfo.title}</p>
                </div>            
            </div>
        </>
        
    )
}

export default TaskBox;