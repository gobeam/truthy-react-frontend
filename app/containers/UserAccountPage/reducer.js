/*
 *
 * VerifyAccountPage reducer
 *
 */
import produce from 'immer';
import { CHANGE_FIELD } from 'containers/UserAccountPage/constants';

export const initialState = {
  accountId: '',
  userInfo: {},
  todos: {
    docs: [],
    page: 0,
    totalPages: 0,
    totalDocs: 0,
  },
  feeds: {
    docs: [],
    page: 0,
    totalPages: 0,
    totalDocs: 0,
  },
  todoLimit: 1,
  feedLimit: 1,
  errors: {},
};

/* eslint-disable default-case, no-param-reassign */
const userPageReducer = produce((draft, action) => {
  switch (action.type) {
    case CHANGE_FIELD:
      draft[action.key] = action.val;
      draft.errors[action.key] = '';
      draft.isLoading = false;
      break;
  }
}, initialState);

export default userPageReducer;
