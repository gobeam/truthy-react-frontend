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
} from 'containers/ResetPasswordPage/constants';

export const initialState = {
  code: '',
  password: '',
  confirm_password: '',
  errors: {
    password: '',
    confirm_password: '',
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
    case LOCATION_CHANGE:
      draft.code = '';
      draft.password = '';
      draft.confirm_password = '';
      draft.errors = {
        password: '',
        confirm_password: '',
      };
      break;
  }
}, initialState);

export default resetPasswordReducer;
