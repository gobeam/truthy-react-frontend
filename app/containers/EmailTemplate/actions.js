/*
 *
 * EmailTemplate actions
 *
 */

import {
  ADD_VALIDATION_ERROR,
  ASSIGN_TEMPLATE,
  ASYNC_END,
  ASYNC_START,
  CLEAR_FORM,
  DELETE_ITEM_BY_ID,
  GET_TEMPLATE_BY_ID,
  INITIATE_CLEAN,
  QUERY_TEMPLATE,
  SET_FORM_METHOD,
  SET_FORM_VALUES,
  SET_ID,
  SET_INITIAL_VALUES,
  SET_PAGE_NUMBER,
  SET_PAGE_SIZE,
  SUBMIT_FORM,
  SET_KEYWORD,
} from 'containers/EmailTemplate/constants';

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

export function setInitialValuesAction(initialValues) {
  return {
    type: SET_INITIAL_VALUES,
    initialValues,
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

export function setKeywordsAction(keywords) {
  return {
    type: SET_KEYWORD,
    keywords,
  };
}
