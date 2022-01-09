import { createSelector } from 'reselect';
import { initialState } from 'containers/UserAccount/reducer';

const selectUserAccount = (state) => state.userAccount || initialState;

const makeInitialValuesSelector = () =>
  createSelector(selectUserAccount, (substate) => substate.initialValues);

const makeFormValuesSelector = () =>
  createSelector(selectUserAccount, (substate) => substate.formValues);

const makeIsLoadingSelector = () =>
  createSelector(selectUserAccount, (substate) => substate.isLoading);

const makeErrorSelector = () =>
  createSelector(selectUserAccount, (substate) => substate.errors);

const makeInitiateCleanFieldSelector = () =>
  createSelector(selectUserAccount, (substate) => substate.initiateClean);

const makeTokenListSelector = () =>
  createSelector(selectUserAccount, (substate) => substate.tokenList);

const makePageSizeSelector = () =>
  createSelector(selectUserAccount, (substate) => substate.pageSize);

const makeLimitSelector = () =>
  createSelector(selectUserAccount, (substate) => substate.limit);

export {
  makePageSizeSelector,
  makeLimitSelector,
  makeTokenListSelector,
  makeInitialValuesSelector,
  makeFormValuesSelector,
  makeIsLoadingSelector,
  makeErrorSelector,
  makeInitiateCleanFieldSelector,
};
