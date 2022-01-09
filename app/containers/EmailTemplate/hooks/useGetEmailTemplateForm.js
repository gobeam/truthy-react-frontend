import React, { useState } from 'react';
import { Col, Form } from 'antd';
import FormWrapper from 'components/FormWrapper';
import messages from 'containers/EmailTemplate/messages';
import FormInputWrapper from 'components/FormInputWrapper';
import { FormattedMessage, useIntl } from 'react-intl';
import DraftEditor from 'components/DraftEditor';
import commonMessage from 'common/messages';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const wrapperCol = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 8,
  xl: 8,
  xxl: 6,
};

const useGetEmailTemplateForm = ({
  responsive = false,
  formName = 'role-form',
  initialValues = {},
  device,
}) => {
  const [formInstance] = Form.useForm();
  const intl = useIntl();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [body, setBody] = useState('');

  const onEditorStateChange = (editState) => {
    setEditorState(editState);
    if (editState.getCurrentContent()) {
      setBody(draftToHtml(convertToRaw(editState.getCurrentContent())));
    }
  };

  const WrappedForm = ({ ...props }) => (
    <FormWrapper
      {...props}
      values={initialValues}
      formInstance={formInstance}
      layout={layout}
      device={device}
      responsive={responsive}
      name={formName}
      classname="form-ant-items"
    />
  );

  WrappedForm.Item = Form.Item;

  const TitleInput = () => {
    const titleInput = (
      <FormInputWrapper
        label={messages.titleLabel}
        rules={[
          {
            required: true,
            message: <FormattedMessage {...messages.titleLabel} />,
          },
        ]}
        name="title"
        id="title"
        type="text"
        required
        placeholder={messages.titlePlaceHolder}
      />
    );
    return responsive ? <Col {...wrapperCol}>{titleInput}</Col> : titleInput;
  };

  const SubjectInput = () => {
    const subjectInput = (
      <FormInputWrapper
        label={messages.subjectLabel}
        rules={[
          {
            required: true,
            message: <FormattedMessage {...messages.subjectPlaceHolder} />,
          },
        ]}
        name="subject"
        id="subject"
        type="text"
        required
        placeholder={messages.subjectPlaceHolder}
      />
    );
    return responsive ? (
      <Col {...wrapperCol}>{subjectInput}</Col>
    ) : (
      subjectInput
    );
  };

  const SenderInput = () => {
    const senderInput = (
      <FormInputWrapper
        label={messages.senderLabel}
        rules={[
          {
            required: true,
            message: <FormattedMessage {...messages.senderPlaceHolder} />,
          },
          {
            type: 'email',
            message: <FormattedMessage {...commonMessage.validEmailRequired} />,
          },
        ]}
        name="sender"
        id="sender"
        type="email"
        required
        placeholder={messages.senderPlaceHolder}
      />
    );
    return responsive ? <Col {...wrapperCol}>{senderInput}</Col> : senderInput;
  };

  const BodyInput = () => {
    const bodyInput = (
      <Form.Item label={intl.formatMessage(messages.bodyLabel)} name="body">
        <DraftEditor
          invalid={formInstance.getFieldError('body').length > 0}
          onChange={onEditorStateChange}
          onEditorStateChange={onEditorStateChange}
          editorState={editorState}
        />
      </Form.Item>
    );
    return responsive ? <Col {...wrapperCol}>{bodyInput}</Col> : bodyInput;
  };

  return {
    form: formInstance,
    body,
    setEditorState,
    Form: WrappedForm,
    TitleInput,
    SubjectInput,
    SenderInput,
    BodyInput,
  };
};

export default useGetEmailTemplateForm;
