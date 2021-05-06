/*
 *
 * RoleModule actions
 *
 */

import {
  GET_ROLE_BY_ID,
  ADD_VALIDATION_ERROR,
  VALIDATE_FORM,
  ASSIGN_ROLES,
  CHANGE_FORM_FIELD,
  ASSIGN_PERMISSION_LIST,
  DELETE_ITEM_BY_ID,
  QUERY_PERMISSION_LIST,
  QUERY_ROLES,
  SET_PAGE_NUMBER,
  ASYNC_START,
  ASYNC_END,
  SUBMIT_FORM,
  CLEAR_FORM,
} from 'containers/RoleModule/constants';

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

export function changeFieldAction(key, value) {
  return {
    type: CHANGE_FORM_FIELD,
    key,
    value,
  };
}
