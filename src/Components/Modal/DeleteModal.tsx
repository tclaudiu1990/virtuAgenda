import React, { useContext } from "react";
import { TaskBoxInfo } from "../../types/TaskBoxInfo";
import { AppContext } from "../../App";

interface DeleteModalProps {
    taskBoxInfo: TaskBoxInfo;
    closeModal: () => void;
}
const DeleteModal:React.FC<DeleteModalProps> = ({taskBoxInfo, closeModal}) => {

    const appContext = useContext(AppContext);

    // method to delete task and close modal
    const handleDelete = () => {
        appContext?.deleteTask(taskBoxInfo);
        closeModal()
    }

    return(
        <div className="modal-delete-details">
            <h2>Șterge Task-ul #{taskBoxInfo.id}?</h2>
            <p>Ești sigur(ă) că vrei să ștergi task-ul? Dacă îl ștergi, nu îl mai poți recupera.</p>
            <div className="modal-footer">
                <div></div>
                <div>
                    <button className="btn btn-delete" onClick={handleDelete}> Șterge Task</button> 
                    <button className="btn" onClick={closeModal}>Nu șterge</button>                   
                </div>
            </div>            
        </div>
    )
}

export default DeleteModal;