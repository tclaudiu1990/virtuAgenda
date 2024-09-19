import React, { useEffect, useState } from 'react';
import {  EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import '@tiptap/extension-text-style';
import '@tiptap/extension-text';
import Link from '@tiptap/extension-link';

interface TipTapProps{

    textContent: string;
    handleChange: (value:string) => void;
    checkForValidLinks: () => void;
}

const TiptapEditor:React.FC<TipTapProps> = ({textContent, handleChange, checkForValidLinks}) => {
    
    const update = (value: string) => {
      checkForValidLinks()
        if(value!=undefined){
          // add <a> tags around any text of format {#task_id} and add links to appropriate tasks
          const valueWithLinks = value.replace(/\{#(\d+)\}/g, (_, taskId) => {
              return `<a href="#${taskId}" class="task-link" onClick="event.preventDefault(); openModal(${taskId});">Task-${taskId}</a>`;
            });
          // recheck for invalid links and add invalid classes if necessary
          checkForValidLinks()
          // fires handleChange on parent
          handleChange(valueWithLinks);
      } else {
          //(when initialized input value is undefined) 
          // check links of the model instead of the value 
          checkForValidLinks()
          handleChange(value);
      }
    }
    


    const editor = useEditor({
      extensions: [
        StarterKit,
        Link.configure({
          openOnClick: false,
          autolink: true,
          linkOnPaste: true,
        }),
      ],
      content: textContent,
      onUpdate: ({ editor }) => {
        update(editor.getHTML());
      },
      //   onSelectionUpdate: (selection) => { update(selection) },
      autofocus: 'end',
    });

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