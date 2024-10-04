import { createEditor, EditorState } from 'lexical';
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';
import { $getRoot } from 'lexical';

export function convertToHtml(input: string): string {
  // Check if the input is already HTML
  if (input.trim().startsWith('<')) {
    return input; // It's already HTML, return as is
  }

  // Assume it's Lexical JSON and try to convert
  const editor = createEditor();

  let lexicalState: EditorState;
  try {
    lexicalState = editor.parseEditorState(input);
  } catch (error) {
    console.error("Failed to parse input as Lexical JSON:", error);
    return input; // Return original input if parsing fails
  }

  editor.setEditorState(lexicalState);

  let html = '';
  editor.update(() => {
    html = $generateHtmlFromNodes(editor, null);
  });

  return html;
}

export function convertHtmlToLexical(html: string): string {
  const editor = createEditor();

  editor.update(() => {
    const parser = new DOMParser();
    const dom = parser.parseFromString(html, 'text/html');
    const nodes = $generateNodesFromDOM(editor, dom);
    const root = $getRoot();
    root.clear();
    root.append(...nodes);
  });

  return JSON.stringify(editor.getEditorState());
}