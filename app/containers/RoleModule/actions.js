/*
 *
 * RoleModule actions
 *
 */

import {
  ADD_VALIDATION_ERROR,
  ASSIGN_ROLES,
  CHANGE_FORM_FIELD,
  DELETE_ITEM_BY_ID,
  QUERY_ROLES,
  SET_PAGE_NUMBER,
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
