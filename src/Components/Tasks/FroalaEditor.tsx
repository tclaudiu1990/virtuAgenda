import React from 'react';
import Editor from 'react-froala-wysiwyg';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/js/plugins/lists.min.js';

interface FroalaEditorProps {
  model: string;
  handleChange: (value:string) => void;
  checkForValidLinks: () => void;
}

const FroalaEditorComponent: React.FC<FroalaEditorProps> = ({ model, handleChange, checkForValidLinks }) => {

    // method fired every time the editor input changes
    const handleModelChange = (value: string) => {        
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
            handleChange(model);
        }
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
                htmlAllowedTags: ['p', 'a', 'ul', 'ol', 'li', 'strong', 'em' ],
                htmlAllowedAttrs: ['class', 'className', 'href', 'src'],

                events: {
                    initialized: handleModelChange
                }
            }}
        />
    );
};

export default FroalaEditorComponent;