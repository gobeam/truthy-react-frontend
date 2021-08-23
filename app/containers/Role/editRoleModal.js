import React, { useEffect } from 'react';
import { Modal } from 'antd';
import { useIntl } from 'react-intl';
import messages from 'containers/Role/messages';
import PropTypes from 'prop-types';
import {
  clearFormAction,
  setFormValues,
  submitFormAction,
} from 'containers/Role/actions';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeErrorSelector,
  makeInitialValuesSelector,
  makeInitiateCleanFieldSelector,
  makeIsLoadingSelector,
} from 'containers/Role/selectors';
import { makeDeviceSelector } from 'containers/App/selectors';
import useGetRoleForm from 'containers/Role/hooks/useGetRoleForm';
import commonMessage from 'common/messages';

const stateSelector = createStructuredSelector({
  errors: makeErrorSelector(),
  device: makeDeviceSelector(),
  initiateClean: makeInitiateCleanFieldSelector(),
  initialValues: makeInitialValuesSelector(),
  isLoading: makeIsLoadingSelector(),
});

const EditRoleModal = ({ onCancel, visible }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { errors, device, initiateClean, isLoading, initialValues } =
    useSelector(stateSelector);

  const { Form, form, NameInput, DescriptionInput } = useGetRoleForm({
    formName: 'create-role',
    device,
    initialValues,
  });

  const onSubmitCreateForm = async () => {
    await form.validateFields();
    dispatch(setFormValues(form.getFieldsValue()));
    dispatch(submitFormAction());
  };

  const onCancelModal = () => {
    form.resetFields();
    onCancel();
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

  useEffect(() => visible && form.resetFields(), [initialValues]);

  return (
    <Modal
      confirmLoading={isLoading}
      title={intl.formatMessage(messages.editTitle)}
      visible={visible}
      onOk={onSubmitCreateForm}
      onCancel={onCancelModal}
      okText={intl.formatMessage(commonMessage.okLabel)}
      cancelText={intl.formatMessage(commonMessage.cancel)}
    >
      <Form>
        <NameInput />
        <DescriptionInput />
      </Form>
    </Modal>
  );
};

EditRoleModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  visible: PropTypes.bool,
};

export default EditRoleModal;
