/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import { LOCATION_CHANGE } from 'connected-react-router';
import { IS_LOGGED } from 'containers/DashboardPage/constants';

export const initialState = {
  currentUser: {},
};

/* eslint-disable default-case, no-param-reassign */
const loginPageReducer = produce((draft, action) => {
  switch (action.type) {
    case IS_LOGGED:
      draft.password = action.password;
      draft.errors.password = '';
      break;
    case LOCATION_CHANGE:
      draft.email = '';
      draft.password = '';
      draft.error = '';
      draft.isLoading = false;
      break;
  }
}, initialState);

export default loginPageReducer;
