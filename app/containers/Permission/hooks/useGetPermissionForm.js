import React from 'react';
import { Col, Form, Select } from 'antd';
import FormWrapper from 'components/FormWrapper';
import messages from 'containers/Permission/messages';
import FormInputWrapper from 'components/FormInputWrapper';
import { FormattedMessage } from 'react-intl';
import SelectInputWrapper from 'components/SelectInputWrapper';
import { DELETE, GET, POST, PUT } from 'utils/constants';

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

const useGetPermissionForm = ({
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

  const ResourceInput = () => {
    const resourceInput = (
      <FormInputWrapper
        label={messages.resourceLabel}
        rules={[
          {
            required: true,
            message: <FormattedMessage {...messages.resourceRequired} />,
          },
        ]}
        name="resource"
        id="resource"
        type="text"
        required
        placeholder={messages.resourcePlaceHolder}
      />
    );
    return responsive ? (
      <Col {...wrapperCol}>{resourceInput}</Col>
    ) : (
      resourceInput
    );
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

  const MethodInput = () => {
    const methodArray = [
      { label: GET, value: GET },
      { label: POST, value: POST },
      { label: PUT, value: PUT },
      { label: DELETE, value: DELETE },
    ];
    const methodOptionList = methodArray.map((field) => (
      <Select.Option key={field.value} value={field.value}>
        {field.label}
      </Select.Option>
    ));
    const methodInput = (
      <SelectInputWrapper
        name="method"
        id="method"
        rules={[
          {
            required: true,
            message: <FormattedMessage {...messages.methodRequired} />,
          },
        ]}
        label={messages.methodLabel}
        required
      >
        {methodOptionList}
      </SelectInputWrapper>
    );

    return responsive ? <Col {...wrapperCol}>{methodInput}</Col> : methodInput;
  };

  const PathInput = () => {
    const pathInput = (
      <FormInputWrapper
        label={messages.pathLabel}
        rules={[
          {
            required: true,
            message: <FormattedMessage {...messages.pathRequired} />,
          },
        ]}
        name="path"
        id="path"
        type="text"
        required
        placeholder={messages.pathPlaceHolder}
      />
    );
    return responsive ? <Col {...wrapperCol}>{pathInput}</Col> : pathInput;
  };

  return {
    form: formInstance,
    Form: WrappedForm,
    ResourceInput,
    DescriptionInput,
    MethodInput,
    PathInput,
  };
};

export default useGetPermissionForm;
