import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {mergeRegister} from '@lexical/utils';
import {
    $getRoot,
    $getSelection,
    $isRangeSelection,
    CAN_REDO_COMMAND,
    CAN_UNDO_COMMAND,
    EditorState,
    FORMAT_ELEMENT_COMMAND,
    FORMAT_TEXT_COMMAND,
    REDO_COMMAND,
    RootNode,
    SELECTION_CHANGE_COMMAND,
    UNDO_COMMAND,
} from 'lexical';

import {$isLinkNode, TOGGLE_LINK_COMMAND} from '@lexical/link';
import {
    $isListNode,
    INSERT_CHECK_LIST_COMMAND,
    INSERT_ORDERED_LIST_COMMAND,
    INSERT_UNORDERED_LIST_COMMAND,
    ListNode,
} from '@lexical/list';


const LowPriority = 1;

function Divider() {
  return <div className="divider" />;
}



interface ToolbarProps {
    changeEditorContent: (val:string) => void
    changeParsed: (val: string) => void
    isEditable: boolean
    description: string
}


 const ToolbarPlugin:React.FC<ToolbarProps> = ({changeEditorContent, changeParsed, isEditable, description}) => {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);


  // change appearance of buttons when bold or italic
  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
    }
  }, []);


  const handleChange = (editorState: EditorState) => {
    const stringified = JSON.stringify(editorState)
    // sends the stringified content to EditableTextArea to be saved if accepted
    changeEditorContent(stringified);
    console.log(stringified)
  }

  const handleLoad = ()=>{
    if(description){
        const stateToLoad = editor.parseEditorState(description);
        editor.setEditorState(stateToLoad)
    }
  }
  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({editorState}) => {
        editorState.read(() => {
          $updateToolbar();
        });
        handleChange(editorState)
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        LowPriority,
      )
    );
  }, [editor, $updateToolbar]);

  useEffect(()=>{
    handleLoad()
  }, [])


  // set read only or editable
  useEffect(()=>{
    editor.setEditable(isEditable)
  }, [isEditable])

  return (

    
    <div className="toolbar" ref={toolbarRef}>

        {isEditable?
        
        <>
            <button
                onClick={() => {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
                }}
                className={'toolbar-item spaced ' + (isBold ? 'active' : '')}
                aria-label="Format Bold">
                B
            </button>
            <button
                onClick={() => {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
                }}
                className={'toolbar-item spaced ' + (isItalic ? 'active' : '')}
                aria-label="Format Italics">
                <em>i</em>
            </button>
            

            <button
                onClick={() => {
                editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
                }}
                className="toolbar-item spaced"
                aria-label="Unordered List">
                <i className="fa-solid fa-list"></i>
            </button>

            <button
                onClick={() => {
                editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
                }}
                className="toolbar-item spaced"
                aria-label="Ordered List">
                <i className="fa-solid fa-list-ol"></i>
            </button>
            

            <Divider />
        </>
    
        :

        ''
        }

        
      
      
    </div>
  );
}


export default ToolbarPlugin;
