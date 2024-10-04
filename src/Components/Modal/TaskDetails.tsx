import React, { useContext, useEffect, useState } from "react";
import { TaskBoxInfo } from "../../types/TaskBoxInfo";
import { updateTask } from "../../Services/taskServices";
import EditableInput from "../Tasks/EditableInput";
import { AppContext } from "../../App";
import EditableTextArea from "../Tasks/EditableTextArea";

import { useLocation } from "react-router-dom";
import DayPicker from "../DayPicker/DayPicker";

interface TaskDetailsProps {
    taskBoxInfo: TaskBoxInfo;
    closeModal: () => void;
}

// This component represents the content that is passed to the modal when editing a task
const TaskDetails: React.FC<TaskDetailsProps> = ({taskBoxInfo, closeModal}) => {

    // app context
    const appContext = useContext(AppContext);

    // states of each editable item
    const [status, setStatus] = useState(taskBoxInfo.status);
    const [title, setTitle] = useState(taskBoxInfo.title);
    const [description, setDescription] = useState(taskBoxInfo.description);
    const [startDate, setStartDate] = useState<Date>(taskBoxInfo.startDate);
    


    // method to update task on Save
    const saveTask = (): void => {

        // create new task object with current options
        const newTaskInfo:TaskBoxInfo = {
            id: taskBoxInfo.id,
            status: status,
            title: title,
            description: description,
            startDate: startDate || new Date()
        }

        // update task from taskServices.ts
        updateTask(newTaskInfo);
        appContext?.reloadTasks();
    }

    // save task automatically when location changes
    // for UX flow - ex: adding task link in description, when clicking the task link, the task is saved before navigating
    const location = useLocation();
    useEffect(()=>{
        saveTask()
    }, [location.hash])


    return (
            <div className="modal-task-details modal-details">

                <small><em>Task ID: {taskBoxInfo.id}</em></small>

                <h3>Titlu</h3>

                <EditableInput 
                    acceptEdit={setTitle} 
                    item={<p>{title}</p>}
                    text={title}
                />

                <h3>Descriere</h3>
                <EditableTextArea
                    acceptEdit={setDescription}
                    text={description}
                    taskBoxInfo={taskBoxInfo}
                    closeModal={closeModal}
                />

                <div className="modal-group-double">
                    <div className="group-item">
                        <h3>Status</h3>
                        <select name="status" value={status} id="modal-task-status" onChange={(e)=>{setStatus(e.target.value)}}>
                            <option value='create'>Create</option>
                            <option value='incurs'>În curs</option>
                            <option value='finalizate'>Finalizate</option>
                        </select>
                    </div>

                    <div className="group-item">
                        <h3>Data:</h3>
                        <div className="modal-date">
                            <DayPicker
                                selectedDay={startDate as Date}
                                onChange={date=>setStartDate(date as Date)}
                            />
                        </div>
                    </div>
                </div>
                
                <div className="modal-footer">
                    <button className="btn btn-delete" onClick={()=>appContext?.openDelete(taskBoxInfo)}>Șterge Task</button>
                    <div>
                        <button className="btn" onClick={()=>{
                            saveTask();                            
                            closeModal();
                        }}>Salvează</button>
                        &nbsp;&nbsp;&nbsp;
                        <button className="btn" onClick={()=>closeModal()}>Renunță</button>
                    </div>
                </div>                
            </div>        
    )
}

export default TaskDetails;