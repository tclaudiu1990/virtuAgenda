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

    // setting the text content for the textarea
    const handleChange = (element:HTMLTextAreaElement) => {
        setTextContent(element.value);        
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

                        <textarea
                            maxLength={800}
                            className="input-editable"
                            value={textContent}
                            onChange={(e)=>handleChange(e.currentTarget as HTMLTextAreaElement)}
                        /> 

                        <div className="editableInput-menu">
                            <div className="editableInput-menu-btn" onClick={()=>handleAccept()}>
                                <i className="fa-solid fa-check"></i>
                            </div>
                            <div className="editableInput-menu-btn" onClick={()=>handleReject()}>
                                <i className="fa-solid fa-x"></i>
                            </div>
                        </div>
                    </div>
                :
                    <span className="editable-item" onClick={()=>setIsEditable(true)}>{item}</span>
            }
        </>
        
    )
}

export default EditableTextArea;