import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Form, Input } from 'antd';

const FormInputWrapper = (props) => {
  const intl = useIntl();
  const {
    label = null,
    rules = [],
    placeholder,
    icon,
    children = null,
    required = false,
    passwordInput = false,
    name,
    id,
    classname = '',
    type,
    value,
    disabled = false,
    allowClear = false,
    changeHandler = () => {},
    min = 0,
    max = 0,
    error,
  } = props;

  return (
    <>
      {children}
      <Form.Item
        label={label ? intl.formatMessage(label) : ''}
        name={name}
        rules={rules}
        required={required}
        validateStatus={error ? 'error' : undefined}
        help={error}
        hasFeedback
      >
        {passwordInput ? (
          <Input.Password
            className={classname}
            type={type}
            id={id}
            min={min}
            value={value || ''}
            max={max}
            name={name}
            prefix={icon}
            placeholder={intl.formatMessage(placeholder)}
            onChange={changeHandler}
            disabled={disabled}
            allowClear={allowClear}
          />
        ) : (
          <Input
            className={classname}
            type={type}
            id={id}
            min={min}
            value={value || ''}
            max={max}
            name={name}
            prefix={icon}
            placeholder={intl.formatMessage(placeholder)}
            onChange={changeHandler}
            disabled={disabled}
            allowClear={allowClear}
          />
        )}
      </Form.Item>
    </>
  );
};

FormInputWrapper.propTypes = {
  children: PropTypes.node,
  error: PropTypes.string,
  rules: PropTypes.array,
  min: PropTypes.number,
  max: PropTypes.number,
  allowClear: PropTypes.bool,
  disabled: PropTypes.bool,
  passwordInput: PropTypes.bool,
  label: PropTypes.object,
  name: PropTypes.string,
  id: PropTypes.string,
  classname: PropTypes.string,
  changeHandler: PropTypes.func,
  value: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.object,
  required: PropTypes.bool,
  icon: PropTypes.object,
};

export default FormInputWrapper;
