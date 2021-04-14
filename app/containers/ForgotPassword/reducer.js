/*
 *
 * ForgotPasswordPage reducer
 *
 */
import produce from 'immer';
import { LOCATION_CHANGE } from 'connected-react-router';
import {
  ADD_VALIDATION_ERROR,
  CHANGE_FIELD,
} from 'containers/ForgotPassword/constants';

export const initialState = {
  email: '',
  errors: {
    email: '',
  },
};

/* eslint-disable default-case, no-param-reassign */
const forgotPasswordReducer = produce((draft, action) => {
  switch (action.type) {
    case CHANGE_FIELD:
      draft[action.key] = action.val;
      draft.errors[action.key] = '';
      break;
    case ADD_VALIDATION_ERROR:
      draft.errors = action.errors;
      break;
    case LOCATION_CHANGE:
      draft.email = '';
      draft.errors = {
        email: '',
      };
      break;
  }
}, initialState);

export default forgotPasswordReducer;
