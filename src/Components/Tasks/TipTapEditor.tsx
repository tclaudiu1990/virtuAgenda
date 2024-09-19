import React, { useContext, useEffect, useState } from 'react';
import {  EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import '@tiptap/extension-text-style';
import '@tiptap/extension-text';
import Link from '@tiptap/extension-link';
import { AppContext } from '../../App';

interface TipTapProps{

    textContent: string;
    handleChange: (value:string) => void;
    checkForValidLinks: () => void;
}

const TiptapEditor:React.FC<TipTapProps> = ({textContent, handleChange, checkForValidLinks}) => {
    
  const [textValue, setTextValue] = useState(textContent);



    const editor = useEditor({
      extensions: [
        StarterKit,
        Link.configure({
          openOnClick: false,
          autolink: true,
          linkOnPaste: true,
        }),
      ],
      content: textValue,
      onUpdate: ({ editor }) => {
        const updatedHTML = editor.getHTML();
        setTextValue(updatedHTML);
      },
      autofocus: 'end',
    });

    const appContext = useContext(AppContext);


    const processContent = (rawContent: string) => {
      // Example processing: Replace {#taskId} with a link      
      return rawContent.replace(/\{#(\d+)\}/g, (_, taskId) => {        
        return `<a href="#${taskId}" class="task-link ${!appContext?.getTask(Number(taskId))?'link-not-valid':''}" onClick="event.preventDefault(); openModal(${taskId});">Task-${taskId}</a>`;
      });
    };


    useEffect(() => {
      // Process content after state updates
      const processedContent = processContent(textValue);
      if (processedContent !== textValue) {
        editor?.commands.setContent(processedContent, false); // Update editor content without adding to history
      }
      handleChange(processedContent)
    }, [textValue, editor]);

    if (!editor) {
      return null;
    }
    
    

  
    return (
      <div className='tiptap-editor'>
        {/* Custom Toolbar */}
        <div className="toolbar">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'is-active' : ''}
          >
            Bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}
          >
            Italic
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}
          >
            Bullet List
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'is-active' : ''}
          >
            Ordered List
          </button>
        </div>
        <EditorContent editor={editor} className="editor-content"/>
      </div>
    );
  };
  
  export default TiptapEditor;