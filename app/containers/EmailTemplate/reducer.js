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
  CLEAR_FORM,
  SET_PAGE_NUMBER,
  INITIATE_CLEAN,
  SET_FORM_METHOD,
  SET_FORM_VALUES,
  SET_ID,
  SET_INITIAL_VALUES,
  SET_PAGE_SIZE,
  SET_KEYWORD,
} from 'containers/EmailTemplate/constants';

const EmptyField = {
  title: '',
  body: '',
  subject: '',
  sender: '',
};

export const initialState = {
  keywords: '',
  formValues: {},
  initialValues: EmptyField,
  pageNumber: 1,
  pageSize: 10,
  templates: {
    results: [],
    pageSize: 10,
    currentPage: 0,
    totalItems: 0,
    next: 0,
    previous: 0,
  },
  errors: [],
  isLoading: false,
  formMethod: null,
  initiateClean: false,
  id: null,
};

/* eslint-disable default-case, no-param-reassign */
const EmailTemplateReducer = produce((draft, action) => {
  switch (action.type) {
    case ASSIGN_TEMPLATE:
      draft.templates = action.templates;
      draft.isLoading = false;
      break;
    case INITIATE_CLEAN:
      draft.initiateClean = true;
      break;
    case SET_ID:
      draft.id = action.id;
      break;
    case SET_INITIAL_VALUES:
      draft.initialValues = action.initialValues;
      break;
    case SET_PAGE_NUMBER:
      draft.pageNumber = action.pageNumber;
      break;
    case SET_KEYWORD:
      draft.keywords = action.keywords;
      break;
    case SET_PAGE_SIZE:
      draft.pageSize = action.pageSize;
      break;
    case SET_FORM_METHOD:
      draft.formMethod = action.formMethod;
      break;
    case SET_FORM_VALUES:
      draft.formValues = action.formValues;
      break;
    case ADD_VALIDATION_ERROR:
      draft.errors = action.errors;
      break;
    case ASYNC_START:
      draft.isLoading = true;
      break;
    case ASYNC_END:
      draft.isLoading = false;
      break;
    case CLEAR_FORM:
      draft.keywords = '';
      draft.errors = [];
      draft.initialValues = EmptyField;
      draft.formValues = {};
      draft.isLoading = false;
      draft.formMethod = null;
      draft.id = null;
      draft.initiateClean = false;
      break;
  }
}, initialState);

export default EmailTemplateReducer;
