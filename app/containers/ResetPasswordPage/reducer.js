/*
 *
 * ResetPasswordPage reducer
 *
 */
import produce from 'immer';
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
  errors: {},
};

/* eslint-disable default-case, no-param-reassign */
const resetPasswordReducer = produce((draft, action) => {
  switch (action.type) {
    case CHANGE_FIELD:
      draft[action.key] = action.val;
      delete draft.errors[action.key];
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
  }
}, initialState);

export default resetPasswordReducer;
