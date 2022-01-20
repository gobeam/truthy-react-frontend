/*
 *
 * RegisterPage actions
 *
 */

import {
  ADD_VALIDATION_ERROR,
  ASYNC_END,
  ASYNC_START,
  REGISTER_PROCESS,
  REGISTER_SUCCESS,
  SET_FORM_VALUES,
  CLEAR_FORM_VALUES,
} from 'containers/RegisterPage/constants';

export function setFormValuesAction(formValues) {
  return {
    type: SET_FORM_VALUES,
    formValues,
  };
}

export function clearFormAction(clearFormValue) {
  return {
    type: CLEAR_FORM_VALUES,
    clearFormValue,
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

export function enterRegisterAction() {
  return {
    type: REGISTER_PROCESS,
  };
}

export function registerSuccessAction() {
  return {
    type: REGISTER_SUCCESS,
  };
}
