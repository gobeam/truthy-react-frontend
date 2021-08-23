/*
 *
 * UserAccount actions
 *
 */

import {
  ADD_VALIDATION_ERROR,
  ASYNC_END,
  ASYNC_START,
  CLEAR_FORM,
  INITIATE_CLEAN,
  SET_FORM_VALUES,
  SET_INITIAL_VALUES,
  SUBMIT_FORM,
  SUBMIT_CHANGE_PASSWORD_FORM,
  QUERY_REFRESH_TOKEN_LIST,
  ASSIGN_REFRESH_TOKEN_LIST,
  DISABLE_TOKEN,
  UPDATE_TWO_FA_STATUS,
  SET_LIMIT,
  SET_PAGE_SIZE,
} from 'containers/UserAccount/constants';

/**
 * Check user is logged, this action starts the request saga
 *
 * @return {object} An action object with a type of IS_LOGGED
 */

export function enterValidationErrorAction(errors) {
  return {
    type: ADD_VALIDATION_ERROR,
    errors,
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

export function updateTwoFaStatusAction() {
  return {
    type: UPDATE_TWO_FA_STATUS,
  };
}

export function setLimitAction(limit) {
  return {
    type: SET_LIMIT,
    limit,
  };
}

export function setPageSizeAction(pageSize) {
  return {
    type: SET_PAGE_SIZE,
    pageSize,
  };
}

export function initiateCleanAction() {
  return {
    type: INITIATE_CLEAN,
  };
}

export function disableTokenAction(id) {
  return {
    type: DISABLE_TOKEN,
    id,
  };
}

export function queryRefreshTokenListAction() {
  return {
    type: QUERY_REFRESH_TOKEN_LIST,
  };
}

export function assignRefreshTokenListAction(tokenList) {
  return {
    type: ASSIGN_REFRESH_TOKEN_LIST,
    tokenList,
  };
}

export function clearFormAction() {
  return {
    type: CLEAR_FORM,
  };
}

export function submitFormAction() {
  return {
    type: SUBMIT_FORM,
  };
}

export function submitChangePasswordFormAction() {
  return {
    type: SUBMIT_CHANGE_PASSWORD_FORM,
  };
}

export function setFormValues(formValues) {
  return {
    type: SET_FORM_VALUES,
    formValues,
  };
}

export function setInitialValuesAction(initialValues) {
  return {
    type: SET_INITIAL_VALUES,
    initialValues,
  };
}
