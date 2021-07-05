/*
 *
 * ForgotPasswordPage actions
 *
 */

import {
  FORGOT_PASSWORD,
  ADD_VALIDATION_ERROR,
  CHANGE_FIELD,
} from 'containers/ForgotPassword/constants';

export function forgotPasswordAction() {
  return {
    type: FORGOT_PASSWORD,
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
