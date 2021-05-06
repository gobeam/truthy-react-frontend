import React from 'react';
import PropTypes from 'prop-types';
import { Form } from '@themesberg/react-bootstrap';
import { injectIntl } from 'react-intl';
import validationMessages from 'helpers/messages';

const FormInputWrapper = (props) => {
  const {
    label,
    name,
    id,
    classname = '',
    type,
    value,
    placeholder,
    focus = true,
    disabled = false,
    required = true,
    changeHandler = () => {},
    error,
    min = 0,
    max = 0,
    intl,
  } = props;
  return (
    <Form.Group id={id} className={`mb-3 ${classname}`}>
      <Form.Label>{intl.formatMessage(label)}</Form.Label>
      <Form.Control
        disabled={disabled}
        min={min}
        max={max}
        name={name}
        value={value}
        onChange={changeHandler}
        isInvalid={!!error}
        autoFocus={focus}
        type={type}
        required={required}
        placeholder={intl.formatMessage(placeholder)}
      />
      <Form.Control.Feedback type="invalid">
        {error && validationMessages[error]
          ? intl.formatMessage(validationMessages[error])
          : error}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

FormInputWrapper.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  disabled: PropTypes.bool,
  label: PropTypes.object,
  name: PropTypes.string,
  id: PropTypes.string,
  classname: PropTypes.string,
  error: PropTypes.string,
  changeHandler: PropTypes.func,
  value: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.object,
  focus: PropTypes.bool,
  required: PropTypes.bool,
  intl: PropTypes.object,
};

export default injectIntl(FormInputWrapper);
