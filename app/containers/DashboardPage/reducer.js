/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
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
  }
}, initialState);

export default loginPageReducer;
