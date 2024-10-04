import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

type InputProps = {
    acceptEdit: Dispatch<SetStateAction<string>>;
    item: React.ReactNode;
    text: string;
}

// This input can toggle between non editable item and editable item
const EditableInput: React.FC<InputProps> = ({acceptEdit, item, text}) => {

    // state that holds the text of the input
    const [textContent, setTextContent] = useState(text)

    // toggle state of editable input / non editable html element
    const [isEditable, setIsEditable] = useState(false)

    // Sets the text content for the input
    const handleChange = (textElement:HTMLInputElement) => {
        setTextContent(textElement.value);
    }

    // When the `text` prop changes, update `textContent` state
    useEffect(() => {
        setTextContent(text);
    }, [text]);

    
    // fires acceptEdit on parent on every textContent change
    useEffect(()=>{        
        acceptEdit(textContent.length==0 ? '-' : textContent)
    }, [textContent])

    // reference to the input element
    const inputElement = useRef<HTMLInputElement>(null)
    // when editable state, focus on the element to begin writing
    useEffect(()=>{
        if(isEditable&&inputElement.current){inputElement.current.focus()}
    },[isEditable])

    return(
        <>
            {
                isEditable?
                    <div className="input-editable-container">
                        <input
                            ref={inputElement}
                            maxLength={70}
                            className="input-editable"
                            type="text"
                            value={textContent}
                            onChange={(e)=>handleChange(e.currentTarget as HTMLInputElement)}
                            onBlur={()=>setIsEditable(false)}                      
                        /> 
                    </div>
                :
                    <span className="non-editable-item" onClick={()=>setIsEditable(true)}>{item}</span>
            }
        </>
        
    )



   
}

export default EditableInput;