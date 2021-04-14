/**
 *
 * LocaleToggle
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Form } from '@themesberg/react-bootstrap';
import ToggleOption from '../ToggleOption';

function Toggle(props) {
  let content = <option>--</option>;
  if (props.values) {
    content = props.values.map((value) => (
      <ToggleOption key={value} value={value} message={props.messages[value]} />
    ));
  }

  return (
    <Form.Control
      as="select"
      size="sm"
      value={props.value}
      onChange={props.onToggle}
    >
      {content}
    </Form.Control>
  );
}

Toggle.propTypes = {
  onToggle: PropTypes.func,
  values: PropTypes.array,
  value: PropTypes.string,
  messages: PropTypes.object,
};

export default Toggle;
