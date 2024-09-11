import React, { Dispatch, SetStateAction, useState } from "react";

interface TextAreaProps {
    acceptEdit: Dispatch<SetStateAction<string>>;
    item: React.ReactNode;
    text: string;
}

const EditableTextArea:React.FC<TextAreaProps> = ({acceptEdit, item, text}) => {

    // toggle editable textarea or normal html element
    const [isEditable, setIsEditable] = useState(false)
    // text inside textarea
    const [textContent, setTextContent] = useState(text)

    const handleChange = (element:HTMLTextAreaElement) => {
        setTextContent(element.value);        
    }

    const handleAccept = () => {
        acceptEdit(textContent)
        setIsEditable(false)
    }

    return(
        <>
            {
                isEditable?
                    <div className="input-editable-container">

                        <textarea
                            className="input-editable"
                            value={textContent}
                            onChange={(e)=>handleChange(e.currentTarget as HTMLTextAreaElement)}
                        /> 

                        <div className="input-menu">
                            <div className="editableInput-menu-btn" onClick={()=>handleAccept()}>
                                <i className="fa-solid fa-check"></i>
                            </div>
                            <div className="editableInput-menu-btn" onClick={()=>setIsEditable(false)}>
                                <i className="fa-solid fa-x"></i>
                            </div>
                        </div>
                    </div>
                :
                    <span onClick={()=>setIsEditable(true)}>{item}</span>
            }
        </>
        
    )
}

export default EditableTextArea;