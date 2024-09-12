import React, { useContext } from "react";
import { TaskBoxInfo } from "../../types/TaskBoxInfo";
import { AppContext } from "../../App";

interface DeleteModalProps {
    taskBoxInfo: TaskBoxInfo;
    closeModal: () => void;
}
const DeleteModal:React.FC<DeleteModalProps> = ({taskBoxInfo, closeModal}) => {

    const appContext = useContext(AppContext);

    const handleDelete = () => {
        appContext?.deleteCurrentTask(taskBoxInfo);
        closeModal()
    }

    return(
        <div className="modal-delete-details">
            <h2>Sterge Task-ul #{taskBoxInfo.id}?</h2>
            <p>Esti sigur ca vrei sa stergi task-ul? Daca il stergi, nu il mai poti recupera.</p>
            <div className="modal-footer">
                <div></div>
                <div>
                    <button className="btn btn-delete" onClick={handleDelete}> Sterge Task</button> 
                    <button className="btn" onClick={closeModal}>Nu sterge</button>                   
                </div>
            </div>            
        </div>
    )
}

export default DeleteModal;