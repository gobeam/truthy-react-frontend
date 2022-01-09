/*
 *
 * Role actions
 *
 */

import {
  ADD_VALIDATION_ERROR,
  ASSIGN_PERMISSION_LIST,
  ASSIGN_ROLES,
  ASYNC_END,
  ASYNC_START,
  CHANGE_FORM_FIELD,
  CLEAR_FORM,
  DELETE_ITEM_BY_ID,
  GET_ROLE_BY_ID,
  QUERY_PERMISSION_LIST,
  QUERY_ROLES,
  SET_FORM_METHOD,
  SET_FORM_VALUES,
  SET_ID,
  SET_INITIAL_VALUES,
  SET_KEYWORD,
  SET_PAGE_NUMBER,
  SUBMIT_FORM,
  INITIATE_CLEAN,
  SET_PAGE_SIZE,
} from 'containers/Role/constants';

export function enterValidationErrorAction(errors) {
  return {
    type: ADD_VALIDATION_ERROR,
    errors,
  };
}

export function queryRolesAction() {
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

export function queryPermissionListAction() {
  return {
    type: QUERY_PERMISSION_LIST,
  };
}

export function initiateCleanAction() {
  return {
    type: INITIATE_CLEAN,
  };
}

export function clearFormAction() {
  return {
    type: CLEAR_FORM,
  };
}

export function getRoleByIdAction() {
  return {
    type: GET_ROLE_BY_ID,
  };
}

export function submitFormAction() {
  return {
    type: SUBMIT_FORM,
  };
}

export function assignPermissionListAction(permissionList) {
  return {
    type: ASSIGN_PERMISSION_LIST,
    permissionList,
  };
}

export function deleteItemByIdAction(id) {
  return {
    type: DELETE_ITEM_BY_ID,
    id,
  };
}

export function assignRolesAction(roles) {
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

export function changeFieldAction(key, value) {
  return {
    type: CHANGE_FORM_FIELD,
    key,
    value,
  };
}

export function setKeywordsAction(keywords) {
  return {
    type: SET_KEYWORD,
    keywords,
  };
}

export function setFormMethodAction(formMethod) {
  return {
    type: SET_FORM_METHOD,
    formMethod,
  };
}

export function setIdAction(id) {
  return {
    type: SET_ID,
    id,
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
