/**
 *
 * LoginForm
 *
 */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  changePasswordAction,
  changeUsernameAction,
  enterLoginAction,
} from 'containers/LoginPage/actions';
import {
  makeErrorSelector,
  makeIsLoadingSelector,
  makePasswordSelector,
  makeUsernameSelector,
} from 'containers/LoginPage/selectors';
import { Checkbox, Form, Typography } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import messages from 'components/LoginForm/messages';
import { FormattedMessage } from 'react-intl';
import FormInputWrapper from 'components/FormInputWrapper';
import FormButtonWrapper from 'components/FormButtonWrapper';
import { Link } from 'react-router-dom';
import AlertMessage from 'containers/AlertMessage';

const { Title } = Typography;
const stateSelector = createStructuredSelector({
  username: makeUsernameSelector(),
  password: makePasswordSelector(),
  validationError: makeErrorSelector(),
  isLoading: makeIsLoadingSelector(),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const onChangePassword = (e) =>
    dispatch(changePasswordAction(e.target.value));
  const onChangeUsername = (e) =>
    dispatch(changeUsernameAction(e.target.value));

  const { username, password, isLoading, validationError } =
    useSelector(stateSelector);
  const [form] = Form.useForm();

  const onFinish = () => {
    dispatch(enterLoginAction());
  };

  return (
    <Form
      className="login-page-form"
      form={form}
      name="login"
      onFinish={onFinish}
    >
      <Title level={2}>
        <FormattedMessage {...messages.inputLogin} />
      </Title>

      <AlertMessage />

      <FormInputWrapper
        // label={messages.email}
        name="username"
        id="username"
        type="text"
        rules={[
          {
            required: true,
            whitespace: true,
            message: <FormattedMessage {...messages.emailRequired} />,
          },
        ]}
        value={username}
        icon={<UserOutlined className="site-form-item-icon" />}
        placeholder={messages.emailPlaceHolder}
        changeHandler={onChangeUsername}
        error={validationError.email}
      />

      <FormInputWrapper
        passwordInput
        // label={messages.password}
        rules={[
          {
            required: true,
            whitespace: true,
            message: <FormattedMessage {...messages.passwordRequired} />,
          },
        ]}
        name="password"
        id="password"
        type="password"
        value={password}
        icon={<LockOutlined className="site-form-item-icon" />}
        placeholder={messages.passwordPlaceHolder}
        changeHandler={onChangePassword}
        error={validationError.password}
      />

      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Link className="login-form-forgot" to="/forgot-password">
          <FormattedMessage {...messages.lostPassword} />
        </Link>
      </Form.Item>

      <FormButtonWrapper
        variant="primary"
        disabled={isLoading}
        form={form}
        label={messages.submit}
      />
      <Link className="login-form-forgot" to="/register">
        <FormattedMessage {...messages.register} />
      </Link>
    </Form>
  );
};
export default LoginForm;
