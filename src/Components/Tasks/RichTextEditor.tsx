import React, { useEffect, useRef, useState } from 'react';


interface RichProps {
    value: string
    onChange: (value:string) => void
}

const RichTextEditor: React.FC<RichProps> = ({value , onChange}) => {
    const editorRef = useRef<HTMLDivElement>(null);

    const [editorValue, setEditorValue] = useState(value);

    useEffect(()=>{
        onChange(editorValue)
    }, [editorValue])

    const applyStyle = (command: string) => {
        document.execCommand(command, false, undefined);
        editorRef.current?.focus(); // Keep focus on the editor after command
    };

    const insertLink = () => {
        const url = prompt('Enter the URL:');
        if (url) {
            document.execCommand('createLink', false, url);
            editorRef.current?.focus(); // Keep focus on the editor after command
        }
    };

    const wrapInList = (isOrdered: boolean) => {
        const command = isOrdered ? 'insertOrderedList' : 'insertUnorderedList';
        document.execCommand(command, false, undefined);
        editorRef.current?.focus(); // Keep focus on the editor after command
    };

    const handleChange = (e: any) => {
        setEditorValue(e.target)
    }
    return (
        <div>
            <div className="toolbar">
                <button onClick={() => applyStyle('bold')}>Bold</button>
                <button onClick={() => applyStyle('italic')}>Italic</button>
                <button onClick={() => applyStyle('underline')}>Underline</button>
                <button onClick={insertLink}>Insert Link</button>
                <button onClick={() => wrapInList(true)}>Ordered List</button>
                <button onClick={() => wrapInList(false)}>Unordered List</button>
            </div>
            <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning={true}
                onInput={(e)=>handleChange(e)}
                dangerouslySetInnerHTML={{__html: editorValue}}
                style={{
                    border: '1px solid #ccc',
                    padding: '10px',
                    minHeight: '200px',
                    cursor: 'text',
                }}
            ></div>
        </div>
    );
};

export default RichTextEditor;