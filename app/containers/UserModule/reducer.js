/*
 *
 * UserModule reducer
 *
 */
import produce from 'immer';
import { LOCATION_CHANGE } from 'connected-react-router';
import {
  ADD_VALIDATION_ERROR,
  ASSIGN_ROLES,
  ASSIGN_USERS,
  ASYNC_END,
  ASYNC_START,
  CHANGE_FORM_FIELD,
  CLEAR_FORM,
  SET_PAGE_NUMBER,
} from 'containers/UserModule/constants';

const emptyFormField = {
  username: '',
  email: '',
  roleId: '',
  name: '',
  password: '',
  status: '',
  confirmPassword: '',
};

export const initialState = {
  keywords: '',
  ...emptyFormField,
  pageNumber: 1,
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
  errors: emptyFormField,
  isLoading: false,
  formPage: false,
  formMethod: null,
  updateId: null,
  formTitle: null,
};

/* eslint-disable default-case, no-param-reassign */
const userModuleReducer = produce((draft, action) => {
  switch (action.type) {
    case ASSIGN_USERS:
      draft.users = action.users;
      draft.isLoading = false;
      break;
    case ASSIGN_ROLES:
      draft.roles = action.roles;
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
      draft.username = '';
      draft.email = '';
      draft.name = '';
      draft.roleId = '';
      draft.password = '';
      draft.confirmPassword = '';
      draft.keywords = '';
      draft.errors = emptyFormField;
      draft.isLoading = false;
      draft.formPage = false;
      draft.formMethod = null;
      draft.updateId = null;
      draft.formTitle = null;
      break;
  }
}, initialState);

export default userModuleReducer;
