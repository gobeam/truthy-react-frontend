/**
 *
 * RegisterForm
 *
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  changeFieldAction,
  enterRegisterAction,
} from 'containers/RegisterPage/actions';
import {
  makeAcceptSelector,
  makeConfirmPasswordSelector,
  makeEmailSelector,
  makeErrorSelector,
  makeIsLoadingSelector,
  makeNameSelector,
  makePasswordSelector,
  makeUsernameSelector,
} from 'containers/RegisterPage/selectors';
import messages from 'containers/RegisterPage/messages';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Form, Progress, Typography } from 'antd';
import FormCheckboxWrapper from 'components/FormCheckboxWrapper';
import FormInputWrapper from 'components/FormInputWrapper';
import FormButtonWrapper from 'components/FormButtonWrapper';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { checkIfStrongPassword } from 'common/validator';
import usePasswordStrengthCheckHook from 'common/hooks/passwordStrengthHook';
import AlertMessage from 'containers/AlertMessage';

const { Title } = Typography;

const stateSelector = createStructuredSelector({
  username: makeUsernameSelector(),
  accept: makeAcceptSelector(),
  email: makeEmailSelector(),
  name: makeNameSelector(),
  password: makePasswordSelector(),
  confirmPassword: makeConfirmPasswordSelector(),
  validationError: makeErrorSelector(),
  isLoading: makeIsLoadingSelector(),
});

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    md: { span: 24 },
    sm: { span: 24 },
  },
  wrapperCol: {
    xs: { span: 24 },
    md: { span: 24 },
    sm: { span: 24 },
  },
};
const selectLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const RegisterForm = (props) => {
  const { intl } = props;
  const dispatch = useDispatch();

  const {
    username,
    accept,
    email,
    password,
    validationError,
    isLoading,
    name,
    confirmPassword,
  } = useSelector(stateSelector);

  const [form] = Form.useForm();

  const [lowerCheck, upperCheck, numChecker, charCheck] =
    usePasswordStrengthCheckHook(password);

  const onChangeField = (e) =>
    dispatch(changeFieldAction(e.target.name, e.target.value));

  const onAgree = (e) => {
    dispatch(changeFieldAction(e.target.name, e.target.checked));
  };

  const onSetCompanyId = (key, value) =>
    dispatch(changeFieldAction(key, value));

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const company = urlParams.get('company');
    onSetCompanyId('company', company);
  }, []);

  const onFinish = () => dispatch(enterRegisterAction());

  const checkConfirm = (rule, value, callback) => {
    const newPassword = form.getFieldValue('password');
    if (newPassword !== value) {
      callback(<FormattedMessage {...messages.confirmPasswordMatchError} />);
    } else {
      callback();
    }
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Title level={2}>
        <FormattedMessage {...messages.createAccount} />
      </Title>

      <AlertMessage />

      <FormInputWrapper
        name="email"
        label={messages.email}
        id="email"
        type="email"
        rules={[
          {
            type: 'email',
            message: <FormattedMessage {...messages.validEmailRequired} />,
          },
          {
            required: true,
            whitespace: true,
            message: <FormattedMessage {...messages.emailRequired} />,
          },
        ]}
        value={email}
        placeholder={messages.emailPlaceHolder}
        changeHandler={onChangeField}
        error={validationError.email}
      />

      <FormInputWrapper
        passwordInput
        label={messages.passwordPlaceHolder}
        rules={[
          {
            required: true,
            whitespace: true,
            message: <FormattedMessage {...messages.passwordRequired} />,
          },
          {
            validator: checkIfStrongPassword,
          },
        ]}
        name="password"
        id="password"
        type="password"
        value={password}
        placeholder={messages.passwordPlaceHolder}
        changeHandler={onChangeField}
        error={validationError.password}
      >
        <Progress
          percent={
            ((lowerCheck + charCheck + upperCheck + numChecker) / 4) * 100
          }
          steps={4}
        />
      </FormInputWrapper>

      <FormInputWrapper
        passwordInput
        label={messages.confirmPassword}
        rules={[
          {
            required: true,
            whitespace: true,
            message: <FormattedMessage {...messages.passwordRequired} />,
          },
          {
            validator: checkConfirm,
          },
        ]}
        name="confirmPassword"
        id="confirmPassword"
        type="confirmPassword"
        value={confirmPassword}
        placeholder={messages.passwordPlaceHolder}
        changeHandler={onChangeField}
        error={validationError.confirmPassword}
      />

      <FormInputWrapper
        label={messages.username}
        name="username"
        id="username"
        type="text"
        rules={[
          {
            required: true,
            whitespace: true,
            message: <FormattedMessage {...messages.usernameRequired} />,
          },
        ]}
        value={username}
        placeholder={messages.username}
        changeHandler={onChangeField}
        error={validationError.username}
      />

      <FormInputWrapper
        label={messages.name}
        name="name"
        id="name"
        type="text"
        rules={[
          {
            required: true,
            whitespace: true,
            message: <FormattedMessage {...messages.nameRequired} />,
          },
        ]}
        value={name}
        placeholder={messages.name}
        changeHandler={onChangeField}
        error={validationError.name}
      />

      <FormCheckboxWrapper
        layout={selectLayout}
        rules={[
          {
            validator: (_, val, callback) =>
              val
                ? callback()
                : callback(<FormattedMessage {...messages.acceptTerm} />),
          },
        ]}
        name="accept"
        id="accept"
        value={accept}
        changeHandler={onAgree}
      >
        <FormattedMessage
          {...messages.readTerm}
          values={{
            TermsAndConditionsLink: (
              <Link to="/terms-aggrement">
                {intl.formatMessage(messages.termsAndConditions)}
              </Link>
            ),
          }}
        />
      </FormCheckboxWrapper>

      <FormButtonWrapper
        variant="primary"
        disabled={isLoading}
        form={form}
        label={messages.signBtn}
      />
    </Form>
  );
};

RegisterForm.propTypes = {
  intl: PropTypes.object,
};

export default injectIntl(RegisterForm);
