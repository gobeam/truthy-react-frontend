/*
 *
 * EmailTemplate reducer
 *
 */
import produce from 'immer';
import {
  ADD_VALIDATION_ERROR,
  ASSIGN_TEMPLATE,
  ASYNC_END,
  ASYNC_START,
  CHANGE_FORM_FIELD,
  CLEAR_FORM,
  SET_PAGE_NUMBER,
} from 'containers/EmailTemplateModule/constants';

const emptyFormFieldError = {
  title: '',
  body: '',
  subject: '',
  sender: '',
};

export const initialState = {
  keywords: '',
  ...emptyFormFieldError,
  pageNumber: 1,
  limit: 10,
  templates: {
    results: [],
    pageSize: 10,
    currentPage: 0,
    totalItems: 0,
    next: 0,
    previous: 0,
  },
  errors: emptyFormFieldError,
  isLoading: false,
  formPage: false,
  formMethod: null,
  updateId: null,
  formTitle: null,
};

/* eslint-disable default-case, no-param-reassign */
const emailTemplateModuleReducer = produce((draft, action) => {
  switch (action.type) {
    case ASSIGN_TEMPLATE:
      draft.templates = action.templates;
      draft.isLoading = false;
      break;
    case CHANGE_FORM_FIELD:
      draft[action.key] = action.value;
      draft.errors[action.key] = '';
      break;
    case SET_PAGE_NUMBER:
      draft.pageNumber = action.pageNumber;
      break;
    case ADD_VALIDATION_ERROR:
      draft.errors = action.errors;
      draft.isLoading = false;
      break;
    case ASYNC_START:
      draft.isLoading = true;
      break;
    case ASYNC_END:
      draft.isLoading = false;
      break;
    case CLEAR_FORM:
  }
}, initialState);

export default emailTemplateModuleReducer;
