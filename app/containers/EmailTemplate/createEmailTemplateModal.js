import React, { useEffect } from 'react';
import { Modal } from 'antd';
import { useIntl } from 'react-intl';
import messages from 'containers/EmailTemplate/messages';
import commonMessage from 'common/messages';
import PropTypes from 'prop-types';
import {
  clearFormAction,
  setFormValues,
  submitFormAction,
} from 'containers/EmailTemplate/actions';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeErrorSelector,
  makeInitiateCleanFieldSelector,
  makeIsLoadingSelector,
} from 'containers/EmailTemplate/selectors';
import { makeDeviceSelector } from 'containers/App/selectors';
import useGetEmailTemplateForm from 'containers/EmailTemplate/hooks/useGetEmailTemplateForm';

const stateSelector = createStructuredSelector({
  errors: makeErrorSelector(),
  device: makeDeviceSelector(),
  initiateClean: makeInitiateCleanFieldSelector(),
  isLoading: makeIsLoadingSelector(),
});

const CreateEmailTemplateModal = ({ onCancel, visible }) => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const { errors, device, initiateClean, isLoading } =
    useSelector(stateSelector);

  const { Form, form, body, TitleInput, SubjectInput, SenderInput, BodyInput } =
    useGetEmailTemplateForm({
      formName: 'create-email-template',
      device,
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
    if (initiateClean) {
      dispatch(clearFormAction());
      if (form) {
        form.resetFields();
      }
      onCancel();
    }
  }, [initiateClean]);

  useEffect(() => {
    if (errors?.length) {
      form.setFields(errors);
    }
  }, [errors]);

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

CreateEmailTemplateModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  visible: PropTypes.bool,
};

export default CreateEmailTemplateModal;
