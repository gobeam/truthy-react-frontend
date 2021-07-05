/**
 *
 * ResetPasswordPage
 *
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/ResetPasswordPage/saga';
import reducer from 'containers/ResetPasswordPage/reducer';
import { useInjectReducer } from 'utils/injectReducer';
import {
  changeFieldAction,
  resetPasswordAction,
} from 'containers/ResetPasswordPage/actions';
import { createStructuredSelector } from 'reselect';
import {
  makeConfirmPasswordSelector,
  makeErrorsSelector,
  makeIsLoadingSelector,
  makePasswordSelector,
} from 'containers/ResetPasswordPage/selectors';
import { Helmet } from 'react-helmet';
import { hideHeaderAction } from 'containers/App/actions';
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import messages from 'containers/ResetPasswordPage/messages';
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
  validationError: makeErrorsSelector(),
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

export default function ResetPasswordPage() {
  const dispatch = useDispatch();

  useInjectSaga({ key, saga });

  useInjectReducer({ key, reducer });

  const hideHeader = () => dispatch(hideHeaderAction(true));

  const [form] = Form.useForm();

  const onChangeField = (e) =>
    dispatch(changeFieldAction(e.target.name, e.target.value));

  const { password, confirmPassword, validationError, isLoading } =
    useSelector(stateSelector);

  const { code } = useParams();

  const [lowerCheck, upperCheck, numChecker, charCheck] =
    usePasswordStrengthCheckHook(password);

  useEffect(() => {
    hideHeader();
  }, []);

  useEffect(() => {
    dispatch(changeFieldAction('code', code));
  }, [code]);

  const onFinish = () => dispatch(resetPasswordAction());

  const checkConfirm = (rule, value, callback) => {
    const newPassword = form.getFieldValue('password');
    if (newPassword !== value) {
      callback(<FormattedMessage {...messages.confirmPasswordMatchError} />);
    } else {
      callback();
    }
  };

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
