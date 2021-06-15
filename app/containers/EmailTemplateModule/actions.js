/*
 *
 * EmailTemplateModule actions
 *
 */

import {
  ADD_VALIDATION_ERROR,
  ASSIGN_TEMPLATE,
  ASYNC_END,
  ASYNC_START,
  CHANGE_FORM_FIELD,
  CLEAR_FORM,
  DELETE_ITEM_BY_ID,
  GET_TEMPLATE_BY_ID,
  QUERY_TEMPLATE,
  SET_PAGE_NUMBER,
  SUBMIT_FORM,
  VALIDATE_FORM,
} from 'containers/EmailTemplateModule/constants';

export function enterValidationErrorAction(errors) {
  return {
    type: ADD_VALIDATION_ERROR,
    errors,
  };
}

export function queryTemplateAction() {
  return {
    type: QUERY_TEMPLATE,
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

export function getTemplateByIdAction() {
  return {
    type: GET_TEMPLATE_BY_ID,
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

export function assignTemplatesAction(templates) {
  return {
    type: ASSIGN_TEMPLATE,
    templates,
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
