import { createSelector } from 'reselect';
import { initialState } from 'containers/HomePage/reducer';
const selectHomePageDomain = (state) => state.homePage || initialState;

const makeContributorsSelector = () =>
  createSelector(selectHomePageDomain, (substate) => substate.contributors);

const makeIsLoadingSelector = () =>
  createSelector(selectHomePageDomain, (substate) => substate.isLoading);

export { makeIsLoadingSelector, makeContributorsSelector };
