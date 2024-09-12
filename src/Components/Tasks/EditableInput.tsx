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

    // setting the text content for the editable input
    const handleChange = (textElement:HTMLInputElement) => {
        setTextContent(textElement.value);        
    }

    // accept on every input change
    useEffect(()=>{        
        acceptEdit(textContent.length==0 ? '-' : textContent)
    }, [textContent])


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
                    </div>
                :
                    <span className="editable-item" onClick={()=>setIsEditable(true)}>{item}</span>
            }
        </>
        
    )
}

export default EditableInput;