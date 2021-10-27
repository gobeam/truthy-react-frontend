/**
 *
 * Security Tab
 *
 */

import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Form, List, Modal, Progress, Switch } from 'antd';
import usePasswordStrengthCheckHook from 'common/hooks/passwordStrengthHook';
import commonMessages from 'common/messages';
import { checkIfStrongPassword } from 'common/validator';
import FormInputWrapper from 'components/FormInputWrapper';
import { makeLoggedInUserSelector } from 'containers/App/selectors';
import {
  clearFormAction,
  setFormValues,
  submitChangePasswordFormAction,
  updateTwoFaStatusAction,
} from 'containers/UserAccount/actions';
import messages from 'containers/UserAccount/messages';
import {
  makeErrorSelector,
  makeInitiateCleanFieldSelector,
  makeIsLoadingSelector,
} from 'containers/UserAccount/selectors';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const stateSelector = createStructuredSelector({
  loading: makeIsLoadingSelector(),
  errors: makeErrorSelector(),
  user: makeLoggedInUserSelector(),
  initiateClean: makeInitiateCleanFieldSelector(),
});

export default function SecurityTab() {
  const dispatch = useDispatch();
  const intl = useIntl();
  const [form] = Form.useForm();
  const { loading, errors, initiateClean, user } = useSelector(stateSelector);
  const [password, setPassword] = useState('');
  const [twoFaStatus, setTwoFaStatus] = useState(false);
  const [resetModalVisibility, setResetModalVisibility] = useState(false);
  const handleOk = async () => {
    await form.validateFields();
    dispatch(setFormValues(form.getFieldsValue()));
    dispatch(submitChangePasswordFormAction());
  };
  const handleCancel = () => {
    setResetModalVisibility(false);
    form.resetFields();
    setPassword('');
  };
  const [lowerCheck, upperCheck, numChecker, charCheck] =
    usePasswordStrengthCheckHook(password);

  const checkConfirm = (rule, value) => {
    const newPassword = form.getFieldValue('password');
    if (newPassword !== value) {
      return Promise.reject(
        new Error(intl.formatMessage(commonMessages.confirmPasswordMatchError)),
      );
    }
    return Promise.resolve();
  };

  const updateTwoFaStatus = (isTwoFAEnabled) => {
    dispatch(setFormValues({ isTwoFAEnabled }));
    dispatch(updateTwoFaStatusAction());
  };

  const onToggleOtpField = (val) => {
    Modal.confirm({
      okText: intl.formatMessage(commonMessages.yesLabel),
      okType: 'danger',
      cancelText: intl.formatMessage(commonMessages.noLabel),
      icon: <ExclamationCircleOutlined />,
      title: intl.formatMessage(
        val ? messages.activateOtpConfirm : messages.deactivateOtpConfirm,
      ),
      onCancel: (close) => close() && setTwoFaStatus(!val),
      onOk: (close) => {
        updateTwoFaStatus(val);
        close();
      },
    });
  };

  useEffect(() => {
    if (errors?.length) {
      form.setFields(errors);
    }
  }, [errors]);

  useEffect(() => {
    if (initiateClean) {
      dispatch(clearFormAction());
      if (form) {
        form.resetFields();
      }
      setResetModalVisibility(false);
    }
  }, [initiateClean]);

  useEffect(() => {
    if (user) {
      setTwoFaStatus(user.isTwoFAEnabled);
    }
  }, [user]);

  const getListItem = () => [
    {
      title: <FormattedMessage {...messages.accountPassword} />,
      description: (
        <>
          <FormattedMessage {...messages.accountPasswordDescription} />
        </>
      ),
      actions: [
        <Button type="link" onClick={() => setResetModalVisibility(true)}>
          <FormattedMessage {...messages.changeLabel} />
        </Button>,
      ],
    },
    {
      title: <FormattedMessage {...messages.otpLabel} />,
      description: <FormattedMessage {...messages.otpDescription} />,
      actions: [
        <Switch
          checkedChildren={intl.formatMessage(messages.onLabel)}
          unCheckedChildren={intl.formatMessage(messages.offLabel)}
          checked={twoFaStatus}
          onChange={onToggleOtpField}
        />,
      ],
    },
  ];

  const data = getListItem();

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item actions={item.actions}>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
      <Modal
        title="Change Password"
        visible={resetModalVisibility}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <Form
          layout="vertical"
          form={form}
          name="user-account"
          className="change-password-form"
        >
          <FormInputWrapper
            passwordInput
            label={messages.oldPasswordLabel}
            rules={[
              {
                required: true,
                whitespace: true,
                message: <FormattedMessage {...messages.oldPasswordRequired} />,
              },
            ]}
            name="oldPassword"
            id="oldPassword"
            type="password"
            placeholder={messages.oldPasswordLabel}
          />
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
            label={commonMessages.confirmPasswordLabel}
            rules={[
              {
                required: true,
                whitespace: true,
                message: (
                  <FormattedMessage
                    {...commonMessages.confirmPasswordRequired}
                  />
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
        </Form>
      </Modal>
    </>
  );
}
