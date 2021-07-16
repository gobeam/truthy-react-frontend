import React from 'react';
import { Col, Form } from 'antd';
import FormWrapper from 'components/FormWrapper';
import messages from 'containers/RoleModule/messages';
import FormInputWrapper from 'components/FormInputWrapper';
import { rules } from 'common/rules';

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
    />
  );

  WrappedForm.Item = Form.Item;

  const NameInput = () => {
    const nameInput = (
      <FormInputWrapper
        label={messages.nameLabel}
        rules={rules.name}
        name="name"
        id="name"
        type="text"
        required={false}
        placeholder={messages.namePlaceHolder}
      />
    );
    return responsive ? <Col {...wrapperCol}>{nameInput}</Col> : nameInput;
  };

  const DescriptionInput = () => {
    const descriptionInput = (
      <FormInputWrapper
        label={messages.descriptionLabel}
        rules={rules.name}
        name="description"
        id="description"
        type="text"
        required={false}
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
