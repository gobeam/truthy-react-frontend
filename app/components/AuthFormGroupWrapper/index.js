import React from 'react';
import PropTypes from 'prop-types';
import { Form, InputGroup } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { injectIntl } from 'react-intl';
import validationMessages from 'helpers/messages';

function AuthFormGroupWrapper({
  label,
  name,
  id,
  classname = '',
  type,
  value,
  placeholder,
  focus = true,
  required = true,
  changeHandler = () => {},
  error,
  intl,
}) {
  return (
    <Form.Group id={id} className={`mb-4 ${classname}`}>
      <Form.Label>{intl.formatMessage(label)}</Form.Label>
      <InputGroup>
        <InputGroup.Text>
          <FontAwesomeIcon icon={faEnvelope} />
        </InputGroup.Text>
        <Form.Control
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
          {error ? intl.formatMessage(validationMessages[error]) : ''}
        </Form.Control.Feedback>
      </InputGroup>
    </Form.Group>
  );
}

AuthFormGroupWrapper.propTypes = {
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

export default injectIntl(AuthFormGroupWrapper);
