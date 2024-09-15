import React, { useContext } from "react";
import { TaskBoxInfo } from "../../types/TaskBoxInfo";
import './TaskBox.scss';
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";

interface TaskBoxProps{
    name: string;
    taskBoxInfo: TaskBoxInfo;
}

const TaskBox: React.FC<TaskBoxProps> = ({name, taskBoxInfo}) => {

    const appContext = useContext(AppContext);

    // router hooks
    const navigate = useNavigate();



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
                                appContext?.openDelete(taskBoxInfo)
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