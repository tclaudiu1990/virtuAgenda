

import React, { useContext, useEffect, useState } from "react";
import { TaskBoxInfo } from "../../types/TaskBoxInfo";
import { AppContext } from "../../App";
import Editor from "./Editor/Editor";


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
    // parsed content
    const [parsedContent, setParsedContent] = useState('');
    // unparsed content
    const [editorContent, setEditorContent] = useState('');

    
    // method to update the UNPARSED text
    const changeEditorContent = (value: string) => {
        setEditorContent(value)
    }

    // method to update the PARSED text
    const changeParsed = (value: string) => {
        setParsedContent(value)
    }

    // check for valid links every time text content changes and fires acceptEdit on parent
    useEffect(()=>{
        acceptEdit(editorContent);
    }, [editorContent])


    const preventInvalidClick = (e:Event) => {
        e.preventDefault()
    }



    const closeEditable = () => {
        setIsEditable(false);
    }
    

    const makeEditable = (e: any) =>{
        e.stopPropagation()
        setIsEditable(true);
    }

    // check for valid links every time isEditable changes
    useEffect(()=>{
        acceptEdit(editorContent)
    }, [editorContent])


    return (
        <>
            <div className="input-editable-container">

                
                <div onClick={(e)=>makeEditable(e)} className={isEditable?'editor-wraper':'editor-wraper read-only'}>
                    <Editor changeEditorContent={changeEditorContent} changeParsed={changeParsed} isEditable={isEditable} description={text}/>                        
                </div>

                {
                    isEditable?                    
                    <>
                        <p><small>Crează link-uri către alte taskuri prin: {"{"}#id_task{"}"}. Ex: {"{"}#3{"}"}, {"{"}#12{"}"} etc.</small></p>

                        <div className="editableInput-menu-btn" onClick={() => closeEditable()}>
                            <i className="fa-solid fa-check"></i>
                        </div>
                    </>
                    :
                    ''
                }
                
            </div>
                    
        </>
    );
}

export default EditableTextArea;