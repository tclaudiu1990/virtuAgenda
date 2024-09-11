import React, { Dispatch, SetStateAction, useState } from "react";

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

    // setting the text content for the editable input
    const handleChange = (textElement:HTMLInputElement) => {
        setTextContent(textElement.value);        
    }

    // updating the actual text inside the modal
    const handleAccept = () => {
        acceptEdit(textContent.length==0 ? '-' : textContent)
        setIsEditable(false)
    }
    // hide the editable item and reset its contents to original text
    const handleReject = () => {
        setTextContent(text);
        setIsEditable(false)
    }

    return(
        <>
            {
                isEditable?
                    <div className="input-editable-container">
                        <input
                            maxLength={70}
                            className="input-editable"
                            type="text"
                            value={textContent}
                            onChange={(e)=>handleChange(e.currentTarget as HTMLInputElement)}                            
                        /> 

                        <div className="editableInput-menu">
                            <div className="editableInput-menu-btn" onClick={()=>handleAccept()}>
                                <i className="fa-solid fa-check"></i>
                            </div>
                            <div className="editableInput-menu-btn" onClick={()=>{handleReject()}}>
                                <i className="fa-solid fa-xmark"></i>
                            </div>
                        </div>
                    </div>
                :
                    <span className="editable-item" onClick={()=>setIsEditable(true)}>{item}</span>
            }
        </>
        
    )
}

export default EditableInput;