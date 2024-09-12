import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

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
    // accept on every textarea change
    useEffect(()=>{    
        acceptEdit(textContent.length==0 ? '-' : textContent)
    }, [textContent])

    
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

                    </div>
                :
                    <span className="editable-item" onClick={()=>setIsEditable(true)}>{item}</span>
            }
        </>
        
    )
}

export default EditableTextArea;