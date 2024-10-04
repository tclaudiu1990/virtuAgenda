

import React, { useEffect, useRef, useState } from "react";
import { TaskBoxInfo } from "../../types/TaskBoxInfo";
import Editor from "./Editor/Editor";


interface TextAreaProps {
    acceptEdit: (value:string) => void;
    text: string;
    taskBoxInfo: TaskBoxInfo;
    closeModal: ()=> void;
}


const EditableTextArea: React.FC<TextAreaProps> = ({ acceptEdit, text}) => {

    // state to determine the visibility of the froala editor or the 
    const [isEditable, setIsEditable] = useState(false);
    // unparsed content
    const [editorContent, setEditorContent] = useState('');

    

    const editorRef = useRef<HTMLDivElement>(null);

    const changeEditorContent = (value: string) => {
        setEditorContent(value);
    };

    useEffect(() => {
        acceptEdit(editorContent);
    }, [editorContent]);

    const closeEditable = () => {
        setIsEditable(false);
    };

    const makeEditable = () => {
        setIsEditable(true);
    };

    // Check if the editor is already focused to avoid unnecessary focus stealing
    // useEffect(() => {
    //     if (isEditable && editorRef.current) {
    //     editorRef.current.focus();  // Focus only when making the editor editable
    //     }
    // }, [isEditable]);

    return (
        <>
            <div className="input-editable-container">
                <div
                    onClick={() => makeEditable()}
                    className={isEditable ? "editor-wraper" : "editor-wraper read-only"}
                >
                    <Editor
                        changeEditorContent={changeEditorContent}
                        isEditable={isEditable}
                        description={text}
                        closeEditable={closeEditable}
                    />
                </div>

                {isEditable && (
                    <div className="editableInput-menu-btn" onClick={() => closeEditable()}>
                    <i className="fa-solid fa-check"></i>
                    </div>
                )}
                </div>
                    
        </>
    );
}

export default EditableTextArea;