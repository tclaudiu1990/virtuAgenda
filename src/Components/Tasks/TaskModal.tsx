import React, { useContext, useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import { TaskBoxInfo } from "../../types/TaskBoxInfo";
import { format } from "date-fns";
import { updateTask } from "../../Services/taskServices";
import EditableInput from "./EditableInput";
import { AppContext } from "../../App";
import EditableTextArea from "./EditableTextArea";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ro } from 'date-fns/locale';

interface TaskModalProps {
    taskBoxInfo: TaskBoxInfo;
    closeModal: () => void;
    openDelete: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({taskBoxInfo, closeModal, openDelete}) => {

    // app context
    const appContext = useContext(AppContext);

    // states of each editable item
    const [status, setStatus] = useState(taskBoxInfo.status);
    const [title, setTitle] = useState(taskBoxInfo.title);
    const [description, setDescription] = useState(taskBoxInfo.description);
    const [startDate, setStartDate] = useState<Date>(taskBoxInfo.startDate);
    const [deadline, setDeadline] = useState<Date>(taskBoxInfo.deadline);

    // formatting dates for display
    const startDateFormatted = format(taskBoxInfo.startDate, 'dd/MM/yyyy');
    const deadlineFormatted = format(taskBoxInfo.deadline, 'dd/MM/yyyy');

    // validation error
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
            startDate: startDate || new Date(),
            deadline: deadline || new Date()
        }

        // update task from taskServices.ts
        updateTask(newTaskInfo);
        appContext?.reloadTasks();

        closeModal();
    }
    
    const handleChangeDate = (date:Date | null, type:string) =>{
        // TO DO - start date can't be after the deadline 
        
    }

    useEffect(()=>{
        checkValidation();
    }, [startDate, deadline])

    const checkValidation =() => {
        if(startDate>deadline){
            setValidationError({
                visible: true,
                text: 'Termenul limita nu poate fi mai devreme decat data de incepere'
            })
        } else {
            setValidationError({
                visible: false,
                text: ''
            })
        }
    }

    
    return (
            <div className="modal-task-details">

                <small><em>Task ID: {taskBoxInfo.id}</em></small>

                <h3>Title</h3>

                <EditableInput 
                    acceptEdit={setTitle} 
                    item={<p>{title}</p>}
                    text={title}
                />

                <h3>Description</h3>
                <EditableTextArea
                    acceptEdit={setDescription} 
                    item={<p>{description}</p>}
                    text={description}
                />

                <h3>Status</h3>
                <select name="status" value={status} id="modal-task-status" onChange={(e)=>{setStatus(e.target.value)}}>
                    <option value='create'>Create</option>
                    <option value='incurs'>In curs</option>
                    <option value='finalizate'>Finalizate</option>
                </select>

                <label htmlFor="modal-startdate-picker">Data de start:</label>
                <div className="modal-date">
                    <DatePicker
                        id="modal-startdate-picker"
                        selected={startDate}
                        onChange={date=>setStartDate(date as Date)}
                        date={ new Date() }
                        className="calendarElement"
                        locale={ro}
                    />
                </div>
                <label htmlFor="modal-deadline-picker">Termen Limita:</label>            
                <div className="modal-date">
                    <DatePicker
                        id="modal-deadline-picker"
                        selected={deadline}
                        onChange={date=>setDeadline(date as Date)}
                        date={ new Date() }
                        className="calendarElement"
                        locale={ro}
                    />
                </div>

                {
                    validationError.visible &&
                    <p className="error">{validationError.text}</p>
                }
                <div className="modal-footer">
                    <button className="btn btn-delete" onClick={()=>openDelete()}>Sterge Task</button>
                    <div>
                        <button className="btn" disabled={validationError.visible} onClick={()=>saveTask()}>Salveaza</button>
                        &nbsp;&nbsp;&nbsp;
                        <button className="btn" onClick={()=>closeModal()}>Renunta</button>
                    </div>
                </div>
                
            </div>
        
    )
}

export default TaskModal;