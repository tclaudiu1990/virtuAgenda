import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

type InputProps = {
    acceptEdit: Dispatch<SetStateAction<string>>;
    item: React.ReactNode;
    text: string;
}

// This input will appear
const EditableInput: React.FC<InputProps> = ({acceptEdit, item, text}) => {

    // toggle editable input or normal html element
    const [isEditable, setIsEditable] = useState(false)
    // text inside input
    const [textContent, setTextContent] = useState(text)

    const handleChange = (textElement:HTMLInputElement) => {
        setTextContent(textElement.value);        
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

                        <input
                            className="input-editable"
                            type="text"
                            value={textContent}
                            onChange={(e)=>handleChange(e.currentTarget as HTMLInputElement)}
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

export default EditableInput;