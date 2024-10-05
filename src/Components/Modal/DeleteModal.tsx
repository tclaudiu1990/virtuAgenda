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
        <div className="modal-delete-details modal-details">
            <h2>Delete Task-ul #{taskBoxInfo.id}?</h2>
            <p>Are you sure you want to permanently delete this task? If you do, you won't be able to retrieve it.</p>
            <div className="modal-footer">
                <div></div>
                <div>
                    <button className="btn btn-delete" onClick={handleDelete}> Delete Task</button> 
                    <button className="btn" onClick={closeModal}>Cancel</button>                   
                </div>
            </div>            
        </div>
    )
}

export default DeleteModal;