/*
 *
 * ResetPassword reducer
 *
 */
import produce from 'immer';
import {
  ADD_VALIDATION_ERROR,
  ASYNC_END,
  ASYNC_START,
  SET_FORM_VALUES,
  SET_RESET_CODE,
} from 'containers/ResetPassword/constants';

export const initialState = {
  code: '',
  initialValues: {
    password: '',
    confirmPassword: '',
  },
  formValues: {},
  isLoading: false,
  errors: {},
};

/* eslint-disable default-case, no-param-reassign */
const resetPasswordReducer = produce((draft, action) => {
  switch (action.type) {
    case SET_FORM_VALUES:
      draft.formValues = action.formValues;
      break;
    case SET_RESET_CODE:
      draft.code = action.code;
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
