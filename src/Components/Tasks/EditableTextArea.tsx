

import React, { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { TaskBoxInfo } from "../../types/TaskBoxInfo";
import { AppContext } from "../../App";

import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';


import FroalaEditorComponent from './FroalaEditor';

interface TextAreaProps {
    acceptEdit: (value:string) => void;
    text: string;
    taskBoxInfo: TaskBoxInfo;
    closeModal: ()=> void;
}


const EditableTextArea: React.FC<TextAreaProps> = ({ acceptEdit, text}) => {
    const appContext = useContext(AppContext);

    // state to determine the visibility of the froala editor or the 
    const [isEditable, setIsEditable] = useState(false);
    const [textContent, setTextContent] = useState(text);


    const handleChange = (value: string) => {
        setTextContent(value);
    };

    useEffect(()=>{
        acceptEdit(textContent)
    }, [textContent])


    // everytime the task opens, check if taks links are still available
    const checkForValidLinks = () => {
        // get all taskLinks
        const taskLinks = document.querySelectorAll(`.task-link`)
        // find invalid task links and add link-not-valid class
        taskLinks.forEach(a => {
            const taskIdLink = a.getAttribute('href')?.substring(1);
            !appContext?.getTask(Number(taskIdLink))? a.classList.add(`link-not-valid`) :  a.classList.remove(`link-not-valid`)
        });
    }
    useEffect(()=>{
        checkForValidLinks();
    }, [])
    

    return (
        <>
            {
                isEditable ?
                    <div className="input-editable-container">
                        
                        <FroalaEditorComponent
                            model={textContent}
                            handleChange={handleChange}
                            checkForValidLinks={checkForValidLinks}
                        />
                        <p><small>Creaza link-uri catre alte taskuri prin: {"{"}#id_task{"}"}. Ex: {"{"}#3{"}"}, {"{"}#12{"}"} etc.</small></p>

                        <div className="editableInput-menu-btn" onClick={() => setIsEditable(false)}>
                            <i className="fa-solid fa-check"></i>
                        </div>
                    </div>
                    :
                    <div
                        className="description-item"
                        onClick={() => setIsEditable(true)} 
                        dangerouslySetInnerHTML={{ __html: textContent }}
                    ></div>
            }
        </>
    );
}

export default EditableTextArea;