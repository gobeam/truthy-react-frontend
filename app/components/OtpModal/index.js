import { Button, Modal } from 'antd';
import commonMessages from 'common/messages';
import OTPInput from 'components/OtpModal/otpInput';
import PropTypes from 'prop-types';
import React, { memo, useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import uuid from 'react-uuid';

const OtpModalComponent = (props) => {
  const {
    length,
    isNumberInput,
    autoFocus,
    disabled,
    onChangeOTP,
    onVerifyOtp,
    inputClassName,
    inputStyle,
    visible,
    ...rest
  } = props;
  const intl = useIntl();
  const [activeInput, setActiveInput] = useState(0);
  const [otpValues, setOTPValues] = useState(Array(6).fill(''));

  // Helper to return OTP from inputs
  const handleOtpChange = useCallback(
    (otp) => {
      const otpValue = otp.join('');
      onChangeOTP(otpValue);
    },
    [onChangeOTP],
  );

  // Helper to return value with the right type: 'text' or 'number'
  const getRightValue = useCallback(
    (str) => {
      const changedValue = str;
      if (!isNumberInput) {
        return changedValue;
      }
      return !changedValue || /\d/.test(changedValue) ? changedValue : '';
    },
    [isNumberInput],
  );

  // Change OTP value at focussing input
  const changeCodeAtFocus = useCallback(
    (str) => {
      const updatedOTPValues = [...otpValues];
      updatedOTPValues[activeInput] = str[0] || '';
      setOTPValues(updatedOTPValues);
      handleOtpChange(updatedOTPValues);
    },
    [activeInput, handleOtpChange, otpValues],
  );

  // Focus `inputIndex` input
  const focusInput = useCallback(
    (inputIndex) => {
      const selectedIndex = Math.max(Math.min(length - 1, inputIndex), 0);
      setActiveInput(selectedIndex);
    },
    [length],
  );

  const focusPrevInput = useCallback(() => {
    focusInput(activeInput - 1);
  }, [activeInput, focusInput]);

  const focusNextInput = useCallback(() => {
    focusInput(activeInput + 1);
  }, [activeInput, focusInput]);

  // Handle onFocus input
  const handleOnFocus = useCallback(
    (index) => () => {
      focusInput(index);
    },
    [focusInput],
  );

  // Handle onChange value for each input
  const handleOnChange = useCallback(
    (e) => {
      const val = getRightValue(e.currentTarget.value);
      if (!val) {
        e.preventDefault();
        return;
      }
      changeCodeAtFocus(val);
      focusNextInput();
    },
    [changeCodeAtFocus, focusNextInput, getRightValue],
  );

  // Hanlde onBlur input
  const onBlur = useCallback(() => {
    setActiveInput(-1);
  }, []);

  // Handle onKeyDown input
  const handleOnKeyDown = useCallback(
    (e) => {
      switch (e.key) {
        case 'Backspace':
        case 'Delete': {
          e.preventDefault();
          if (otpValues[activeInput]) {
            changeCodeAtFocus('');
          } else {
            focusPrevInput();
          }
          break;
        }
        case 'ArrowLeft': {
          e.preventDefault();
          focusPrevInput();
          break;
        }
        case 'ArrowRight': {
          e.preventDefault();
          focusNextInput();
          break;
        }
        case ' ': {
          e.preventDefault();
          break;
        }
        default:
          break;
      }
    },
    [activeInput, changeCodeAtFocus, focusNextInput, focusPrevInput, otpValues],
  );

  const handleOnPaste = useCallback(
    (e) => {
      e.preventDefault();
      const pastedData = e.clipboardData
        .getData('text/plain')
        .trim()
        .slice(0, length - activeInput)
        .split('');
      if (pastedData) {
        let nextFocusIndex = 0;
        const updatedOTPValues = [...otpValues];
        updatedOTPValues.forEach((val, index) => {
          if (index >= activeInput) {
            const changedValue = getRightValue(pastedData.shift() || val);
            if (changedValue) {
              updatedOTPValues[index] = changedValue;
              nextFocusIndex = index;
            }
          }
        });
        setOTPValues(updatedOTPValues);
        setActiveInput(Math.min(nextFocusIndex + 1, length - 1));
      }
    },
    [activeInput, getRightValue, length, otpValues],
  );
  return (
    <Modal
      maskStyle={{
        backdropFilter: 'blur(6px)',
      }}
      title={intl.formatMessage(commonMessages.otpLabel)}
      visible={visible}
      width={600}
      closable={false}
      footer={[
        <Button type="primary" onClick={onVerifyOtp} key="validate-btn">
          {intl.formatMessage(commonMessages.validateLabel)}
        </Button>,
      ]}
      centered
    >
      <div {...rest}>
        {Array(length)
          .fill('')
          .map((_, index) => (
            <OTPInput
              key={uuid()}
              focus={activeInput === index}
              value={otpValues && otpValues[index]}
              autoFocus={autoFocus}
              onFocus={handleOnFocus(index)}
              onChange={handleOnChange}
              onKeyDown={handleOnKeyDown}
              onBlur={onBlur}
              onPaste={handleOnPaste}
              style={inputStyle}
              className={inputClassName}
              disabled={disabled}
            />
          ))}
      </div>
      {/* <Button type="link" onClick={onGenerateOtp}>
        {intl.formatMessage(commonMessages.generateOtp)}
      </Button> */}
    </Modal>
  );
};

OtpModalComponent.propTypes = {
  onChangeOTP: PropTypes.func.isRequired,
  onVerifyOtp: PropTypes.func.isRequired,
  length: PropTypes.number.isRequired,
  autoFocus: PropTypes.bool,
  visible: PropTypes.bool,
  isNumberInput: PropTypes.bool,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  inputStyle: PropTypes.object,
  inputClassName: PropTypes.string,
  className: PropTypes.string,
};

const OtpModal = memo(OtpModalComponent);
export default OtpModal;
