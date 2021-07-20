/**
 *
 * ToggleOption
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Select } from 'antd';
const { Option } = Select;

const ToggleOption = ({ value, message, intl }) => (
  <Option value={value}>{message ? intl.formatMessage(message) : value}</Option>
);

ToggleOption.propTypes = {
  value: PropTypes.string.isRequired,
  message: PropTypes.object,
  intl: PropTypes.object,
};

export default injectIntl(ToggleOption);
