/*
 *
 * RoleModule reducer
 *
 */
import produce from 'immer';
import { LOCATION_CHANGE } from 'connected-react-router';
import {
  ADD_VALIDATION_ERROR,
  ASSIGN_ROLES,
  ASYNC_END,
  ASYNC_START,
  CHANGE_FORM_FIELD,
  SET_PAGE_NUMBER,
} from 'containers/RoleModule/constants';

const emptyFormFieldError = {
  name: '',
  description: '',
  permissions: '',
};

export const initialState = {
  name: '',
  description: '',
  pageNumber: 1,
  roles: {
    results: [],
    pageSize: 10,
    currentPage: 0,
    totalItems: 0,
    next: 0,
    previous: 0,
  },
  permissions: [],
  errors: emptyFormFieldError,
  isLoading: false,
};

/* eslint-disable default-case, no-param-reassign */
const roleModuleReducer = produce((draft, action) => {
  switch (action.type) {
    case ASSIGN_ROLES:
      draft.roles = action.roles;
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
    case LOCATION_CHANGE:
      draft.name = '';
      draft.description = '';
      draft.permissions = [];
      draft.errors = emptyFormFieldError;
      draft.isLoading = false;
      break;
  }
}, initialState);

export default roleModuleReducer;
