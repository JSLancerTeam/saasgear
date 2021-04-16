import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { COLORS } from '@/constants/style';

const Wrapper = styled.div`
  .editor-wrapper {
    background: ${COLORS.LIGHT_GRAY};
    border: 1px solid ${COLORS.WHITE_BLUE};
    border-radius: 10px;
    overflow: hidden;
  }

  .editor {
    padding: 10px;
  }

  .toolbar {
    border: none;
    border-bottom: 1px solid ${COLORS.WHITE_BLUE};
  }
`;

const WYSIWYGEditor = ({ editorContent = '', onChange, className }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  function onEditorStateChange(state) {
    setEditorState(state);
    return onChange(draftToHtml(convertToRaw(state.getCurrentContent())));
  }

  useEffect(() => {
    if (editorContent === '') {
      setEditorState(EditorState.createEmpty());
    } else {
      const contentState = EditorState.createWithContent(
        ContentState.createFromBlockArray(htmlToDraft(editorContent)),
      );

      setEditorState(contentState);
    }
  }, [editorContent]);

  return (
    <Wrapper>
      <Editor
        editorState={editorState}
        wrapperClassName="editor-wrapper"
        editorClassName="editor"
        toolbarClassName="toolbar"
        onEditorStateChange={onEditorStateChange}
      />
    </Wrapper>
  );
};

WYSIWYGEditor.propTypes = {
  onChange: PropTypes.func,
  className: PropTypes.string,
  editorContent: PropTypes.string,
};

export default memo(WYSIWYGEditor);
