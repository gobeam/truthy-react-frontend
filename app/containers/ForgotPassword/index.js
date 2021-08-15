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
  forgotPasswordAction,
  setFormValuesAction,
} from 'containers/ForgotPassword/actions';
import { createStructuredSelector } from 'reselect';
import {
  makeErrorsSelector,
  makeInitialValuesSelector,
  makeIsLoadingSelector,
} from 'containers/ForgotPassword/selectors';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import messages from 'containers/ForgotPassword/messages';
import FormButtonWrapper from 'components/FormButtonWrapper';
import { Form, Typography, Row, Col } from 'antd';
import FormInputWrapper from 'components/FormInputWrapper';
import AlertMessage from 'containers/AlertMessage';
import commonMessage from 'common/messages';
import FormWrapper from 'components/FormWrapper';

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
  errors: makeErrorsSelector(),
  isLoading: makeIsLoadingSelector(),
  initialValues: makeInitialValuesSelector(),
});

export default function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useInjectSaga({ key, saga });
  useInjectReducer({ key, reducer });
  const { errors, isLoading, initialValues } = useSelector(stateSelector);
  const onFinish = async () => {
    await form.validateFields();
    dispatch(setFormValuesAction(form.getFieldsValue()));
    dispatch(forgotPasswordAction());
  };
  useEffect(() => {
    if (errors?.length) {
      form.setFields(errors);
    }
  }, [errors]);

  return (
    <div className="login-page mh-100">
      <FormattedMessage {...messages.helmetForgotPwdTitle}>
        {(title) => (
          <Helmet>
            <title>{title}</title>
          </Helmet>
        )}
      </FormattedMessage>
      <Row className="login-center">
        <Col xl={8} className="m-auto">
          <FormWrapper
            {...formItemLayout}
            values={initialValues}
            formInstance={form}
            onFinish={onFinish}
            classname="login-page-form form-ant-items"
            name="forgot-password-form"
          >
            <Title level={3}>
              <FormattedMessage {...messages.forgotPassword} />
            </Title>

            <AlertMessage />

            <FormInputWrapper
              name="email"
              label={commonMessage.emailLabel}
              id="email"
              type="email"
              rules={[
                {
                  type: 'email',
                  message: (
                    <FormattedMessage {...commonMessage.validEmailRequired} />
                  ),
                },
                {
                  required: true,
                  whitespace: true,
                  message: (
                    <FormattedMessage {...commonMessage.emailRequired} />
                  ),
                },
              ]}
              placeholder={commonMessage.emailPlaceHolder}
            />

            <FormButtonWrapper
              variant="primary"
              disabled={isLoading}
              form={form}
              label={messages.forgotPasswordBtn}
            />
          </FormWrapper>
        </Col>
      </Row>
    </div>
  );
}
