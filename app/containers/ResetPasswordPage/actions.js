/*
 *
 * ResetPasswordPage actions
 *
 */

import {
  RESET_PASSWORD,
  ADD_VALIDATION_ERROR,
  CHANGE_FIELD,
  VALIDATE_FORM,
  ASYNC_END,
  ASYNC_START,
} from 'containers/ResetPasswordPage/constants';

export function asyncStart() {
  return {
    type: ASYNC_START,
  };
}

export function asyncEnd() {
  return {
    type: ASYNC_END,
  };
}

export function resetPasswordAction() {
  return {
    type: RESET_PASSWORD,
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
