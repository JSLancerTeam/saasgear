import React, { memo, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { EditorState, ContentState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from 'html-to-draftjs';

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const WYSIWYGEditor = ({ editorContent = '', onChange, className }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  function onEditorStateChange(state) {
    setEditorState(state);
    return onChange(
      draftToHtml(convertToRaw(state.getCurrentContent()))
    );
  };

  useEffect(() => {
    if (editorContent === '') {
      setEditorState(EditorState.createEmpty())
    } else {
      const contentState = EditorState.createWithContent(
        ContentState.createFromBlockArray(
          htmlToDraft(editorContent)
        ))

      setEditorState(contentState)
    }
  }, [editorContent])

  return (
    <Editor
      editorState={editorState}
      wrapperClassName={`p-4 border ${className}`}
      editorClassName="bg-gray-100 p-4 border"
      toolbarClassName="border"
      onEditorStateChange={onEditorStateChange}
    />
  );
};

WYSIWYGEditor.propTypes = {
  onChange: PropTypes.func,
  className: PropTypes.string,
  editorContent: PropTypes.string,
}

export default memo(WYSIWYGEditor);
