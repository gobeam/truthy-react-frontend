/*
 *
 * ForgotPasswordPage reducer
 *
 */
import produce from 'immer';
import {
  SET_CONTRIBUTORS,
  ASYNC_START,
  ASYNC_END,
} from 'containers/HomePage/constants';

export const initialState = {
  contributors: [],
  isLoading: false,
  errors: [],
};

/* eslint-disable default-case, no-param-reassign */
const homePageReducer = produce((draft, action) => {
  switch (action.type) {
    case SET_CONTRIBUTORS:
      draft.contributors = action.contributors;
      break;
    case ASYNC_START:
      draft.isLoading = true;
      break;
    case ASYNC_END:
      draft.isLoading = false;
      break;
  }
}, initialState);

export default homePageReducer;
