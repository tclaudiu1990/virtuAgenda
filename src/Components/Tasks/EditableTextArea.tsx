

import React, { useEffect, useRef, useState } from "react";
import { TaskBoxInfo } from "../../types/TaskBoxInfo";
import Editor from "./Editor/Editor";
import './EditableTextArea.scss'


interface TextAreaProps {
    acceptEdit: (value:string) => void;
    text: string;
    taskBoxInfo: TaskBoxInfo;
    closeModal: (val:string)=> void;
}


const EditableTextArea: React.FC<TextAreaProps> = ({ acceptEdit, text}) => {

    // state to determine the visibility of the froala editor or the 
    const [isEditable, setIsEditable] = useState(true);
    // unparsed content
    const [editorContent, setEditorContent] = useState(text);
    // parsed text to html
    const [parsedText, setParsedText] = useState('');
    

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
    useEffect(() => {
        if (isEditable && editorRef.current) {
        editorRef.current.focus();  // Focus only when making the editor editable
        }
    }, [isEditable]);


    // method to update parsed text
    // called from 
    const updateParsedText = (val:any) => {
        setParsedText(val)
    }

    
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsEditable(false);
            }
        };
        


        document.addEventListener('mouseup', handleClickOutside);
        return () => {
            document.removeEventListener('mouseup', handleClickOutside);
        };

    }, []);



    return (
        <>

            <div className="input-editable-container">
            {
                isEditable?
                (<>
                    <div ref={containerRef}
                        onClick={() => makeEditable()}
                        className={isEditable ? "editor-wraper" : "editor-wraper read-only"}
                    >
                        <Editor
                            changeEditorContent={changeEditorContent}
                            isEditable={isEditable}
                            description={text}
                            closeEditable={closeEditable}
                            updateParsedText={updateParsedText}
                        />
                    </div>
                    <div className="editableInput-menu-btn" onClick={() => closeEditable()}>
                        <i className="fa-solid fa-check"></i>
                    </div>
                </>)
                :
                <div className="non-editable-item" onClick={()=>setIsEditable(true)}
                    dangerouslySetInnerHTML={{__html: parsedText}}
                ></div>
            
            }

                

            </div>
                    
        </>
    );
}

export default EditableTextArea;