import React from 'react';
import PropTypes from 'prop-types';
import { Form } from '@themesberg/react-bootstrap';
import { injectIntl } from 'react-intl';
import validationMessages from 'helpers/messages';

const SelectInputWrapper = (props) => {
  const {
    options,
    label,
    name,
    id,
    classname = '',
    value,
    placeholder,
    focus = true,
    disabled = false,
    required = true,
    changeHandler = () => {},
    error,
    intl,
  } = props;

  return (
    <Form.Group id={id} className={`mb-3 ${classname}`}>
      <Form.Label>{intl.formatMessage(label)}</Form.Label>
      <Form.Select
        disabled={disabled}
        name={name}
        value={value}
        onChange={changeHandler}
        isInvalid={!!error}
        autoFocus={focus}
        required={required}
        placeholder={intl.formatMessage(placeholder)}
      >
        <option defaultValue>Select</option>
        {options}
      </Form.Select>
      <Form.Control.Feedback type="invalid">
        {error && validationMessages[error]
          ? intl.formatMessage(validationMessages[error])
          : error}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

SelectInputWrapper.propTypes = {
  options: PropTypes.array,
  disabled: PropTypes.bool,
  label: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  classname: PropTypes.string,
  error: PropTypes.string,
  changeHandler: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.object.isRequired,
  focus: PropTypes.bool,
  required: PropTypes.bool,
  intl: PropTypes.object,
};

export default injectIntl(SelectInputWrapper);
