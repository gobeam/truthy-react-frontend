/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import { LOCATION_CHANGE } from 'connected-react-router';
import { ASYNC_END, ASYNC_START } from 'containers/LoginPage/constants';
import {
  CHANGE_FIELD,
  ADD_VALIDATION_ERROR,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
} from 'containers/RegisterPage/constants';

export const initialState = {
  company: '',
  email: '',
  name: '',
  password: '',
  confirm_password: '',
  errors: {
    email: '',
    name: '',
    password: '',
    confirm_password: '',
  },
  error: '',
  isLoading: false,
};

/* eslint-disable default-case, no-param-reassign */
const loginPageReducer = produce((draft, action) => {
  switch (action.type) {
    case CHANGE_FIELD:
      draft[action.key] = action.val;
      draft.errors[action.key] = '';
      draft.isLoading = false;
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
    case REGISTER_ERROR:
      draft.error = action.error;
      draft.isLoading = false;
      break;
    case REGISTER_SUCCESS:
      draft.isLoading = false;
      break;
    case LOCATION_CHANGE:
      draft.company = '';
      draft.email = '';
      draft.name = '';
      draft.password = '';
      draft.confirm_password = '';
      draft.error = '';
      draft.errors = {
        email: '',
        name: '',
        password: '',
        confirm_password: '',
      };
      draft.isLoading = false;
      break;
  }
}, initialState);

export default loginPageReducer;
