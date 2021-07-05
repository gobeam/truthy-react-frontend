import React from 'react';
import { Col, Form, Select } from 'antd';
import FormWrapper from 'components/FormWrapper';
import messages from 'containers/UserModule/messages';
import { FormattedMessage, useIntl } from 'react-intl';

const wrapperCol = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 8,
  xl: 8,
  xxl: 6,
};

const useGetUserForm = ({
  required = false,
  responsive = false,
  name = 'form',
  values = {},
  errors,
  onChangeField,
}) => {
  const [formInstance] = Form.useForm();
  const intl = useIntl();

  const WrappedForm = (
    <FormWrapper responsive={responsive} name={name} values={values} />
  );

  WrappedForm.Item = Form.Item;

  const Name = () => {
    const nameInput = (
      <FormWrapper
        label={messages.nameLabel}
        name="name"
        id="name"
        type="text"
        required={false}
        focus={false}
        placeholder={messages.namePlaceHolder}
        changeHandler={onChangeField}
        error={errors.name}
      />
    );

    return responsive ? <Col {...wrapperCol}>{nameInput}</Col> : nameInput;
  };

  const Email = () => {
    const emailInput = (
      <FormWrapper
        label={messages.emailLabel}
        name="email"
        id="email"
        type="text"
        required={false}
        focus={false}
        placeholder={messages.emailPlaceHolder}
        changeHandler={onChangeField}
        error={errors.email}
      />
    );
    return responsive ? <Col {...wrapperCol}>{emailInput}</Col> : emailInput;
  };

  const Username = () => {
    const usernameInput = (
      <FormWrapper
        label={messages.usernameLabel}
        name="username"
        id="username"
        type="text"
        required={false}
        focus={false}
        placeholder={messages.usernamePlaceHolder}
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

  const Status = () => {
    const status = (
      <Form.Item
        name="status"
        label={intl.formatMessage(messages.statusLabel)}
        rules={[
          {
            required,
            message: 'field is required',
          },
        ]}
      >
        <Select>
          <Select.Option key="all" value="">
            <FormattedMessage {...messages.select} />
          </Select.Option>
          <Select.Option key="active" value="active">
            <FormattedMessage {...messages.active} />
          </Select.Option>
          <Select.Option key="inactive" value="inactive">
            <FormattedMessage {...messages.inactive} />
          </Select.Option>
          <Select.Option key="blocked" value="blocked">
            <FormattedMessage {...messages.blocked} />
          </Select.Option>
        </Select>
      </Form.Item>
    );

    return responsive ? <Col {...wrapperCol}>{status}</Col> : status;
  };

  return {
    form: formInstance,
    Form: WrappedForm,
    Name,
    Email,
    Status,
    Username,
  };
};

export default useGetUserForm;
