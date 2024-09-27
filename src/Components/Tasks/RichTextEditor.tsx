import React, { useEffect, useRef, useState, useContext } from 'react';
import { AppContext } from '../../App'; // Adjust this import path as needed

interface RichProps {
    value: string;
    onChange: (value: string) => void;
}

const RichTextEditor: React.FC<RichProps> = ({ value, onChange }) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const [editorValue, setEditorValue] = useState(value);
    const appContext = useContext(AppContext);
    const getTask = appContext?.getTask;

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.innerHTML = value;
        }
    }, [value]);

    const applyStyle = (command: string) => {
        document.execCommand(command, false, undefined);
        editorRef.current?.focus();
    };

    const insertLink = () => {
        let url = prompt('Enter the URL:');
        if (url) {
            // Add http:// if the URL doesn't start with a protocol
            if (!/^https?:\/\//i.test(url)) {
                url = 'http://' + url;
            }
            document.execCommand('createLink', false, url);
            editorRef.current?.focus();
        }
    };

    const wrapInList = (isOrdered: boolean) => {
        const command = isOrdered ? 'insertOrderedList' : 'insertUnorderedList';
        document.execCommand(command, false, undefined);
        editorRef.current?.focus();
    };


    const getCaretOffset = () => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return 0;
    
        const range = selection.getRangeAt(0);
        const preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(editorRef.current!);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        return preCaretRange.toString().length; // Get the caret position as text length
    };
    
    const setCaretOffset = (offset: number) => {
        const range = document.createRange();
        const selection = window.getSelection();
    
        let currentOffset = 0;
    
        const findNode = (node: Node): boolean => {
            if (node.nodeType === Node.TEXT_NODE) {
                const textLength = node.textContent?.length ?? 0;
                if (currentOffset + textLength >= offset) {
                    range.setStart(node, offset - currentOffset);
                    range.setEnd(node, offset - currentOffset);
                    return true;
                }
                currentOffset += textLength;
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                for (let i = 0; i < node.childNodes.length; i++) {
                    if (findNode(node.childNodes[i])) {
                        return true;
                    }
                }
            }
            return false;
        };
    
        findNode(editorRef.current!);
        selection?.removeAllRanges();
        selection?.addRange(range);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent default behavior
    
            // Insert a <br> tag at the caret position
            const selection = window.getSelection();
            const range = selection?.getRangeAt(0);
    
            if (range) {
                const br = document.createElement('br');
                range.insertNode(br);
    
                // Move the caret after the <br>
                const newRange = document.createRange();
                newRange.setStartAfter(br);
                newRange.setEndAfter(br);
                selection?.removeAllRanges();
                selection?.addRange(newRange);
            }
        }
    };
    
    const handleChange = () => {
        if (editorRef.current) {
            // Save the caret position as an offset
            const caretOffset = getCaretOffset();

            //task link offset
            let linkOffset = 0;
    
            // Get the current innerHTML and process task links
            let newValue = editorRef.current.innerHTML;
            newValue = newValue.replace(/\{#(\d+)\}/g, (match, taskId) => {
                const task = getTask?.(Number(taskId));
                const className = task ? 'link-valid' : 'link-not-valid';
                linkOffset+=2;
                return `<a href="/#${taskId}" class="${className}">Task ${taskId}</a>`;
            });
    
            // Update the editor content
            editorRef.current.innerHTML = newValue;
    
            // Restore the caret position after content update
            setCaretOffset(caretOffset+linkOffset);
    
            // Update parent component
            onChange(newValue);
        }
    };

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
                onInput={handleChange}
                onKeyDown={handleKeyDown} // Add this for handling Enter key
                dangerouslySetInnerHTML={{ __html: editorValue }}
                style={{
                    border: '1px solid #ccc',
                    padding: '10px',
                    minHeight: '200px',
                    cursor: 'text',
                }}
            />
        </div>
    );
};

export default RichTextEditor;