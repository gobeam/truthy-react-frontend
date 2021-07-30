import React, { memo, useLayoutEffect, useRef } from 'react';
import usePrevious from 'common/hooks/usePrevious';
import PropTypes from 'prop-types';

const OTPInputComponent = (props) => {
  const { focus, autoFocus, ...rest } = props;
  const inputRef = useRef(null);
  const prevFocus = usePrevious(!!focus);
  useLayoutEffect(() => {
    if (inputRef.current) {
      if (focus && autoFocus) {
        inputRef.current.focus();
      }
      if (focus && autoFocus && focus !== prevFocus) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }
  }, [autoFocus, focus, prevFocus]);

  return <input ref={inputRef} {...rest} />;
};

OTPInputComponent.propTypes = {
  focus: PropTypes.bool,
  autoFocus: PropTypes.bool,
};

const OTPInput = memo(OTPInputComponent);

export default OTPInput;
