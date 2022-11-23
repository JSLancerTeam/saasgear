import React, { memo, useEffect, useState } from 'react';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

type Props = {
  editorContent?: string;
  onChange: (...event: unknown[]) => void;
  className?: string;
}

const WYSIWYGEditor: React.FC<Props> = ({ editorContent = '', onChange, className }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  function onEditorStateChange(state: EditorState) {
    setEditorState(state);
    return onChange(draftToHtml(convertToRaw(state.getCurrentContent())));
  }

  useEffect(() => {
    
    if (editorContent === '') {
      setEditorState(EditorState.createEmpty());
    } else {
      const draft = htmlToDraft(editorContent);
      const contentState = EditorState.createWithContent(
        ContentState.createFromBlockArray(draft.contentBlocks),
      );

      setEditorState(contentState);
    }
  }, [editorContent]);

  return (
    <div className={className}>
      <Editor
        editorState={editorState}
        wrapperClassName="editor-wrapper"
        editorClassName="editor"
        toolbarClassName="toolbar"
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  );
};

export default memo(WYSIWYGEditor);
