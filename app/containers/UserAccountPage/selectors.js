import { createSelector } from 'reselect';
import { initialState } from 'containers/UserAccountPage/reducer';

const selectUserAccountPage = (state) => state.userAccount || initialState;

const makeUserFeedSelector = () =>
  createSelector(selectUserAccountPage, (substate) => substate.feeds);

const makeUserTodoSelector = () =>
  createSelector(selectUserAccountPage, (substate) => substate.todos);

const makeUserIdSelector = () =>
  createSelector(selectUserAccountPage, (substate) => substate.accountId);

const makeTodoLimitSelector = () =>
  createSelector(selectUserAccountPage, (substate) => substate.todoLimit);
const makeFeedLimitSelector = () =>
  createSelector(selectUserAccountPage, (substate) => substate.feedLimit);

const makeUserInfoSelector = () =>
  createSelector(selectUserAccountPage, (substate) => substate.userInfo);

export {
  makeUserInfoSelector,
  makeTodoLimitSelector,
  makeFeedLimitSelector,
  makeUserIdSelector,
  makeUserFeedSelector,
  makeUserTodoSelector,
};
