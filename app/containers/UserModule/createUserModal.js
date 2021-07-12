import React, { useEffect } from 'react';
import { Modal } from 'antd';
import useGetUserForm from 'containers/UserModule/hooks/useGetUserForm';
import { useIntl } from 'react-intl';
import messages from 'containers/UserModule/messages';
import PropTypes from 'prop-types';
import {
  clearFormAction,
  setFormValues,
  submitFormAction,
} from 'containers/UserModule/actions';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeClearFormFieldSelector,
  makeErrorSelector,
  makeRolesListSelector,
} from 'containers/UserModule/selectors';
import { makeDeviceSelector } from 'containers/App/selectors';

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
