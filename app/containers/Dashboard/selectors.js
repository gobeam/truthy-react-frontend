import { createSelector } from 'reselect';
import { initialState } from 'containers/Dashboard/reducer';

const selectDashboardDomain = (state) => state.dashboard || initialState;

const makeIsLoadingSelector = () =>
  createSelector(selectDashboardDomain, (substate) => substate.isLoading);

const makeUserStatsSelector = () =>
  createSelector(selectDashboardDomain, (substate) => substate.userStats);

export { makeIsLoadingSelector, makeUserStatsSelector };
