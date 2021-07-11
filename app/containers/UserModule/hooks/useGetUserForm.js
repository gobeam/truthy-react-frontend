import React from 'react';
import { Col, Form, Select } from 'antd';
import FormWrapper from 'components/FormWrapper';
import messages from 'containers/UserModule/messages';
import commonMessages from 'common/messages';
import { FormattedMessage } from 'react-intl';
import SelectInputWrapper from 'components/SelectInputWrapper';
import FormInputWrapper from 'components/FormInputWrapper';
import { rules } from 'common/rules';
import { useDispatch } from 'react-redux';
import { changeFieldAction } from 'containers/UserModule/actions';

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

const useGetUserForm = ({
  responsive = false,
  formName = 'form',
  roles = [],
  errors = {},
  initialValues = { name: '', username: '', email: '', roleId: '', status: '' },
  device,
}) => {
  const [formInstance] = Form.useForm();
  const dispatch = useDispatch();

  const onChangeField = (e) =>
    dispatch(changeFieldAction(e.target.name, e.target.value));

  const onChangeStatus = (value) =>
    dispatch(changeFieldAction('status', value));

  const onChangeRole = (value) => dispatch(changeFieldAction('roleId', value));

  const WrappedForm = ({ ...props }) => (
    <FormWrapper
      {...props}
      // values={initialValues}
      formInstance={formInstance}
      layout={layout}
      device={device}
      responsive={responsive}
      name={formName}
    />
  );

  WrappedForm.Item = Form.Item;

  const NameInput = () => {
    const nameInput = (
      <FormInputWrapper
        label={commonMessages.nameLabel}
        value={initialValues.name}
        rules={rules.name}
        name="name"
        id="name"
        type="text"
        required={false}
        placeholder={commonMessages.namePlaceHolder}
        changeHandler={onChangeField}
        error={errors.name}
      />
    );

    return responsive ? <Col {...wrapperCol}>{nameInput}</Col> : nameInput;
  };

  const EmailInput = () => {
    const emailInput = (
      <FormInputWrapper
        label={commonMessages.emailLabel}
        rules={rules.email}
        name="email"
        id="email"
        type="text"
        required={false}
        placeholder={commonMessages.emailPlaceHolder}
        changeHandler={onChangeField}
        error={errors.email}
      />
    );
    return responsive ? <Col {...wrapperCol}>{emailInput}</Col> : emailInput;
  };

  const UsernameInput = () => {
    const usernameInput = (
      <FormInputWrapper
        label={commonMessages.usernameLabel}
        rules={rules.username}
        name="username"
        id="username"
        type="text"
        required={false}
        placeholder={commonMessages.usernamePlaceHolder}
        changeHandler={onChangeField}
        error={errors.username}
      />
    );
    return responsive ? (
      <Col {...wrapperCol}>{usernameInput}</Col>
    ) : (
      usernameInput
    );
  };

  const StatusInput = () => {
    const statusArray = [
      { label: messages.active, value: 'active' },
      { label: messages.inactive, value: 'inactive' },
      { label: messages.blocked, value: 'blocked' },
    ];
    const statusOptionList = statusArray.map((field) => (
      <Select.Option key={field.value} value={field.value}>
        <FormattedMessage {...field.label} />
      </Select.Option>
    ));
    const statusInput = (
      <SelectInputWrapper
        name="status"
        id="status"
        rules={[
          {
            required: true,
            message: <FormattedMessage {...messages.statusRequired} />,
          },
        ]}
        label={messages.statusLabel}
        required
        changeHandler={onChangeStatus}
        error={errors.status}
      >
        {statusOptionList}
      </SelectInputWrapper>
    );

    return responsive ? <Col {...wrapperCol}>{statusInput}</Col> : statusInput;
  };

  const RoleInput = () => {
    const roleOptionList = roles.map((role) => (
      <Select.Option key={role.id} value={role.id}>
        {role.name}
      </Select.Option>
    ));
    const roleInput = (
      <SelectInputWrapper
        name="roleId"
        id="roleId"
        rules={[
          {
            required: true,
            message: <FormattedMessage {...messages.roleRequired} />,
          },
        ]}
        label={messages.roleLabel}
        required
        changeHandler={onChangeRole}
        error={errors.roleId}
      >
        {roleOptionList}
      </SelectInputWrapper>
    );

    return responsive ? <Col {...wrapperCol}>{roleInput}</Col> : roleInput;
  };

  return {
    form: formInstance,
    Form: WrappedForm,
    NameInput,
    EmailInput,
    StatusInput,
    UsernameInput,
    RoleInput,
  };
};

export default useGetUserForm;
