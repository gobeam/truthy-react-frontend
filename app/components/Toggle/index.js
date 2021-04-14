/**
 *
 * LocaleToggle
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Input from 'components/InputWrapper';
import ToggleOption from '../ToggleOption';

function Toggle(props) {
  let content = <option>--</option>;

  // If we have items, render them
  if (props.values) {
    content = props.values.map((value) => (
      <ToggleOption key={value} value={value} message={props.messages[value]} />
    ));
  }

  return (
    <Input value={props.value} onChange={props.onToggle} type="select">
      {content}
    </Input>
  );
}

Toggle.propTypes = {
  onToggle: PropTypes.func,
  values: PropTypes.array,
  value: PropTypes.string,
  messages: PropTypes.object,
};

export default Toggle;
