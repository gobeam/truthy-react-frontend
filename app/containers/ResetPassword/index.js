/**
 *
 * ResetPassword
 *
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/ResetPassword/saga';
import reducer from 'containers/ResetPassword/reducer';
import { useInjectReducer } from 'utils/injectReducer';
import {
  resetPasswordAction,
  setResetCodeAction,
  setFormValuesAction,
} from 'containers/ResetPassword/actions';
import { createStructuredSelector } from 'reselect';
import {
  makeConfirmPasswordSelector,
  makeErrorsSelector,
  makeIsLoadingSelector,
  makePasswordSelector,
} from 'containers/ResetPassword/selectors';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import messages from 'containers/ResetPassword/messages';
import commonMessages from 'common/messages';
import FormButtonWrapper from 'components/FormButtonWrapper';
import FormInputWrapper from 'components/FormInputWrapper';
import { Form, Progress, Typography } from 'antd';
import { checkIfStrongPassword } from 'common/validator';
import usePasswordStrengthCheckHook from 'common/hooks/passwordStrengthHook';
import AlertMessage from 'containers/AlertMessage';

const key = 'resetPassword';

const { Title } = Typography;

const stateSelector = createStructuredSelector({
  password: makePasswordSelector(),
  isLoading: makeIsLoadingSelector(),
  confirmPassword: makeConfirmPasswordSelector(),
  errors: makeErrorsSelector(),
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

export default function ResetPassword() {
  const dispatch = useDispatch();

  useInjectSaga({ key, saga });

  useInjectReducer({ key, reducer });

  const [form] = Form.useForm();

  const { errors, isLoading } = useSelector(stateSelector);

  const { code } = useParams();

  const [lowerCheck, upperCheck, numChecker, charCheck] =
    usePasswordStrengthCheckHook(form.getFieldValue('password'));

  useEffect(() => {
    dispatch(setResetCodeAction(code));
  }, [code]);
  const onFinish = async () => {
    await form.validateFields();
    dispatch(setFormValuesAction(form.getFieldsValue()));
    dispatch(resetPasswordAction());
  };

  const checkConfirm = (rule, value, callback) => {
    const newPassword = form.getFieldValue('password');
    if (newPassword !== value) {
      callback(
        <FormattedMessage {...commonMessages.confirmPasswordMatchError} />,
      );
    } else {
      callback();
    }
  };

  useEffect(() => {
    if (errors?.length) {
      form.setFields(errors);
    }
  }, [errors]);

  return (
    <div className="content-page">
      <FormattedMessage {...messages.helmetResetPasswordTitle}>
        {(title) => (
          <Helmet>
            <title>{title}</title>
          </Helmet>
        )}
      </FormattedMessage>

      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Title level={2}>
          <FormattedMessage {...messages.resetPassword} />
        </Title>

        <AlertMessage />

        <FormInputWrapper
          passwordInput
          label={commonMessages.passwordPlaceHolder}
          rules={[
            {
              required: true,
              whitespace: true,
              message: (
                <FormattedMessage {...commonMessages.passwordRequired} />
              ),
            },
            {
              validator: checkIfStrongPassword,
            },
          ]}
          name="password"
          id="password"
          type="password"
          placeholder={commonMessages.passwordPlaceHolder}
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
          label={commonMessages.confirmPasswordLabel}
          rules={[
            {
              required: true,
              whitespace: true,
              message: (
                <FormattedMessage {...commonMessages.confirmPasswordRequired} />
              ),
            },
            {
              validator: checkConfirm,
            },
          ]}
          name="confirmPassword"
          id="confirmPassword"
          type="password"
          placeholder={commonMessages.confirmPasswordLabel}
        />

        <FormButtonWrapper
          variant="primary"
          disabled={isLoading}
          form={form}
          label={messages.resetPasswordBtn}
        />
      </Form>
    </div>
  );
}
