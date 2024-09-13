import React, { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { TaskBoxInfo } from "../../types/TaskBoxInfo";
import { getTaskById } from "../../Services/taskServices";
import { AppContext } from "../../App";


interface TextAreaProps {
    acceptEdit: Dispatch<SetStateAction<string>>;
    text: string;
    taskBoxInfo: TaskBoxInfo;
    openModal: (taskBoxInfo:TaskBoxInfo)=> void;
}






const EditableTextArea:React.FC<TextAreaProps> = ({acceptEdit, text, taskBoxInfo, openModal}) => {


    // Function to parse and replace task references
    const parseTextWithLinks = (text: string) => {
        const regex = /\{#(\d+)\}/g;
        return text.split(regex).map((part, index) => {
            if (index % 2 === 1) {
                // Odd index is the taskId
                const taskId = parseInt(part, 10);
                const newInfo = getTaskById(taskId)
                console.log(`newInfo`)
                console.log(newInfo)
                if(newInfo){
                    return (
                        <span
                            key={index}
                            onClick={(e) => {openModal(newInfo); e.stopPropagation()}}
                            style={{ color: 'blue', cursor: 'pointer' }}
                        >
                            {`{#${taskId}}`}
                        </span>
                    )
                } else {
                    return(
                        <span
                            key={index}
                            style={{ color: 'red', cursor: 'pointer' }}
                        >
                            {`{#${taskId}}`}
                        </span>
                    )
                }
                
            }
            // Even index is the text part
            return part;
        });
    };


    const appContext = useContext(AppContext)

    // toggle editable textarea or normal html element
    const [isEditable, setIsEditable] = useState(false)
    // text inside textarea
    const [textContent, setTextContent] = useState(text)

    // setting the text content for the textarea
    const handleChange = (value: string) => {        
        setTextContent(value);        
    }

    // updating the actual text inside the modal
    // accept on every textarea change
    useEffect(()=>{    
        acceptEdit(textContent.length==0 ? '-' : textContent)
    }, [textContent])


    // ref to the quill textarea
    const inputElement = useRef<HTMLDivElement>(null)
    // auto focus on quill text editor when clicking on description item
    useEffect(()=>{
        if(isEditable && inputElement.current){inputElement.current.focus()}
    }, [isEditable])


    
    return(
        <>
            {
                isEditable?
                    <div className="input-editable-container" ref={inputElement}>
                        <ReactQuill                            
                            className="input-editable"
                            theme="snow"
                            modules={modules}
                            formats={formats}
                            value={textContent}
                            onChange={handleChange}
                        />
                        <div className="editableInput-menu-btn" onClick={()=>setIsEditable(false)}>
                            <i className="fa-solid fa-check"></i>
                        </div>
                    </div>
                :
                    <div 
                        className="description-item" 
                        onClick={()=>setIsEditable(true)}
                        // dangerouslySetInnerHTML={{ __html: text }}
                    >{parseTextWithLinks(text)}</div>
            }
        </>
        
    )
}
// Modules and formats to control toolbar options
const modules = {
    toolbar: [
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['bold', 'italic', 'underline'],
        ['link']
    ],
    clipboard: {
        matchVisual: false
    }
};
const formats = ['list', 'bullet', 'bold', 'italic', 'underline', 'link'];

export default EditableTextArea;