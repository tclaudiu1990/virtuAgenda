import React, { useContext, useEffect, useState } from "react";
import { TaskBoxInfo } from "../../types/TaskBoxInfo";
import { format } from "date-fns";
import { updateTask } from "../../Services/taskServices";
import EditableInput from "../Tasks/EditableInput";
import { AppContext } from "../../App";
import EditableTextArea from "../Tasks/EditableTextArea";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ro } from 'date-fns/locale';
import { useLocation } from "react-router-dom";

interface TaskDetailsProps {
    taskBoxInfo: TaskBoxInfo;
    closeModal: () => void;
    openDelete: (taskBoxInfo:TaskBoxInfo) => void;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({taskBoxInfo, closeModal, openDelete}) => {

    // app context
    const appContext = useContext(AppContext);

    // states of each editable item
    const [status, setStatus] = useState(taskBoxInfo.status);
    const [title, setTitle] = useState(taskBoxInfo.title);
    const [description, setDescription] = useState(taskBoxInfo.description);
    const [startDate, setStartDate] = useState<Date>(taskBoxInfo.startDate);


    // error validation to include when needed
    const[validationError, setValidationError] = useState({
        visible: false,
        text: ''
    })


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

    const location = useLocation();
    useEffect(()=>{
        saveTask()
    }, [location.hash])
    
    
    return (
            <div className="modal-task-details">

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
                            <option value='incurs'>In curs</option>
                            <option value='finalizate'>Finalizate</option>
                        </select>
                    </div>

                    <div className="group-item">
                        <h3>Data:</h3>
                        <div className="modal-date">
                            <DatePicker
                                id="modal-startdate-picker"
                                selected={startDate}
                                dateFormat="dd/MM/yyyy"
                                onChange={date=>setStartDate(date as Date)}
                                date={ new Date() }
                                className="calendarElement"
                                locale={ro}
                            />
                        </div>
                    </div>
                </div>
                


                {
                    validationError.visible &&
                    <p className="error">{validationError.text}</p>
                }
                <div className="modal-footer">
                    <button className="btn btn-delete" onClick={()=>openDelete(taskBoxInfo)}>Sterge Task</button>
                    <div>
                        <button className="btn" disabled={validationError.visible} onClick={()=>{
                            saveTask();                            
                            closeModal();
                        }}>Salveaza</button>
                        &nbsp;&nbsp;&nbsp;
                        <button className="btn" onClick={()=>closeModal()}>Renunta</button>
                    </div>
                </div>
                
            </div>
        
    )
}

export default TaskDetails;