import React from 'react';
import Editor from 'react-froala-wysiwyg';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/js/plugins/lists.min.js';

interface FroalaEditorProps {
  model: string;
  handleChange: (value:string) => void;
}

const FroalaEditorComponent: React.FC<FroalaEditorProps> = ({ model, handleChange }) => {


    const handleModelChange = (value: string) => {
        const valueWithLinks = value.replace(/\{#(\d+)\}/g, (_, taskId) => {
          return `<a href="#${taskId}" onClick="event.preventDefault(); openModal(${taskId});">Task-${taskId}</a>`;
        });
        console.log(valueWithLinks); // Debug statement
        handleChange(valueWithLinks);
    };


    return (
        <Editor
            tag='textarea'
            model={model}
            onModelChange={handleModelChange}
            config={{
                placeholderText: model,
                charCounterCount: true,
                listAdvancedTypes: true,
                fontFamilySelection: false,
                toolbarButtons: [
                    'bold', 'italic', 'underline',
                    'insertUnorderedList', 'insertOrderedList',
                    'insertLink','formatOL', 'formatUL'
                ],
                fontFamilyDefaultSelection: 'Montserrat',
                
            }}
        />
    );
};

export default FroalaEditorComponent;