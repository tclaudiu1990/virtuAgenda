import {$getRoot, $getSelection, EditorState} from 'lexical';
import React, {useEffect, useState} from 'react';

import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {LexicalErrorBoundary} from '@lexical/react/LexicalErrorBoundary';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {AutoLinkNode, LinkNode} from '@lexical/link';
import {ListNode, ListItemNode} from '@lexical/list';
import {ListPlugin} from '@lexical/react/LexicalListPlugin';

import Toolbars from './Toolbars';

import './Editor.scss';
import { AutoLinkPlugin } from '@lexical/react/LexicalAutoLinkPlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';



// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: any) {
  console.error(error);
}




interface EditorProps {
  changeEditorContent: (val:string) => void;
  changeParsed: (val:string) => void;
  isEditable: boolean
  description: string
}

const Editor:React.FC<EditorProps> = ({changeEditorContent, changeParsed, isEditable, description}) => {
  const initialConfig = {
    namespace: 'MyEditor',
    theme: exampleTheme,
    onError,
    nodes: [      
      LinkNode,
      AutoLinkNode,
      ListNode,
      ListItemNode
    ]
  };



  // auto link regex
  const URL_MATCHER =
  /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
  const MATCHERS = [
    (text: any) => {
      const match = URL_MATCHER.exec(text);
      if (match === null) {
        return null;
      }
      const fullMatch = match[0];
      return {
        index: match.index,
        length: fullMatch.length,
        text: fullMatch,
        url: fullMatch.startsWith('http') ? fullMatch : `https://${fullMatch}`,
        attributes: { target: '_blank' },
        // attributes: { rel: 'noreferrer', target: '_blank' }, // Optional link attributes
      };
    },
  ];



  
  return (
    <LexicalComposer initialConfig={initialConfig}>      
      <Toolbars changeEditorContent={changeEditorContent} changeParsed={changeParsed} isEditable={isEditable} description={description}/>
      <div className='rich-text-container'>
        <RichTextPlugin          
          contentEditable={<ContentEditable/>}
          ErrorBoundary={LexicalErrorBoundary}          
        />
      </div>   
      <HistoryPlugin />
      <AutoFocusPlugin />
      
      <ListPlugin />
      <CheckListPlugin />
      <AutoLinkPlugin matchers={MATCHERS}/>
    </LexicalComposer>
  );
}




const exampleTheme = {
  ltr: 'ltr',
  rtl: 'rtl',
  paragraph: 'editor-paragraph',
  quote: 'editor-quote',
  heading: {
    h1: 'editor-heading-h1',
    h2: 'editor-heading-h2',
    h3: 'editor-heading-h3',
    h4: 'editor-heading-h4',
    h5: 'editor-heading-h5',
    h6: 'editor-heading-h6',
  },
  list: {
    nested: {
      listitem: 'editor-nested-listitem',
    },
    ol: 'editor-list-ol',
    ul: 'editor-list-ul',
    listitem: 'editor-listItem',
    listitemChecked: 'editor-listItemChecked',
    listitemUnchecked: 'editor-listItemUnchecked',
  },
  hashtag: 'editor-hashtag',
  image: 'editor-image',
  link: 'editor-link',
  text: {
    bold: 'bold',
    code: 'editor-textCode',
    italic: 'italic',
    strikethrough: 'editor-textStrikethrough',
    subscript: 'editor-textSubscript',
    superscript: 'editor-textSuperscript',
    underline: 'editor-textUnderline',
    underlineStrikethrough: 'editor-textUnderlineStrikethrough',
  },
  code: 'editor-code',
  codeHighlight: {
    atrule: 'editor-tokenAttr',
    attr: 'editor-tokenAttr',
    boolean: 'editor-tokenProperty',
    builtin: 'editor-tokenSelector',
    cdata: 'editor-tokenComment',
    char: 'editor-tokenSelector',
    class: 'editor-tokenFunction',
    'class-name': 'editor-tokenFunction',
    comment: 'editor-tokenComment',
    constant: 'editor-tokenProperty',
    deleted: 'editor-tokenProperty',
    doctype: 'editor-tokenComment',
    entity: 'editor-tokenOperator',
    function: 'editor-tokenFunction',
    important: 'editor-tokenVariable',
    inserted: 'editor-tokenSelector',
    keyword: 'editor-tokenAttr',
    namespace: 'editor-tokenVariable',
    number: 'editor-tokenProperty',
    operator: 'editor-tokenOperator',
    prolog: 'editor-tokenComment',
    property: 'editor-tokenProperty',
    punctuation: 'editor-tokenPunctuation',
    regex: 'editor-tokenVariable',
    selector: 'editor-tokenSelector',
    string: 'editor-tokenSelector',
    symbol: 'editor-tokenProperty',
    tag: 'editor-tokenProperty',
    url: 'editor-tokenOperator',
    variable: 'editor-tokenVariable',
  },
};

export default Editor;