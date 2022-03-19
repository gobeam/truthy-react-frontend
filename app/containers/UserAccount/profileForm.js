/**
 *
 * profileForm
 *
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Button, Col, Form, message, Row, Typography, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {
  makeIsLoadingSelector,
  makeLoggedInUserSelector,
} from 'containers/App/selectors';
import FormInputWrapper from 'components/FormInputWrapper';
import commonMessage from 'common/messages';
import messages from 'containers/UserAccount/messages';
import { rules } from 'common/rules';
import FormButtonWrapper from 'components/FormButtonWrapper';
import { BASE_URL } from 'utils/api';
import { FormattedMessage } from 'react-intl';
import {
  setFormValues,
  submitFormAction,
} from 'containers/UserAccount/actions';
import { makeErrorSelector } from 'containers/UserAccount/selectors';

const { Title } = Typography;

const stateSelector = createStructuredSelector({
  user: makeLoggedInUserSelector(),
  loading: makeIsLoadingSelector(),
  errors: makeErrorSelector(),
});

export default function ProfileForm() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { user, loading, errors } = useSelector(stateSelector);
  const onFinish = async () => {
    await form.validateFields();
    dispatch(setFormValues(form.getFieldsValue()));
    dispatch(submitFormAction());
  };

  const uploadProps = {
    name: 'avatar',
    accept: '.png,.jpg,.jpeg',
    beforeUpload: (file) => {
      const validExtension = ['image/png', 'image/jpg', 'image/jpeg'];
      const checkExtension = validExtension.includes(file.type);
      const validSize = file.size / 1024 / 1024 <= 2;
      if (!checkExtension) {
        message.error(`${file.name} is not a valid file type!`);
      }
      if (!validSize) {
        message.error('Avatar cannot be greater than 2mb');
      }
      return checkExtension && validSize ? true : Upload.LIST_IGNORE;
    },
    customRequest: (options) => {
      dispatch(
        setFormValues({
          avatar: options.file,
        }),
      );
      dispatch(submitFormAction());
    },
  };

  useEffect(() => {
    if (errors?.length) {
      form.setFields(errors);
    }
  }, [errors]);

  useEffect(() => form.resetFields(), [user]);

  return (
    <Row>
      <Col span={12}>
        <Title level={3}>
          <FormattedMessage {...messages.editProfile} />
        </Title>
        <Form
          layout="vertical"
          initialValues={user}
          form={form}
          onFinish={onFinish}
          name="user-account"
          className="user-acccount"
        >
          <FormInputWrapper
            name="email"
            label={commonMessage.emailLabel}
            id="email"
            type="email"
            rules={rules.email}
            placeholder={commonMessage.emailPlaceHolder}
            allowClear
          />

          <FormInputWrapper
            label={commonMessage.usernameLabel}
            name="username"
            id="username"
            type="text"
            rules={rules.username}
            placeholder={commonMessage.usernamePlaceHolder}
            allowClear
          />

          <FormInputWrapper
            label={commonMessage.nameLabel}
            name="name"
            id="name"
            type="text"
            rules={rules.name}
            placeholder={commonMessage.namePlaceHolder}
            allowClear
          />
          <FormInputWrapper
            label={messages.contact}
            name="contact"
            id="contact"
            type="text"
            placeholder={messages.contactPlaceholder}
            allowClear
          />
          <FormInputWrapper
            label={messages.address}
            name="address"
            id="address"
            type="text"
            placeholder={messages.addressPlaceholder}
            allowClear
          />

          <FormButtonWrapper
            variant="primary"
            disabled={loading}
            form={form}
            label={commonMessage.submit}
          />
        </Form>
      </Col>
      <Col span={10} offset={2}>
        <Title level={3}>
          <FormattedMessage {...messages.avatarLabel} />
        </Title>
        <div className="user-image">
          {user.avatar ? (
            <img src={`${BASE_URL}/images/profile/${user.avatar}`} alt="avatar" />
          ) : null}
        </div>
        <Upload showUploadList={false} {...uploadProps}>
          <div>
            <Button>
              <UploadOutlined />
              Upload
            </Button>
          </div>
        </Upload>
      </Col>
    </Row>
  );
}
