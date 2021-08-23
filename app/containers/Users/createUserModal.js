import React, { useEffect } from 'react';
import { Modal } from 'antd';
import useGetUserForm from 'containers/Users/hooks/useGetUserForm';
import { useIntl } from 'react-intl';
import messages from 'containers/Users/messages';
import PropTypes from 'prop-types';
import {
  clearFormAction,
  setFormValues,
  submitFormAction,
} from 'containers/Users/actions';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeClearFormFieldSelector,
  makeErrorSelector,
  makeRolesListSelector,
} from 'containers/Users/selectors';
import { makeDeviceSelector } from 'containers/App/selectors';
import commonMessage from 'common/messages';

const stateSelector = createStructuredSelector({
  roles: makeRolesListSelector(),
  errors: makeErrorSelector(),
  device: makeDeviceSelector(),
  clearFormField: makeClearFormFieldSelector(),
});

const CreateUserModal = ({ onCancel, visible }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { roles, errors, device, clearFormField } = useSelector(stateSelector);

  const {
    Form,
    form,
    NameInput,
    EmailInput,
    StatusInput,
    UsernameInput,
    RoleInput,
  } = useGetUserForm({
    formName: 'create-user',
    roles,
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
    if (clearFormField) {
      dispatch(clearFormAction());
      if (form) {
        form.resetFields();
      }
      onCancel();
    }
  }, [clearFormField]);

  useEffect(() => {
    if (errors?.length) {
      form.setFields(errors);
    }
  }, [errors]);

  return (
    <Modal
      title={intl.formatMessage(messages.addTitle)}
      visible={visible}
      onOk={onSubmitCreateForm}
      onCancel={onCancelModal}
      okText={intl.formatMessage(commonMessage.okLabel)}
      cancelText={intl.formatMessage(commonMessage.cancel)}
    >
      <Form>
        <NameInput />
        <EmailInput />
        <UsernameInput />
        <StatusInput />
        <RoleInput />
      </Form>
    </Modal>
  );
};

CreateUserModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  visible: PropTypes.bool,
};

export default CreateUserModal;
