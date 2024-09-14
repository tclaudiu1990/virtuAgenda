import React, { useContext, useEffect, useState } from "react";
import { TaskBoxInfo } from "../../types/TaskBoxInfo";
import './TaskBox.scss';
import TaskDetails from "../Modal/TaskDetails";
import Modal from "../Modal/Modal";
import DeleteModal from "../Modal/DeleteModal";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../App";

interface TaskBoxProps{
    name: string;
    taskBoxInfo: TaskBoxInfo;
}

const TaskBox: React.FC<TaskBoxProps> = ({name, taskBoxInfo}) => {

    const appContext = useContext(AppContext);

    // router hooks
    const navigate = useNavigate();
    const location = useLocation();

    const [modalVisible, setModalVisible] = useState(false);

    const closeModal = () => {
        setModalVisible(false)        
        navigate(`/`)
    };

    let [modalContent, setModalContent] = useState(<></>);

    const openTaskDetails = (taskInfo:TaskBoxInfo) => {
        setModalContent(
            <TaskDetails
                    key={taskInfo.id}  
                    taskBoxInfo={taskInfo} 
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

    
    // when route changes to /#task_id, open Task Details of the corresponding task
    useEffect(()=>{
        //extract taskId
        const linkId = location.hash.substring(1);
        // get taskBoxInfo
        const newTaskBoxInfo = appContext?.getTask(Number(linkId))
        if(newTaskBoxInfo){
            openTaskDetails(newTaskBoxInfo)
        } else {
            closeModal()
        }

    }, [location.hash])

    return(
        <>


            {/* <div className="task-box" onClick={()=>openTaskDetails(taskBoxInfo)}> */}
            <div className="task-box" onClick={()=>navigate(`#${taskBoxInfo.id}`)}>
                <div className="task-box-header">
                    <div className="pill">{name}</div>
                    <div className="task-box-menu">
                        {/* <div className="task-box-menu-btn" onClick={()=>openTaskDetails(taskBoxInfo)}> */}
                        <div className="task-box-menu-btn" onClick={()=>navigate(`#${taskBoxInfo.id}`)}>
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