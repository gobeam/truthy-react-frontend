import React from 'react';
import PropTypes from 'prop-types';
import messages from 'components/ErrorFallback/messages';
import { injectIntl } from 'react-intl';

const ErrorFallback = (props) => {
  const { error, resetErrorBoundary, intl } = props;
  return (
    <div role="alert">
      <p>{intl.formatMessage(messages.somethingWrong)}</p>
      <pre>{error.message}</pre>
      <button type="button" onClick={resetErrorBoundary}>
        {intl.formatMessage(messages.tryAgain)}
      </button>
    </div>
  );
};

ErrorFallback.propTypes = {
  error: PropTypes.object,
  resetErrorBoundary: PropTypes.func,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(ErrorFallback);
