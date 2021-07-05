import React from 'react';
import PropTypes from 'prop-types';
import { Form, Row } from 'antd';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const FormWrapper = ({
  children,
  device,
  name,
  values = {},
  responsive = false,
  ...props
}) => {
  const [formInstance] = Form.useForm();

  return (
    <Form
      {...props}
      {...(device === 'MOBILE' ? { layout: 'vertical' } : layout)}
      form={formInstance}
      name={name}
      initialValues={values}
    >
      {responsive ? <Row>{children}</Row> : children}
    </Form>
  );
};

FormWrapper.propTypes = {
  children: PropTypes.node,
  device: PropTypes.string,
  name: PropTypes.string.isRequired,
  values: PropTypes.object,
  responsive: PropTypes.bool,
};

export default FormWrapper;
