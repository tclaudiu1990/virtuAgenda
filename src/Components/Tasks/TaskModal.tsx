import React, { useState } from "react";
import Modal from "../Modal/Modal";
import { TaskBoxInfo } from "../../types/TaskBoxInfo";
import { format } from "date-fns";
import { updateTask } from "../../Services/taskServices";
import EditableInput from "./EditableInput";

interface TaskModalProps {
    taskBoxInfo: TaskBoxInfo;
    openModal: () => void;
    closeModal: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({taskBoxInfo, openModal, closeModal}) => {

    // states of each editable item
    const [status, setStatus] = useState(taskBoxInfo.status);
    const [title, setTitle] = useState(taskBoxInfo.title);
    const [description, setDescription] = useState(taskBoxInfo.description);
    const [startDate, setStartDate] = useState(taskBoxInfo.startDate);
    const [deadline, setDeadline] = useState(taskBoxInfo.deadline);

    // formating dates for display
    const startDateFormatted = format(taskBoxInfo.startDate, 'dd/MM/yyyy');
    const deadlineFormatted = format(taskBoxInfo.deadline, 'dd/MM/yyyy');

    // method to update task on Save
    const saveTask = (): void => {

        // create new task object with current options
        const newTaskInfo:TaskBoxInfo = {
            id: taskBoxInfo.id,
            status: status,
            title: title,
            description: description,
            startDate: startDate,
            deadline: deadline
        }

        // update task from taskServices.ts
        updateTask(newTaskInfo);

        closeModal();
    }
    

    
    return (        
        <Modal>
            <div className="modal-task-details">

                <small><em>Task ID: {taskBoxInfo.id}</em></small>

                <h3>Title</h3>

                <EditableInput 
                    acceptEdit={setTitle} 
                    item={<p>{title}</p>}
                    text={title}
                />

                <h3>Description</h3>
                
                <p>{description}</p>
                <p>{taskBoxInfo.status}</p>
                
                <p>Data de start: {startDateFormatted}</p>
                <p>Termen Limita: {deadlineFormatted}</p>
                <button className="btn" onClick={()=>saveTask()}>Save</button>
                &nbsp;&nbsp;&nbsp;
                <button className="btn" onClick={()=>closeModal()}>Discard</button>
            </div>
        </Modal>
        
    )
}

export default TaskModal;