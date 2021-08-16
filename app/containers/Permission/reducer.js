/*
 *
 * Permission reducer
 *
 */
import produce from 'immer';
import {
  ADD_VALIDATION_ERROR,
  ASSIGN_PERMISSION,
  ASYNC_END,
  ASYNC_START,
  CLEAR_FORM,
  INITIATE_CLEAN,
  SET_FORM_METHOD,
  SET_FORM_VALUES,
  SET_ID,
  SET_INITIAL_VALUES,
  SET_KEYWORD,
  SET_PAGE_NUMBER,
  SET_PAGE_SIZE,
} from 'containers/Permission/constants';

const EmptyFormField = {
  resource: '',
  description: '',
  path: '',
  method: '',
};

export const initialState = {
  keywords: '',
  formValues: {},
  initialValues: EmptyFormField,
  pageNumber: 1,
  pageSize: 10,
  permissions: {
    results: [],
    pageSize: 10,
    currentPage: 0,
    totalItems: 0,
    next: 0,
    previous: 0,
  },
  errors: [],
  isLoading: false,
  initiateClean: false,
  formMethod: null,
  id: null,
};

/* eslint-disable default-case, no-param-reassign */
const PermissionReducer = produce((draft, action) => {
  switch (action.type) {
    case ASSIGN_PERMISSION:
      draft.permissions = action.permissions;
      draft.isLoading = false;
      break;
    case INITIATE_CLEAN:
      draft.initiateClean = true;
      break;
    case SET_PAGE_NUMBER:
      draft.pageNumber = action.pageNumber;
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
    case SET_KEYWORD:
      draft.keywords = action.keywords;
      break;
    case SET_ID:
      draft.id = action.id;
      break;
    case SET_INITIAL_VALUES:
      draft.initialValues = action.initialValues;
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
      draft.initialValues = EmptyFormField;
      draft.formValues = {};
      draft.isLoading = false;
      draft.formMethod = null;
      draft.id = null;
      draft.initiateClean = false;
      break;
  }
}, initialState);

export default PermissionReducer;
