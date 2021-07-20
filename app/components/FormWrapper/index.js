import React from 'react';
import PropTypes from 'prop-types';
import { Form, Row } from 'antd';

const FormWrapper = ({
  layout,
  formInstance,
  children,
  device,
  name,
  classname,
  values,
  responsive = false,
  ...props
}) => (
  <Form
    {...props}
    {...(device === 'MOBILE' ? { layout: 'vertical' } : layout)}
    scrollToFirstError
    className={classname}
    form={formInstance}
    name={name}
    initialValues={values}
  >
    {responsive ? <Row>{children}</Row> : children}
  </Form>
);

FormWrapper.propTypes = {
  formInstance: PropTypes.object,
  children: PropTypes.node,
  device: PropTypes.string,
  classname: PropTypes.string,
  name: PropTypes.string.isRequired,
  values: PropTypes.object,
  layout: PropTypes.object,
  responsive: PropTypes.bool,
};

export default FormWrapper;
