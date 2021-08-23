/*
 *
 * Users reducer
 *
 */
import produce from 'immer';
import {
  ADD_VALIDATION_ERROR,
  ASSIGN_ROLES,
  ASSIGN_USERS,
  ASYNC_END,
  ASYNC_START,
  CLEAR_FORM,
  SET_FORM_METHOD,
  SET_PAGE_NUMBER,
  SET_PAGE_SIZE,
  SET_SEARCH_KEYWORD,
  SET_ID,
  SET_FORM_VALUES,
  SET_INITIAL_VALUES,
  CLEAR_FORM_FIELD,
} from 'containers/Users/constants';

const EmptyField = {
  username: '',
  email: '',
  roleId: '',
  name: '',
  status: '',
};

export const initialState = {
  initialValues: EmptyField,
  formValues: {},
  keywords: '',
  username: '',
  email: '',
  roleId: '',
  name: '',
  password: '',
  status: '',
  confirmPassword: '',
  pageNumber: 1,
  clearFormField: false,
  pageSize: 10,
  limit: 10,
  roles: [],
  users: {
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
  id: null,
};

/* eslint-disable default-case, no-param-reassign */
const UsersReducer = produce((draft, action) => {
  switch (action.type) {
    case ASSIGN_USERS:
      draft.users = action.users;
      draft.isLoading = false;
      break;
    case CLEAR_FORM_FIELD:
      draft.clearFormField = true;
      break;
    case ASSIGN_ROLES:
      draft.roles = action.roles;
      break;
    case SET_INITIAL_VALUES:
      draft.initialValues = action.initialValues;
      break;
    case SET_FORM_VALUES:
      draft.formValues = action.formValues;
      break;
    case SET_PAGE_NUMBER:
      draft.pageNumber = action.pageNumber;
      break;
    case SET_FORM_METHOD:
      draft.formMethod = action.method;
      break;
    case SET_ID:
      draft.id = action.id;
      break;
    case SET_SEARCH_KEYWORD:
      draft.keywords = action.keywords;
      break;
    case SET_PAGE_SIZE:
      draft.pageSize = action.pageSize;
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
      draft.username = '';
      draft.email = '';
      draft.name = '';
      draft.roleId = '';
      draft.password = '';
      draft.confirmPassword = '';
      draft.keywords = '';
      draft.errors = [];
      draft.formValues = {};
      draft.initialValues = EmptyField;
      draft.clearFormField = false;
      draft.isLoading = false;
      draft.formMethod = null;
      draft.id = null;
      break;
  }
}, initialState);

export default UsersReducer;
