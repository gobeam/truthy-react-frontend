/*
 *
 * ProfilePage reducer
 *
 */
import produce from 'immer';
import {
  ADD_VALIDATION_ERROR,
  CHANGE_FIELD,
} from 'containers/ProfilePage/constants';

export const initialState = {
  email: '',
  name: '',
  password: '',
  dob: '',
  confirm_password: '',
  image: '',
  profile_image: '',
  errors: {
    email: '',
    name: '',
    password: '',
    confirm_password: '',
    dob: '',
    image: '',
    profile_image: '',
  },
};

/* eslint-disable default-case, no-param-reassign */
const loginPageReducer = produce((draft, action) => {
  switch (action.type) {
    case ADD_VALIDATION_ERROR:
      draft.errors = action.errors;
      draft.isLoading = false;
      break;
    case CHANGE_FIELD:
      draft[action.key] = action.val;
      draft.errors[action.key] = '';
      draft.isLoading = false;
      break;
  }
}, initialState);

export default loginPageReducer;
