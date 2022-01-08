/**
 *
 * LoginForm
 *
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  enterLoginAction,
  setFormValuesAction,
} from 'containers/LoginPage/actions';
import {
  makeErrorSelector,
  makeInitialValuesSelector,
  makeIsLoadingSelector,
} from 'containers/LoginPage/selectors';
import { Checkbox, Form, Typography } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import messages from 'containers/LoginPage/messages';
import commonMessage from 'common/messages';
import { FormattedMessage } from 'react-intl';
import FormInputWrapper from 'components/FormInputWrapper';
import FormButtonWrapper from 'components/FormButtonWrapper';
import { Link } from 'react-router-dom';
import AlertMessage from 'containers/AlertMessage';
import FormWrapper from 'components/FormWrapper';

const { Title } = Typography;
const stateSelector = createStructuredSelector({
  initialValues: makeInitialValuesSelector(),
  isLoading: makeIsLoadingSelector(),
  errors: makeErrorSelector(),
});

const LoginForm = () => {
  const dispatch = useDispatch();

  const { initialValues, isLoading, errors } = useSelector(stateSelector);
  const [form] = Form.useForm();

  const onFinish = async () => {
    await form.validateFields();
    dispatch(setFormValuesAction(form.getFieldsValue()));
    dispatch(enterLoginAction());
  };

  useEffect(() => {
    if (errors?.length) {
      form.setFields(errors);
    }
  }, [errors]);

  return (
    <FormWrapper
      classname="login-page-form"
      values={initialValues}
      formInstance={form}
      onFinish={onFinish}
      name="login-form"
    >
      <Title level={3}>
        <FormattedMessage {...messages.inputLogin} />
      </Title>

      <AlertMessage />

      <FormInputWrapper
        name="username"
        id="username"
        type="text"
        rules={[
          {
            required: true,
            whitespace: true,
            message: <FormattedMessage {...commonMessage.emailRequired} />,
          },
        ]}
        icon={<UserOutlined className="site-form-item-icon" />}
        placeholder={commonMessage.emailPlaceHolder}
      />

      <FormInputWrapper
        passwordInput
        rules={[
          {
            required: true,
            whitespace: true,
            message: <FormattedMessage {...commonMessage.passwordRequired} />,
          },
        ]}
        name="password"
        id="password"
        type="password"
        icon={<LockOutlined className="site-form-item-icon" />}
        placeholder={commonMessage.passwordPlaceHolder}
      />

      <Form.Item>
        <div className="d-flex">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>
              <FormattedMessage {...messages.rememberMe} />
            </Checkbox>
          </Form.Item>
          <div className="ml-auto">
            <Link className="login-form-forgot" to="/forgot-password">
              <FormattedMessage {...messages.lostPassword} />
            </Link>
          </div>
        </div>
      </Form.Item>

      <FormButtonWrapper
        variant="primary"
        disabled={isLoading}
        form={form}
        label={messages.submit}
      />
      <Link className="link" to="/register">
        <FormattedMessage {...messages.register} />
      </Link>
    </FormWrapper>
  );
};
export default LoginForm;
