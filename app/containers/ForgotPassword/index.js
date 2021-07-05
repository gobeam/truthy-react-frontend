/**
 *
 * ForgotPasswordPage
 *
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/ForgotPassword/saga';
import reducer from 'containers/ForgotPassword/reducer';
import { useInjectReducer } from 'utils/injectReducer';
import {
  changeFieldAction,
  forgotPasswordAction,
} from 'containers/ForgotPassword/actions';
import { createStructuredSelector } from 'reselect';
import {
  makeEmailSelector,
  makeErrorsSelector,
  makeIsLoadingSelector,
} from 'containers/ForgotPassword/selectors';
import { Helmet } from 'react-helmet';
import { hideHeaderAction } from 'containers/App/actions';
import { FormattedMessage } from 'react-intl';
import messages from 'containers/ForgotPassword/messages';
import FormButtonWrapper from 'components/FormButtonWrapper';
import { Form, Typography } from 'antd';
import FormInputWrapper from 'components/FormInputWrapper';
import AlertMessage from 'containers/AlertMessage';

const { Title } = Typography;

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

const key = 'forgotPassword';

const stateSelector = createStructuredSelector({
  email: makeEmailSelector(),
  validationError: makeErrorsSelector(),
  isLoading: makeIsLoadingSelector(),
});

export default function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useInjectSaga({ key, saga });
  useInjectReducer({ key, reducer });
  const hideHeader = () => dispatch(hideHeaderAction(true));
  const onChangeField = (e) =>
    dispatch(changeFieldAction(e.target.name, e.target.value));
  const { email, validationError, isLoading } = useSelector(stateSelector);
  const onFinish = () => dispatch(forgotPasswordAction());
  useEffect(() => {
    hideHeader();
  }, []);

  return (
    <div className="content-page">
      <FormattedMessage {...messages.helmetForgotPwdTitle}>
        {(title) => (
          <Helmet>
            <title>{title}</title>
          </Helmet>
        )}
      </FormattedMessage>
      <Form
        {...formItemLayout}
        form={form}
        name="forgot-password"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Title level={2}>
          <FormattedMessage {...messages.forgotPassword} />
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

        <FormButtonWrapper
          variant="primary"
          disabled={isLoading}
          form={form}
          label={messages.forgotPasswordBtn}
        />
      </Form>
    </div>
  );
}
