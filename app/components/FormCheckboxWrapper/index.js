import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Checkbox, Form } from 'antd';

const FormCheckBoxWrapper = (props) => {
  const {
    layout = {},
    label,
    rules = [],
    intl,
    children = null,
    name,
    id,
    classname = '',
    value,
    disabled = false,
    changeHandler = () => {},
  } = props;

  return (
    <Form.Item
      name={name}
      valuePropName="checked"
      rules={rules}
      label={label ? intl.formatMessage(label) : ''}
      {...layout}
    >
      <Checkbox
        id={id}
        name={name}
        className={classname}
        disabled={disabled}
        checked={value}
        onChange={changeHandler}
      >
        {children}
      </Checkbox>
    </Form.Item>
  );
};

FormCheckBoxWrapper.propTypes = {
  children: PropTypes.node,
  rules: PropTypes.array,
  disabled: PropTypes.bool,
  layout: PropTypes.object,
  label: PropTypes.object,
  name: PropTypes.string,
  id: PropTypes.string,
  classname: PropTypes.string,
  changeHandler: PropTypes.func,
  value: PropTypes.bool,
  placeholder: PropTypes.object,
  intl: PropTypes.object,
};

export default injectIntl(FormCheckBoxWrapper);
