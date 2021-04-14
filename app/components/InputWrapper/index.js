/**
 *
 * InputWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

function InputWrapper({
  type,
  onChange,
  placeholder,
  invalid,
  name,
  className,
  value,
  keyDownEvent = () => {},
}) {
  return (
    <input
      value={value}
      onKeyDown={keyDownEvent}
      name={name}
      className={`relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-indigo focus:border-indigo-300 focus:z-10 sm:text-sm sm:leading-5 ${
        invalid ? 'border-red-500' : ''
      } ${className}`}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

InputWrapper.propTypes = {
  keyDownEvent: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  invalid: PropTypes.bool,
};

export default InputWrapper;
