/*
 *
 * Users actions
 *
 */

import {
  ADD_VALIDATION_ERROR,
  ASSIGN_ROLES,
  ASSIGN_USERS,
  ASYNC_END,
  ASYNC_START,
  CLEAR_FORM,
  CLEAR_FORM_FIELD,
  DELETE_ITEM_BY_ID,
  GET_USER_BY_ID,
  QUERY_ROLES,
  QUERY_USERS,
  SET_FORM_METHOD,
  SET_FORM_VALUES,
  SET_ID,
  SET_INITIAL_VALUES,
  SET_PAGE_NUMBER,
  SET_PAGE_SIZE,
  SET_SEARCH_KEYWORD,
  SUBMIT_FORM,
} from 'containers/Users/constants';

export function enterValidationErrorAction(errors) {
  return {
    type: ADD_VALIDATION_ERROR,
    errors,
  };
}

export function queryUsersAction() {
  return {
    type: QUERY_USERS,
  };
}

export function queryRolesListAction() {
  return {
    type: QUERY_ROLES,
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

export function clearFormAction() {
  return {
    type: CLEAR_FORM,
  };
}

export function getUserByIdAction() {
  return {
    type: GET_USER_BY_ID,
  };
}

export function submitFormAction() {
  return {
    type: SUBMIT_FORM,
  };
}

export function clearFormFieldAction() {
  return {
    type: CLEAR_FORM_FIELD,
  };
}

export function deleteItemByIdAction(id) {
  return {
    type: DELETE_ITEM_BY_ID,
    id,
  };
}

export function assignUsersAction(users) {
  return {
    type: ASSIGN_USERS,
    users,
  };
}

export function assignRolesListAction(roles) {
  return {
    type: ASSIGN_ROLES,
    roles,
  };
}

export function setPageNumberAction(pageNumber) {
  return {
    type: SET_PAGE_NUMBER,
    pageNumber,
  };
}

export function setPageSizeAction(pageSize) {
  return {
    type: SET_PAGE_SIZE,
    pageSize,
  };
}

export function setFormMethodAction(method) {
  return {
    type: SET_FORM_METHOD,
    method,
  };
}

export function setIdAction(id) {
  return {
    type: SET_ID,
    id,
  };
}

export function setSearchKeywordAction(keywords) {
  return {
    type: SET_SEARCH_KEYWORD,
    keywords,
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
