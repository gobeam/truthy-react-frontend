/*
 *
 * LoginPage actions
 *
 */

import {
  ADD_VALIDATION_ERROR,
  ASYNC_END,
  ASYNC_START,
  LOGIN_PROCESS,
  SET_FORM_VALUES,
} from 'containers/LoginPage/constants';

export function setFormValuesAction(formValues) {
  return {
    type: SET_FORM_VALUES,
    formValues,
  };
}

export function asyncStartAction() {
  return {
    type: ASYNC_START,
  };
}

export function asyncEndAction() {
  return {
    type: ASYNC_END,
  };
}

export function enterValidationErrorAction(errors) {
  return {
    type: ADD_VALIDATION_ERROR,
    errors,
  };
}

export function enterLoginAction() {
  return {
    type: LOGIN_PROCESS,
  };
}
