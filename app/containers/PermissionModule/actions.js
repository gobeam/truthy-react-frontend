/*
 *
 * PermissionModule actions
 *
 */

import {
  ADD_VALIDATION_ERROR,
  ASSIGN_PERMISSION,
  ASYNC_END,
  ASYNC_START,
  CHANGE_FORM_FIELD,
  CLEAR_FORM,
  DELETE_ITEM_BY_ID,
  GET_PERMISSION_BY_ID,
  QUERY_PERMISSION,
  SET_PAGE_NUMBER,
  SUBMIT_FORM,
  VALIDATE_FORM,
} from 'containers/PermissionModule/constants';

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

export function validateFormAction() {
  return {
    type: VALIDATE_FORM,
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

export function changeFieldAction(key, value) {
  return {
    type: CHANGE_FORM_FIELD,
    key,
    value,
  };
}
