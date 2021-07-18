import React, { Component } from 'react';
import { Editor as Draft } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import htmlToDraft from 'html-to-draftjs';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import {
  customChunkRenderer,
  entityMapper,
  entityMapperToComponent,
} from 'components/DraftEditor/helper';
import PropTypes from 'prop-types';
import ToolWrapper from 'components/DraftEditor/ToolWrapper';
import commonMessages from 'common/messages';
import { FormattedMessage } from 'react-intl';
import { Input, Button } from 'antd';
import { CodeOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const styles = {
  editorStyle: (invalid) => ({
    backgroundColor: '#ffffff',
    border: `1px solid ${invalid ? 'red' : 'grey'}`,
    borderRadius: '2px',
    maxHeight: '30vh',
    minHeight: '300px',
    overflowY: 'auto',
    padding: '5px',
    width: 'inherit',
  }),
  toolbarStyle: {
    backgroundColor: '#f5f8fb',
    border: `1px solid grey`,
    borderBottom: '0px none',
    marginBottom: '0px',
    marginTop: '5px',
    width: 'inherit',
  },
  wrapperStyle: {},
};

function customBlockRenderFunc(block, config) {
  if (block.getType() === 'atomic') {
    const contentState = config.getEditorState().getCurrentContent();
    const entity = contentState.getEntity(block.getEntityAt(0));
    return {
      component: entityMapperToComponent(entity),
      editable: false,
      props: {
        children: () => entity.innerHTML,
      },
    };
  }
  return undefined;
}

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditorCode: false,
      editorHTML: '',
    };
  }

  onEditorStateChange = (editor) => {
    const editorHTML = draftToHtml(
      convertToRaw(editor.getCurrentContent()),
      null,
      false,
      entityMapper,
    );
    this.setState({ editorHTML });
  };

  onEditEditorHTML = ({ target: { value: editorHTML } }) =>
    this.setState({ editorHTML });

  toggleEditorCode = () => {
    const { showEditorCode } = this.state;
    const { editorState } = this.props;
    if (!showEditorCode) {
      this.onEditorStateChange(editorState);
    }
    this.setState({ showEditorCode: !showEditorCode });
  };

  addHtmlToEditor = () => {
    const { editorHTML } = this.state;

    const contentBlock = htmlToDraft(editorHTML, customChunkRenderer);
    let editor;
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks,
      );
      editor = EditorState.createWithContent(contentState);
    } else {
      editor = EditorState.createEmpty();
    }
    this.props.onChange(editor);
    this.setState({ showEditorCode: false });
  };

  render() {
    const { editorState, onEditorStateChange, toolbar, invalid } = this.props;

    const { showEditorCode, editorHTML } = this.state;

    const ShowEditorCode = () => (
      <ToolWrapper
        role="presentation"
        className="rdw-option-wrapper"
        onClick={this.toggleEditorCode}
      >
        <CodeOutlined />
        {showEditorCode ? (
          <FormattedMessage {...commonMessages.hideCode} />
        ) : (
          <FormattedMessage {...commonMessages.showCode} />
        )}
      </ToolWrapper>
    );

    return (
      <>
        <Draft
          editorStyle={styles.editorStyle(invalid)}
          toolbarStyle={styles.toolbarStyle}
          wrapperStyle={styles.wrapperStyle}
          editorState={editorState}
          name="content"
          onEditorStateChange={onEditorStateChange}
          toolbar={toolbar}
          toolbarCustomButtons={[<ShowEditorCode />]}
          customBlockRenderFunc={customBlockRenderFunc}
        />
        {showEditorCode && (
          <>
            <FormattedMessage {...commonMessages.sourceCode} />
            <TextArea
              rows={4}
              value={editorHTML}
              onChange={this.onEditEditorHTML}
            />
            <Button onClick={this.addHtmlToEditor}>
              <FormattedMessage {...commonMessages.complete} />
            </Button>
          </>
        )}
      </>
    );
  }
}

Editor.propTypes = {
  invalid: PropTypes.bool,
  editorState: PropTypes.object,
  toolbar: PropTypes.object,
  onChange: PropTypes.func,
  onEditorStateChange: PropTypes.func,
};
export default Editor;
