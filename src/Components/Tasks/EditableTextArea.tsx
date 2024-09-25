import React, { useContext, useEffect, useState } from "react";
import { TaskBoxInfo } from "../../types/TaskBoxInfo";
import { AppContext } from "../../App";
import RichTextEditor from "./RichTextEditor";

interface TextAreaProps {
    acceptEdit: (value: string) => void;
    text: string;
    taskBoxInfo: TaskBoxInfo;
    closeModal: () => void;
}

const EditableTextArea: React.FC<TextAreaProps> = ({ acceptEdit, text }) => {
    const appContext = useContext(AppContext);
    
    const [isEditable, setIsEditable] = useState(false);
    const [textContent, setTextContent] = useState(text);

    useEffect(() => {
        setTextContent(text);
    }, [text]);

    const handleChange = (value: string) => {
        setTextContent(value);
    };


    const closeEditable = () => {
        acceptEdit(textContent);
        setIsEditable(false);
    };

    return (
        <>
            {
                isEditable ? (
                    <div className="input-editable-container">
                        <RichTextEditor
                            value={text}
                            onChange={handleChange}
                        />
                        <p><small>Crează link-uri către alte taskuri prin: {"{"}#id_task{"}"}. Ex: {"{"}#3{"}"}, {"{"}#12{"}"} etc.</small></p>
                        <div className="editableInput-menu-btn" onClick={closeEditable}>
                            <i className="fa-solid fa-check"></i>
                        </div>
                    </div>
                ) : (
                    <div
                        className="description-item"
                        onClick={() => setIsEditable(true)}                        
                        dangerouslySetInnerHTML={{ __html: textContent }}                        
                    ></div>
                )
            }
        </>
    );
}

export default EditableTextArea;