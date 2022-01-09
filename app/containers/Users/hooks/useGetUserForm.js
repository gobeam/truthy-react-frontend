import React from 'react';
import { Col, Form, Select } from 'antd';
import FormWrapper from 'components/FormWrapper';
import messages from 'containers/Users/messages';
import commonMessages from 'common/messages';
import { FormattedMessage } from 'react-intl';
import SelectInputWrapper from 'components/SelectInputWrapper';
import FormInputWrapper from 'components/FormInputWrapper';
import { rules } from 'common/rules';

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
  initialValues = {},
  device,
}) => {
  const [formInstance] = Form.useForm();

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

  const NameInput = () => {
    const nameInput = (
      <FormInputWrapper
        label={commonMessages.nameLabel}
        rules={rules.name}
        name="name"
        id="name"
        type="text"
        required
        placeholder={commonMessages.namePlaceHolder}
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
        required
        placeholder={commonMessages.emailPlaceHolder}
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
        required
        placeholder={commonMessages.usernamePlaceHolder}
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
