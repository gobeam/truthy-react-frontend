import { injectIntl } from 'react-intl';
import { Button, Spinner } from '@themesberg/react-bootstrap';
import React from 'react';
import PropTypes from 'prop-types';

/**
 *
 * FormButtonWrapper
 *
 */

const FormButtonWrapper = (props) => {
  const { label, intl, variant, show = true, className, disabled } = props;
  return (
    <>
      {show ? (
        <Button
          disabled={disabled}
          type="submit"
          variant={variant}
          className={className}
        >
          {disabled ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            ''
          )}
          {intl.formatMessage(label)}
        </Button>
      ) : (
        ''
      )}
    </>
  );
};

FormButtonWrapper.propTypes = {
  intl: PropTypes.object,
  disabled: PropTypes.bool,
  show: PropTypes.bool,
  variant: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  label: PropTypes.object.isRequired,
};

export default injectIntl(FormButtonWrapper);
