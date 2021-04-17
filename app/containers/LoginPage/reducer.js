/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import { LOCATION_CHANGE } from 'connected-react-router';
import {
  ADD_VALIDATION_ERROR,
  CHANGE_USERNAME,
  CHANGE_LOGIN,
  CHANGE_PASSWORD,
  ENTER_LOGIN_ERROR,
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  ASYNC_END,
  ASYNC_START,
} from './constants';

export const initialState = {
  username: '',
  password: '',
  errors: {},
  isLoading: false,
};

/* eslint-disable default-case, no-param-reassign */
const loginPageReducer = produce((draft, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD:
      draft.password = action.password;
      draft.errors.password = '';
      break;
    case CHANGE_USERNAME:
      draft.username = action.username;
      draft.errors.username = '';
      break;
    case ADD_VALIDATION_ERROR:
      draft.errors = action.errors;
      draft.isLoading = false;
      break;
    case CHANGE_LOGIN:
      draft.login = action.login;
      draft.error = '';
      break;
    case ASYNC_START:
      draft.isLoading = true;
      break;
    case ASYNC_END:
      draft.isLoading = false;
      break;
    case ENTER_LOGIN_ERROR:
      draft.error = action.error;
      draft.isLoading = false;
      break;
    case LOGIN:
      draft.login = action.login;
      draft.password = action.password;
      draft.isLoading = true;
      break;
    case LOGIN_SUCCESS:
      draft.isLoading = false;
      break;
    case LOGIN_ERROR:
      draft.error = action.error;
      draft.isLoading = false;
      break;
    case LOCATION_CHANGE:
      draft.username = '';
      draft.password = '';
      draft.error = '';
      draft.errors = {};
      draft.isLoading = false;
      break;
  }
}, initialState);

export default loginPageReducer;
