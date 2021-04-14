/**
 *
 * ToggleOption
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

const ToggleOption = ({ value, title }) => (
  <option value={value}>{title}</option>
);

ToggleOption.propTypes = {
  value: PropTypes.string.isRequired,
  title: PropTypes.string,
};

export default ToggleOption;
