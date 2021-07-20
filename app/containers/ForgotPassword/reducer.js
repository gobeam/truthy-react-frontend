/*
 *
 * ForgotPasswordPage reducer
 *
 */
import produce from 'immer';
import {
  ADD_VALIDATION_ERROR,
  SET_FORM_VALUES,
} from 'containers/ForgotPassword/constants';

export const initialState = {
  initialValues: { email: '' },
  formValues: {},
  isLoading: false,
  errors: [],
};

/* eslint-disable default-case, no-param-reassign */
const forgotPasswordReducer = produce((draft, action) => {
  switch (action.type) {
    case SET_FORM_VALUES:
      draft.formValues = action.formValues;
      break;
    case ADD_VALIDATION_ERROR:
      draft.errors = action.errors;
      break;
  }
}, initialState);

export default forgotPasswordReducer;
