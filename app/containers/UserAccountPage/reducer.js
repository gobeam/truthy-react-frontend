/*
 *
 * VerifyAccountPage reducer
 *
 */
import produce from 'immer';
import { LOCATION_CHANGE } from 'connected-react-router';
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
    case LOCATION_CHANGE:
      draft.todoLimit = 1;
      draft.feedLimit = 1;
      // draft.accountId = '';
      // draft.userInfo = {};
      // draft.todos = {
      //   docs: [],
      //   page: 0,
      //   totalPages: 0,
      //   totalDocs: 0,
      // };
      // draft.feeds = {
      //   docs: [],
      //   page: 0,
      //   totalPages: 0,
      //   totalDocs: 0,
      // };
      break;
  }
}, initialState);

export default userPageReducer;
