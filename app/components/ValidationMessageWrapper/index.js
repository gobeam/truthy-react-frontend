import React from 'react';
import PropTypes from 'prop-types';

function ValidationMessageWrapper({ error }) {
  return <p className="text-red-500 text-xs italic">{error}</p>;
}

ValidationMessageWrapper.propTypes = {
  error: PropTypes.string,
};

export default ValidationMessageWrapper;
