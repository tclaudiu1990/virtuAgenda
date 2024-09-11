import React, { useContext, useState } from "react";
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
    openModal: () => void;
    closeModal: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({taskBoxInfo, openModal, closeModal}) => {

    // app context
    const appContext = useContext(AppContext);

    // states of each editable item
    const [status, setStatus] = useState(taskBoxInfo.status);
    const [title, setTitle] = useState(taskBoxInfo.title);
    const [description, setDescription] = useState(taskBoxInfo.description);
    const [startDate, setStartDate] = useState<Date | null>(taskBoxInfo.startDate);
    const [deadline, setDeadline] = useState<Date | null>(taskBoxInfo.deadline);

    // formatting dates for display
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
            startDate: startDate || new Date(),
            deadline: deadline || new Date()
        }

        // update task from taskServices.ts
        updateTask(newTaskInfo);
        appContext?.renderTasks();

        closeModal();
    }
    
    const handleChangeDate = (date:Date | null, type:string) =>{
        // TO DO - start date can't be after the deadline 
        if(type=='start'){

        } else {

        }
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
                
                <p>Data de start:</p>
                <div className="modal-date">
                    <DatePicker
                        id="modal-startdate-picker"
                        selected={startDate}
                        onChange={date=>handleChangeDate(date, 'start')}
                        date={ new Date() }
                        className="calendarElement"
                        locale={ro}
                    />
                </div>
                <p>Termen Limita:</p>
                
                <div className="modal-date">
                    <DatePicker
                        id="modal-deadline-picker"
                        selected={deadline}
                        onChange={date=>handleChangeDate(date, 'deadline')}
                        date={ new Date() }
                        className="calendarElement"
                        locale={ro}
                    />
                </div>
                <button className="btn" onClick={()=>saveTask()}>Save</button>
                &nbsp;&nbsp;&nbsp;
                <button className="btn" onClick={()=>closeModal()}>Discard</button>
            </div>
        </Modal>
        
    )
}

export default TaskModal;