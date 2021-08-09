/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import {
  ADD_VALIDATION_ERROR,
  ASYNC_END,
  ASYNC_START,
  CHANGE_LOGIN,
  ENTER_LOGIN_ERROR,
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  SET_FORM_VALUES,
} from 'containers/LoginPage/constants';

const EmptyFields = {
  username: '',
  password: '',
  remember: false,
};
export const initialState = {
  initialValues: EmptyFields,
  formValues: {},
  errors: [],
  isLoading: false,
};

/* eslint-disable default-case, no-param-reassign */
const loginPageReducer = produce((draft, action) => {
  switch (action.type) {
    case ADD_VALIDATION_ERROR:
      draft.errors = action.errors;
      draft.isLoading = false;
      break;
    case SET_FORM_VALUES:
      draft.formValues = action.formValues;
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
  }
}, initialState);

export default loginPageReducer;
