import React, { Dispatch, SetStateAction, useState } from "react";

type InputProps = {
    acceptEdit: Dispatch<SetStateAction<string>>;
    item: React.ReactNode;
    text: string;
}

// This input will appear
const EditableInput: React.FC<InputProps> = ({acceptEdit, item, text}) => {

    const [isEditable, setIsEditable] = useState(false)
    const [textContent, setTextContent] = useState(text)

    const handleChange = (textElement: React.FormEvent<HTMLParagraphElement>) => {
        setTextContent(textElement.currentTarget.innerText);
    }

    const handleAccept = () => {
        acceptEdit(textContent)
        setIsEditable(false)
    }
    return(
        <>
            {
                isEditable?
                    <div className="input-editable">

                        <p contentEditable="true"
                            onChange={(e)=>handleChange(e)}
                        >{text}</p>                         
                        

                        <div className="input-menu">
                            <div className="task-box-menu-btn" onClick={()=>handleAccept()}>
                                <i className="fa-solid fa-check"></i>
                            </div>
                            <div className="task-box-menu-btn" onClick={()=>setIsEditable(false)}>
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