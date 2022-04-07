/**
 *
 * RegisterForm
 *
 */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  enterRegisterAction,
  setFormValuesAction,
  clearFormAction,
} from 'containers/RegisterPage/actions';
import {
  makeErrorSelector,
  makeInitialValuesSelector,
  makeIsLoadingSelector,
  makeClearFormValueSelector,
} from 'containers/RegisterPage/selectors';
import messages from 'containers/RegisterPage/messages';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Col, Form, Progress, Row, Typography } from 'antd';
import FormCheckboxWrapper from 'components/FormCheckboxWrapper';
import FormInputWrapper from 'components/FormInputWrapper';
import FormButtonWrapper from 'components/FormButtonWrapper';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import usePasswordStrengthCheckHook from 'common/hooks/passwordStrengthHook';
import AlertMessage from 'containers/AlertMessage';
import commonMessage from 'common/messages';
import { rules } from 'common/rules';
import FormWrapper from 'components/FormWrapper';

const { Title } = Typography;

const stateSelector = createStructuredSelector({
  initialValues: makeInitialValuesSelector(),
  errors: makeErrorSelector(),
  clearFormValue: makeIsLoadingSelector(),
  isLoading: makeClearFormValueSelector(),
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

function RegisterForm(props) {
  const { intl } = props;
  const dispatch = useDispatch();
  const { errors, isLoading, initialValues, clearFormValue } =
    useSelector(stateSelector);
  const [form] = Form.useForm();
  const [password, setPassword] = useState('');

  const [lowerCheck, upperCheck, numChecker, charCheck] =
    usePasswordStrengthCheckHook(password);

  const onFinish = async () => {
    await form.validateFields();
    dispatch(setFormValuesAction(form.getFieldsValue()));
    dispatch(enterRegisterAction());
  };

  const checkConfirm = (rule, value) => {
    const newPassword = form.getFieldValue('password');
    if (newPassword !== value) {
      return Promise.reject(
        new Error(intl.formatMessage(commonMessage.confirmPasswordMatchError)),
      );
    }
    return Promise.resolve();
  };

  useEffect(() => {
    if (clearFormValue) {
      form.resetFields();
      dispatch(clearFormAction(false));
    }
  }, [clearFormValue]);

  useEffect(() => {
    if (errors?.length) {
      form.setFields(errors);
    }
  }, [errors]);

  return (
    <FormWrapper
      {...formItemLayout}
      values={initialValues}
      classname="register-page-form"
      formInstance={form}
      onFinish={onFinish}
      name="register-form"
    >
      <Title level={2}>
        <FormattedMessage {...messages.createAccount} />
      </Title>

      <AlertMessage />

      <Row gutter={[16, 25]}>
        <Col xl={12} lg={12} md={12} xs={24}>
          <FormInputWrapper
            label={commonMessage.usernameLabel}
            name="username"
            id="username"
            type="text"
            rules={rules.username}
            placeholder={commonMessage.usernamePlaceHolder}
          />
        </Col>
        <Col xl={12} lg={12} md={12} xs={24}>
          <FormInputWrapper
            label={commonMessage.nameLabel}
            name="name"
            id="name"
            type="text"
            rules={rules.name}
            placeholder={commonMessage.namePlaceHolder}
          />
        </Col>
      </Row>
      <FormInputWrapper
        name="email"
        label={commonMessage.emailLabel}
        id="email"
        type="email"
        rules={rules.email}
        placeholder={commonMessage.emailPlaceHolder}
      />

      <FormInputWrapper
        passwordInput
        label={commonMessage.passwordLabel}
        rules={rules.password}
        name="password"
        id="password"
        placeholder={commonMessage.passwordPlaceHolder}
        changeHandler={(e) => setPassword(e.target.value)}
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
        label={commonMessage.confirmPasswordLabel}
        rules={[
          {
            required: true,
            whitespace: true,
            message: (
              <FormattedMessage {...commonMessage.confirmPasswordRequired} />
            ),
          },
          {
            validator: checkConfirm,
          },
        ]}
        name="confirmPassword"
        id="confirmPassword"
        placeholder={commonMessage.confirmPasswordLabel}
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
      >
        <FormattedMessage
          {...messages.readTerm}
          values={{
            TermsAndConditionsLink: (
              <Link to="/terms-agreement">
                {intl.formatMessage(messages.termsAndConditions)}
              </Link>
            ),
          }}
        />
      </FormCheckboxWrapper>
      <div className="register-btn-wrapper">
        <FormButtonWrapper
          variant="primary"
          disabled={isLoading}
          form={form}
          className="mb-0"
          label={messages.signBtn}
        />
      </div>
      <div className="link-login">
        <FormattedMessage {...messages.alreadyAccount} />{' '}
        <Link to="/login">
          <FormattedMessage {...messages.loginHere} />
        </Link>
      </div>
    </FormWrapper>
  );
}

RegisterForm.propTypes = {
  intl: PropTypes.object,
};

export default injectIntl(RegisterForm);
