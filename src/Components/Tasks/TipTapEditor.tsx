import React, { useState } from 'react';
import {  EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import '@tiptap/extension-text-style';
import '@tiptap/extension-text';

interface TipTapProps{

    textContent: string;
    handleChange: (value:string) => void;
    checkForValidLinks: () => void;
}

const TiptapEditor:React.FC<TipTapProps> = ({textContent, handleChange, checkForValidLinks}) => {
    
    const update = (value: string) => {
        console.log(value)
    }
    
    const editor = useEditor({
      extensions: [StarterKit],
      content: textContent,
      onUpdate: ({editor})=>{update(editor.getHTML())},
    //   onSelectionUpdate: (selection) => { update(selection) },
      autofocus: 'end', // 'start', 'end', or 'true' to autofocus the editor when it mounts.
    });

  
  
    return (
      <div>
        <h2>Tiptap Editor</h2>
        <EditorContent editor={editor} />
      </div>
    );
  };
  
  export default TiptapEditor;