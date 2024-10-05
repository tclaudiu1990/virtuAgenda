import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {mergeRegister} from '@lexical/utils';
import {
    $getSelection,
    $isRangeSelection,
    EditorState,
    FORMAT_TEXT_COMMAND,
    SELECTION_CHANGE_COMMAND
} from 'lexical';
import { $generateHtmlFromNodes } from '@lexical/html';

import {
    $isListNode,
    INSERT_CHECK_LIST_COMMAND,
    INSERT_ORDERED_LIST_COMMAND,
    INSERT_UNORDERED_LIST_COMMAND,
    REMOVE_LIST_COMMAND,
} from '@lexical/list';


const LowPriority = 1;

function Divider() {
  return <div className="divider" />;
}



interface ToolbarProps {
    changeEditorContent: (val:string) => void
    isEditable: boolean
    description: string
    updateParsedText: (val:string) => void
}




 const ToolbarPlugin:React.FC<ToolbarProps> = ({changeEditorContent, isEditable, description, updateParsedText}) => {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnorderedList, setIsUnorderedList] = useState(false);
  const [isOrderedList, setIsOrderedList] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isCheckList, setIsCheckList] = useState(false);

  // sends the stringified content to EditableTextArea to be saved if accepted
  const handleChange = (editorState: EditorState) => {
    const stringified = JSON.stringify(editorState)
    changeEditorContent(stringified);
  }

  // updating toolbar based on selection state (activate buttons for bold, italic etc.)
  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));

      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === 'root'
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();

      // Update list format based on element
      setIsOrderedList($isListNode(element) && element.getTag() === 'ol');
      setIsUnorderedList($isListNode(element) && element.getTag() === 'ul' && element.getListType() != 'check');
      setIsCheckList($isListNode(element) && element.getListType() === 'check');
    }
  }, [editor]);




  // method to load the saved description into the editor
  const handleLoad = ()=>{
    if(description){
        const stateToLoad = editor.parseEditorState(description);
        editor.setEditorState(stateToLoad)
    }
  }

  // logic that runs when editor updates
   useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({editorState}) => {
        editorState.read(() => {
          updateToolbar();
        });
        // generate and load parsed text into div placeholder
        convertToHtml();
        handleChange(editorState);
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          updateToolbar();
          return false;
        },
        LowPriority
      )
    );
  }, [editor, updateToolbar]);



  // Method to toggle lists (unordered, ordered, checklist)
  const formatList = (listType: 'ul' | 'ol' | 'check') => {
     if (listType === 'ol') {
      if (isOrderedList) {
        editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
      } else {
        editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
      }
    } else if (listType === 'check') {
      if (isCheckList) {
        setIsUnorderedList(false);
        editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined); // Correct command to remove checklist
      } else {
        setIsUnorderedList(false);
        editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined); // Correct command to insert checklist
      }
    } else if (listType === 'ul') {
      if (isUnorderedList) {
        editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
      } else {
        editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
      }
    }
  };


  // generate and load parsed text into div placeholder
  const convertToHtml = () => {
    editor.update(() => {
      const htmlString = $generateHtmlFromNodes(editor);
      updateParsedText(htmlString);
    });
  };
  


  // make editor read-only or editable based on isEditable (on editor click)
  useEffect(() => {
    editor.setEditable(isEditable);
  }, [isEditable]);

  
  useEffect(()=>{
    handleLoad()
  }, [])



  if (!isEditable) {
    return null;
  }

  

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
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
              }}
              className={'toolbar-item spaced ' + (isStrikethrough ? 'active' : '')}
              aria-label="Format Strikethrough">
              <i className="fa-solid fa-strikethrough"></i>
            </button>

            <button
              onClick={() => formatList('ul')}
              className={'toolbar-item spaced ' + (isUnorderedList ? 'active' : '')}
              aria-label="Unordered List"
            >
              <i className="fa-solid fa-list"></i>
            </button>
            <button
              onClick={() => formatList('ol')}
              className={'toolbar-item spaced ' + (isOrderedList ? 'active' : '')}
              aria-label="Ordered List"
            >
              <i className="fa-solid fa-list-ol"></i>
            </button>

            
            <button
              onClick={() =>formatList('check')}
              className={'toolbar-item spaced ' + (isCheckList ? 'active' : '')}
              aria-label="Check List"
            >
              <i className="fa-regular fa-square-check"></i>
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
