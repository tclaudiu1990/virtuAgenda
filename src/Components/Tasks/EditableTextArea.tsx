

import React, { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { TaskBoxInfo } from "../../types/TaskBoxInfo";
import { AppContext } from "../../App";

import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';


import FroalaEditorComponent from './FroalaEditor';

interface TextAreaProps {
    acceptEdit: Dispatch<SetStateAction<string>>;
    text: string;
    taskBoxInfo: TaskBoxInfo;
    openModal: (taskBoxInfo:TaskBoxInfo)=> void;
    closeModal: ()=> void;
}


const EditableTextArea: React.FC<TextAreaProps> = ({ acceptEdit, text, taskBoxInfo, openModal, closeModal }) => {
    const appContext = useContext(AppContext);

    const [isEditable, setIsEditable] = useState(false);
    const [textContent, setTextContent] = useState(text);


    const handleChange = (value: string) => {

        setTextContent(value);
    };

    useEffect(()=>{
        acceptEdit(textContent)
    }, [textContent])

    
    return (
        <>
            {
                isEditable ?
                    <div className="input-editable-container">
                        
                        <FroalaEditorComponent
                            model={textContent}
                            handleChange={handleChange}
                            
                        />

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