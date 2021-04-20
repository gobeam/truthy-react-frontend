/*
 *
 * ResetPasswordPage reducer
 *
 */
import produce from 'immer';
import { LOCATION_CHANGE } from 'connected-react-router';
import {
  ADD_VALIDATION_ERROR,
  CHANGE_FIELD,
  ASYNC_END,
  ASYNC_START,
} from 'containers/ResetPasswordPage/constants';

export const initialState = {
  code: '',
  password: '',
  confirmPassword: '',
  isLoading: false,
  errors: {
    password: '',
    confirmPassword: '',
  },
};

/* eslint-disable default-case, no-param-reassign */
const resetPasswordReducer = produce((draft, action) => {
  switch (action.type) {
    case CHANGE_FIELD:
      draft[action.key] = action.val;
      draft.errors[action.key] = '';
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
    case LOCATION_CHANGE:
      draft.code = '';
      draft.password = '';
      draft.confirmPassword = '';
      draft.errors = {
        password: '',
        confirmPassword: '',
      };
      break;
  }
}, initialState);

export default resetPasswordReducer;
