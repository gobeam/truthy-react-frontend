// import React, { useEffect } from 'react';
// import { Modal } from 'antd';
// import useGetUserForm from 'containers/UserModule/hooks/useGetUserForm';
// import { useIntl } from 'react-intl';
// import messages from 'containers/UserModule/messages';
// import PropTypes from 'prop-types';
// import {
//   changeFieldAction,
//   clearFormAction,
//   getUserByIdAction,
//   submitFormAction,
// } from 'containers/UserModule/actions';
// import { useDispatch, useSelector } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
// import {
//   makeClearFormFieldSelector,
//   makeEmailSelector,
//   makeErrorSelector,
//   makeIdSelector,
//   makeNameSelector,
//   makeRoleIdSelector,
//   makeRolesListSelector,
//   makeStatusSelector,
//   makeUserNameSelector,
// } from 'containers/UserModule/selectors';
// import { makeDeviceSelector } from 'containers/App/selectors';
//
// const stateSelector = createStructuredSelector({
//   id: makeIdSelector(),
//   roles: makeRolesListSelector(),
//   errors: makeErrorSelector(),
//   device: makeDeviceSelector(),
//   clearFormField: makeClearFormFieldSelector(),
//   name: makeNameSelector(),
//   username: makeUserNameSelector(),
//   email: makeEmailSelector(),
//   roleId: makeRoleIdSelector(),
//   status: makeStatusSelector(),
// });
//
// const EditUserModal = ({ onCancel, visible }) => {
//   const intl = useIntl();
//   const dispatch = useDispatch();
//   const { roles, errors, device, clearFormField } = useSelector(stateSelector);
//
//   // const {
//   //   roles,
//   //   errors,
//   //   device,
//   //   clearFormField,
//   //   id,
//   //   name,
//   //   username,
//   //   email,
//   //   roleId,
//   //   status,
//   // } = useSelector(stateSelector);
//
//   const { Form, form, Name, Email, Status, Username, Role } = useGetUserForm({
//     formName: 'edit-user',
//     roles,
//     errors,
//     device,
//     // initialValues: {
//     //   name,
//     //   username,
//     //   email,
//     //   roleId,
//     //   status,
//     // },
//   });
//
//   const onSubmit = async () => {
//     await form.validateFields();
//     dispatch(submitFormAction());
//   };
//
//   const onCancelModal = () => {
//     onCancel();
//     form.resetFields();
//     // dispatch(changeFieldAction('initialValues', {}));
//   };
//
//   useEffect(() => {
//     if (clearFormField) {
//       dispatch(clearFormAction());
//       if (form) {
//         form.resetFields();
//       }
//       onCancel();
//     }
//   }, [clearFormField]);
//
//   // useEffect(() => {
//   //   if (id) {
//   //     dispatch(getUserByIdAction(id));
//   //   }
//   // }, [id]);
//
//   return (
//     <Modal
//       title={intl.formatMessage(messages.editTitle)}
//       visible={visible}
//       onOk={onSubmit}
//       onCancel={onCancelModal}
//       maskClosable={false}
//     >
//       <Form>
//         <Name />
//         <Email />
//         <Username />
//         <Status />
//         <Role />
//       </Form>
//     </Modal>
//   );
// };
//
// EditUserModal.propTypes = {
//   onCancel: PropTypes.func.isRequired,
//   visible: PropTypes.bool,
// };
//
// export default EditUserModal;

import React, { useEffect } from 'react';
import { Modal } from 'antd';
import useGetUserForm from 'containers/UserModule/hooks/useGetUserForm';
import { useIntl } from 'react-intl';
import messages from 'containers/UserModule/messages';
import PropTypes from 'prop-types';
import {
  clearFormAction,
  submitFormAction,
} from 'containers/UserModule/actions';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeClearFormFieldSelector,
  makeEmailSelector,
  makeErrorSelector,
  makeNameSelector,
  makeRoleIdSelector,
  makeRolesListSelector,
  makeStatusSelector,
  makeUserNameSelector,
} from 'containers/UserModule/selectors';
import { makeDeviceSelector } from 'containers/App/selectors';

const stateSelector = createStructuredSelector({
  roles: makeRolesListSelector(),
  errors: makeErrorSelector(),
  device: makeDeviceSelector(),
  clearFormField: makeClearFormFieldSelector(),
  name: makeNameSelector(),
  username: makeUserNameSelector(),
  email: makeEmailSelector(),
  roleId: makeRoleIdSelector(),
  status: makeStatusSelector(),
});

const EditUserModal = ({ onCancel, visible }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const {
    roles,
    errors,
    device,
    clearFormField,
    name,
    username,
    email,
    roleId,
    status,
  } = useSelector(stateSelector);

  const initialValues = {
    name,
    username,
    email,
    roleId,
    status,
  };

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
    errors,
    device,
    initialValues,
  });

  const onSubmit = async () => {
    await form.validateFields();
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

  return (
    <Modal
      title={intl.formatMessage(messages.editTitle)}
      visible={visible}
      onOk={onSubmit}
      onCancel={onCancelModal}
      maskClosable={false}
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

EditUserModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  visible: PropTypes.bool,
};

export default EditUserModal;
