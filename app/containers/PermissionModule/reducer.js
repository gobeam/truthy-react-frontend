/*
 *
 * PermissionModule reducer
 *
 */
import produce from 'immer';
import { LOCATION_CHANGE } from 'connected-react-router';
import {
  ADD_VALIDATION_ERROR,
  ASSIGN_PERMISSION,
  ASYNC_END,
  ASYNC_START,
  CHANGE_FORM_FIELD,
  CLEAR_FORM,
  SET_PAGE_NUMBER,
} from 'containers/PermissionModule/constants';

const emptyFormFieldError = {
  resource: '',
  description: '',
  path: '',
  method: '',
};

export const initialState = {
  keywords: '',
  ...emptyFormFieldError,
  pageNumber: 1,
  limit: 10,
  permissions: {
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
const permissionModuleReducer = produce((draft, action) => {
  switch (action.type) {
    case ASSIGN_PERMISSION:
      draft.permissions = action.permissions;
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
    case LOCATION_CHANGE:
      draft.resource = '';
      draft.description = '';
      draft.path = '';
      draft.method = '';
      draft.keywords = '';
      draft.errors = emptyFormFieldError;
      draft.isLoading = false;
      draft.formPage = false;
      draft.formMethod = null;
      draft.updateId = null;
      draft.formTitle = null;
      break;
  }
}, initialState);

export default permissionModuleReducer;
