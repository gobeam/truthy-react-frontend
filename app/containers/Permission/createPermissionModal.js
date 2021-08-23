import React, { useEffect } from 'react';
import { Modal } from 'antd';
import { useIntl } from 'react-intl';
import messages from 'containers/Permission/messages';
import PropTypes from 'prop-types';
import {
  clearFormAction,
  setFormValues,
  submitFormAction,
} from 'containers/Permission/actions';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeErrorSelector,
  makeInitiateCleanFieldSelector,
  makeIsLoadingSelector,
} from 'containers/Permission/selectors';
import { makeDeviceSelector } from 'containers/App/selectors';
import useGetPermissionForm from 'containers/Permission/hooks/useGetPermissionForm';
import commonMessage from 'common/messages';

const stateSelector = createStructuredSelector({
  errors: makeErrorSelector(),
  device: makeDeviceSelector(),
  initiateClean: makeInitiateCleanFieldSelector(),
  isLoading: makeIsLoadingSelector(),
});

const CreatePermissionModal = ({ onCancel, visible }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { errors, device, initiateClean, isLoading } =
    useSelector(stateSelector);

  const {
    Form,
    form,
    ResourceInput,
    DescriptionInput,
    MethodInput,
    PathInput,
  } = useGetPermissionForm({
    formName: 'create-permission',
    device,
  });

  const onSubmitCreateForm = async () => {
    await form.validateFields();
    dispatch(setFormValues(form.getFieldsValue()));
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
      okText={intl.formatMessage(commonMessage.okLabel)}
      cancelText={intl.formatMessage(commonMessage.cancel)}
    >
      <Form>
        <ResourceInput />
        <DescriptionInput />
        <MethodInput />
        <PathInput />
      </Form>
    </Modal>
  );
};

CreatePermissionModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  visible: PropTypes.bool,
};

export default CreatePermissionModal;
