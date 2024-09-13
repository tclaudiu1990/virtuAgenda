

import React, { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { TaskBoxInfo } from "../../types/TaskBoxInfo";
import { AppContext } from "../../App";



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
const formats = ['list', 'bullet', 'bold', 'italic', 'underline', 'link', 'taskLink'];



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

    const quillRef = useRef<ReactQuill | null>(null);

    const handleChange = (value: string) => {
        setTextContent(value);
    };

    useEffect(() => {
        acceptEdit(textContent.length === 0 ? '-' : textContent);
    }, [textContent]);

    useEffect(() => {
        if (isEditable && quillRef.current) {
            quillRef.current.getEditor().focus();
        }
    }, [isEditable]);

    return (
        <>
            {
                isEditable ?
                    <div className="input-editable-container">
                        <ReactQuill
                            ref={quillRef}
                            className="input-editable"
                            theme="snow"
                            modules={modules}
                            formats={formats}
                            value={textContent}
                            onChange={handleChange}
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