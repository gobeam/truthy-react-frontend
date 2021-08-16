/*
 *
 * Permission actions
 *
 */

import {
  ADD_VALIDATION_ERROR,
  SYNC_PERMISSION,
  ASSIGN_PERMISSION,
  ASYNC_END,
  ASYNC_START,
  CLEAR_FORM,
  DELETE_ITEM_BY_ID,
  GET_PERMISSION_BY_ID,
  QUERY_PERMISSION,
  SET_PAGE_NUMBER,
  SUBMIT_FORM,
  SET_FORM_VALUES,
  SET_ID,
  SET_INITIAL_VALUES,
  SET_KEYWORD,
  SET_FORM_METHOD,
  INITIATE_CLEAN,
  SET_PAGE_SIZE,
} from 'containers/Permission/constants';

export function setFormMethodAction(formMethod) {
  return {
    type: SET_FORM_METHOD,
    formMethod,
  };
}

export function enterValidationErrorAction(errors) {
  return {
    type: ADD_VALIDATION_ERROR,
    errors,
  };
}

export function queryPermissionAction() {
  return {
    type: QUERY_PERMISSION,
  };
}

export function asyncStartAction() {
  return {
    type: ASYNC_START,
  };
}

export function syncPermissionAction() {
  return {
    type: SYNC_PERMISSION,
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

export function getPermissionByIdAction() {
  return {
    type: GET_PERMISSION_BY_ID,
  };
}

export function submitFormAction() {
  return {
    type: SUBMIT_FORM,
  };
}

export function deleteItemByIdAction(id) {
  return {
    type: DELETE_ITEM_BY_ID,
    id,
  };
}

export function assignPermissionAction(permissions) {
  return {
    type: ASSIGN_PERMISSION,
    permissions,
  };
}

export function setPageNumberAction(pageNumber) {
  return {
    type: SET_PAGE_NUMBER,
    pageNumber,
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

export function setKeywordsAction(keywords) {
  return {
    type: SET_KEYWORD,
    keywords,
  };
}

export function initiateCleanAction() {
  return {
    type: INITIATE_CLEAN,
  };
}

export function setPageSizeAction(pageSize) {
  return {
    type: SET_PAGE_SIZE,
    pageSize,
  };
}
