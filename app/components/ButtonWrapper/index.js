import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { injectIntl } from 'react-intl';
import { Button } from '@themesberg/react-bootstrap';
import React from 'react';
import PropTypes from 'prop-types';

/**
 *
 * ButtonWrapper
 *
 */

const ButtonWrapper = (props) => {
  const {
    icon,
    label,
    intl,
    type,
    variant,
    show = true,
    classname,
    handler,
    disabled,
  } = props;
  return (
    <>
      {show ? (
        <Button
          disabled={disabled}
          type={type}
          variant={variant}
          className={classname}
          onClick={handler}
        >
          <FontAwesomeIcon icon={icon} className="me-2" />
          {intl.formatMessage(label)}
        </Button>
      ) : (
        ''
      )}
    </>
  );
};

ButtonWrapper.propTypes = {
  icon: PropTypes.object,
  intl: PropTypes.object,
  handler: PropTypes.func,
  disabled: PropTypes.bool,
  show: PropTypes.bool,
  type: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  classname: PropTypes.string.isRequired,
  label: PropTypes.object.isRequired,
};

export default injectIntl(ButtonWrapper);
