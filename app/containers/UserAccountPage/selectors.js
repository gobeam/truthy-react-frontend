import { createSelector } from 'reselect';
import { initialState } from 'containers/UserAccountPage/reducer';

const selectUserAccountPage = (state) => state.userAccount || initialState;

const makeInitialValuesSelector = () =>
  createSelector(selectUserAccountPage, (substate) => substate.initialValues);

const makeFormValuesSelector = () =>
  createSelector(selectUserAccountPage, (substate) => substate.formValues);

const makeIsLoadingSelector = () =>
  createSelector(selectUserAccountPage, (substate) => substate.isLoading);

const makeErrorSelector = () =>
  createSelector(selectUserAccountPage, (substate) => substate.errors);

const makeInitiateCleanFieldSelector = () =>
  createSelector(selectUserAccountPage, (substate) => substate.initiateClean);

const makeTokenListSelector = () =>
  createSelector(selectUserAccountPage, (substate) => substate.tokenList);

const makeLimitSelector = () =>
  createSelector(selectUserAccountPage, (substate) => substate.limit);

export {
  makeLimitSelector,
  makeTokenListSelector,
  makeInitialValuesSelector,
  makeFormValuesSelector,
  makeIsLoadingSelector,
  makeErrorSelector,
  makeInitiateCleanFieldSelector,
};
