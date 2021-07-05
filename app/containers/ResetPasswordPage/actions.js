/*
 *
 * ResetPasswordPage actions
 *
 */

import {
  ADD_VALIDATION_ERROR,
  ASYNC_END,
  ASYNC_START,
  CHANGE_FIELD,
  RESET_PASSWORD,
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
