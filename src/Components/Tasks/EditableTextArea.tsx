

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
        console.log(`editableTextarea value before setting as task content`)
        console.log(value)
        setTextContent(value);
    };

    useEffect(()=>{
        console.log(`textContent is now:`)
        console.log(textContent)
        console.log(`Accepting edit:`)
        acceptEdit(textContent)
    }, [textContent])

    // const processDescription = (value: string) => {
    //     const valueWithoutDivs = value.slice(4,value.length-6)
    //     setDescription(valueWithoutDivs)
    // }

    return (
        <>
            {
                isEditable ?
                    <div className="input-editable-container">
                        
                        <FroalaEditorComponent
                            model={textContent}
                            handleChange={handleChange}
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