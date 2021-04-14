/*
 *
 * ForgotPasswordPage actions
 *
 */

import {
  FORGOT_PASSWORD,
  ADD_VALIDATION_ERROR,
  CHANGE_FIELD,
  VALIDATE_FORM,
} from 'containers/ForgotPassword/constants';

export function forgotPasswordAction() {
  return {
    type: FORGOT_PASSWORD,
  };
}

export function validateFormAction() {
  return {
    type: VALIDATE_FORM,
  };
}

export function enterValidationErrorAction(errors) {
  return {
    type: ADD_VALIDATION_ERROR,
    errors,
  };
}

export function changeFieldAction(key, val) {
  return {
    type: CHANGE_FIELD,
    key,
    val,
  };
}
