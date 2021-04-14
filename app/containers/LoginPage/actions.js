/*
 *
 * LoginPage actions
 *
 */

import {
  ADD_VALIDATION_ERROR,
  ASYNC_START,
  CHANGE_PASSWORD,
  ENTER_LOGIN,
  LOGIN_PROCESS,
  ASYNC_END,
  CHANGE_EMAIL,
  VALIDATE_FORM,
  LOGIN_ERROR,
} from 'containers/LoginPage/constants';

export function changePasswordAction(password) {
  return {
    type: CHANGE_PASSWORD,
    password,
  };
}

export function changeEmailAction(email) {
  return {
    type: CHANGE_EMAIL,
    email,
  };
}

export function onFormValidation() {
  return {
    type: VALIDATE_FORM,
  };
}

export function isLoggedAction() {
  return {
    type: ENTER_LOGIN,
  };
}

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

export function loginErrorAction(error) {
  return {
    type: LOGIN_ERROR,
    error,
  };
}
