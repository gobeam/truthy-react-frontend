import React from 'react';
import { Col, Form } from 'antd';
import FormWrapper from 'components/FormWrapper';
import messages from 'containers/Role/messages';
import FormInputWrapper from 'components/FormInputWrapper';
import { FormattedMessage } from 'react-intl';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const wrapperCol = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 8,
  xl: 8,
  xxl: 6,
};

const useGetRoleForm = ({
  responsive = false,
  formName = 'role-form',
  initialValues,
  device,
}) => {
  const [formInstance] = Form.useForm();

  const WrappedForm = ({ ...props }) => (
    <FormWrapper
      {...props}
      values={initialValues}
      formInstance={formInstance}
      layout={layout}
      device={device}
      responsive={responsive}
      name={formName}
      classname="form-ant-items"
    />
  );

  WrappedForm.Item = Form.Item;

  const NameInput = () => {
    const nameInput = (
      <FormInputWrapper
        label={messages.nameLabel}
        rules={[
          {
            required: true,
            message: <FormattedMessage {...messages.nameRequired} />,
          },
        ]}
        name="name"
        id="name"
        type="text"
        required
        placeholder={messages.namePlaceHolder}
      />
    );
    return responsive ? <Col {...wrapperCol}>{nameInput}</Col> : nameInput;
  };

  const DescriptionInput = () => {
    const descriptionInput = (
      <FormInputWrapper
        label={messages.descriptionLabel}
        rules={[
          {
            required: true,
            message: <FormattedMessage {...messages.descriptionRequired} />,
          },
        ]}
        name="description"
        id="description"
        type="text"
        required
        placeholder={messages.descriptionPlaceHolder}
      />
    );
    return responsive ? (
      <Col {...wrapperCol}>{descriptionInput}</Col>
    ) : (
      descriptionInput
    );
  };

  return {
    form: formInstance,
    Form: WrappedForm,
    DescriptionInput,
    NameInput,
  };
};

export default useGetRoleForm;
