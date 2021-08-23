import { Button, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';

const ToolTipButtonWrapper = ({
  title,
  clickEvent,
  children,
  className = '',
  danger = false,
  color = '#39af9f',
  key = '#39af9f',
}) => {
  const intl = useIntl();
  return (
    <Tooltip title={intl.formatMessage(title)} color={color} key={key}>
      <Button
        type="link"
        onClick={clickEvent}
        className={className}
        danger={danger}
      >
        {children}
      </Button>
    </Tooltip>
  );
};

ToolTipButtonWrapper.propTypes = {
  title: PropTypes.object,
  danger: PropTypes.bool,
  clickEvent: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.string,
  key: PropTypes.string,
};

export default ToolTipButtonWrapper;
