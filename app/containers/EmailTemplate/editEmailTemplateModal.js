import React, { useEffect } from 'react';
import { Modal } from 'antd';
import { useIntl } from 'react-intl';
import messages from 'containers/EmailTemplate/messages';
import PropTypes from 'prop-types';
import {
  clearFormAction,
  getTemplateByIdAction,
  setFormValues,
  submitFormAction,
} from 'containers/EmailTemplate/actions';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeErrorSelector,
  makeInitialValuesSelector,
  makeInitiateCleanFieldSelector,
  makeIsLoadingSelector,
  makeUpdateIdSelector,
} from 'containers/EmailTemplate/selectors';
import { makeDeviceSelector } from 'containers/App/selectors';
import useGetEmailTemplateForm from 'containers/EmailTemplate/hooks/useGetEmailTemplateForm';
import htmlToDraft from 'html-to-draftjs';
import { ContentState, EditorState } from 'draft-js';
import commonMessage from 'common/messages';

const stateSelector = createStructuredSelector({
  errors: makeErrorSelector(),
  device: makeDeviceSelector(),
  initiateClean: makeInitiateCleanFieldSelector(),
  isLoading: makeIsLoadingSelector(),
  initialValues: makeInitialValuesSelector(),
  id: makeUpdateIdSelector(),
});

const EditEmailTemplateModal = ({ onCancel, visible }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { errors, device, initiateClean, isLoading, initialValues, id } =
    useSelector(stateSelector);

  const {
    Form,
    form,
    body,
    setEditorState,
    TitleInput,
    SubjectInput,
    SenderInput,
    BodyInput,
  } = useGetEmailTemplateForm({
    formName: 'edit-email-template',
    device,
    initialValues,
  });

  const onSubmitCreateForm = async () => {
    await form.validateFields();
    dispatch(setFormValues({ ...form.getFieldsValue(), body }));
    dispatch(submitFormAction());
  };

  const onCancelModal = () => {
    onCancel();
    form.resetFields();
  };

  useEffect(() => {
    if (id) {
      dispatch(getTemplateByIdAction(id));
    }
  }, [id]);

  useEffect(() => {
    if (initiateClean) {
      dispatch(clearFormAction());
      if (form) {
        form.resetFields();
      }
      onCancel();
    }
  }, [initiateClean]);

  useEffect(() => {
    if (form && errors?.length) {
      form.setFields(errors);
    }
  }, [errors]);

  useEffect(() => {
    if (visible) {
      form.resetFields();
      if (initialValues.body) {
        const contentBlock = htmlToDraft(initialValues.body);
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks,
        );
        const editorDataState = EditorState.createWithContent(contentState);
        setEditorState(editorDataState);
      }
    }
  }, [initialValues]);

  return (
    <Modal
      confirmLoading={isLoading}
      title={intl.formatMessage(messages.addTitle)}
      visible={visible}
      onOk={onSubmitCreateForm}
      onCancel={onCancelModal}
      width={1000}
      okText={intl.formatMessage(commonMessage.okLabel)}
      cancelText={intl.formatMessage(commonMessage.cancel)}
    >
      <Form>
        <TitleInput />
        <SubjectInput />
        <SenderInput />
        <BodyInput />
      </Form>
    </Modal>
  );
};

EditEmailTemplateModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  visible: PropTypes.bool,
};

export default EditEmailTemplateModal;
