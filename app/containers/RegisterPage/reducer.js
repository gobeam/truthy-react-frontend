/*
 *
 * Register Page reducer
 *
 */
import produce from 'immer';
import {
  ADD_VALIDATION_ERROR,
  REGISTER_SUCCESS,
  SET_FORM_VALUES,
  ASYNC_END,
  ASYNC_START,
  CLEAR_FORM_VALUES,
} from 'containers/RegisterPage/constants';

const EmptyFields = {
  email: '',
  name: '',
  password: '',
  confirmPassword: '',
  username: '',
  accept: false,
};

export const initialState = {
  initialValues: EmptyFields,
  formValues: {},
  errors: [],
  error: '',
  isLoading: false,
  clearFormValue: false,
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
    case ASYNC_START:
      draft.isLoading = true;
      break;
    case ASYNC_END:
      draft.isLoading = false;
      break;
    case CLEAR_FORM_VALUES:
      draft.clearFormValue = action.clearFormValue;
      break;
    case REGISTER_SUCCESS:
      draft.isLoading = false;
      break;
  }
}, initialState);

export default loginPageReducer;
