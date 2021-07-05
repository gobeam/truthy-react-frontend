/*
 *
 * ForgotPasswordPage reducer
 *
 */
import produce from 'immer';
import {
  ADD_VALIDATION_ERROR,
  CHANGE_FIELD,
} from 'containers/ForgotPassword/constants';

export const initialState = {
  email: '',
  isLoading: false,
  errors: {},
};

/* eslint-disable default-case, no-param-reassign */
const forgotPasswordReducer = produce((draft, action) => {
  switch (action.type) {
    case CHANGE_FIELD:
      draft[action.key] = action.val;
      delete draft.errors[action.key];
      break;
    case ADD_VALIDATION_ERROR:
      draft.errors = action.errors;
      break;
  }
}, initialState);

export default forgotPasswordReducer;
