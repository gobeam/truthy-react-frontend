import { createSelector } from 'reselect';
import { initialState } from 'containers/Users/reducer';

/**
 * Direct selector to the Users state domain
 */

const selectUsersDomain = (state) => state.users || initialState;

/**
 * Other specific selectors
 */

const makeIsLoadingSelector = () =>
  createSelector(selectUsersDomain, (substate) => substate.isLoading);

const makeRolesListSelector = () =>
  createSelector(selectUsersDomain, (substate) => substate.roles);

const makeKeywordsSelector = () =>
  createSelector(selectUsersDomain, (substate) => substate.keywords);

const makeFormMethodSelector = () =>
  createSelector(selectUsersDomain, (substate) => substate.formMethod);

const makeIdSelector = () =>
  createSelector(selectUsersDomain, (substate) => substate.id);

const makePageNumberSelector = () =>
  createSelector(selectUsersDomain, (substate) => substate.pageNumber);

const makePageSizeSelector = () =>
  createSelector(selectUsersDomain, (substate) => substate.pageSize);

const makeUsersSelector = () =>
  createSelector(selectUsersDomain, (substate) => substate.users);

const makeErrorSelector = () =>
  createSelector(selectUsersDomain, (substate) => substate.errors);

const makeClearFormFieldSelector = () =>
  createSelector(selectUsersDomain, (substate) => substate.clearFormField);

const makeInitialValuesSelector = () =>
  createSelector(selectUsersDomain, (substate) => substate.initialValues);

const makeFormValuesSelector = () =>
  createSelector(selectUsersDomain, (substate) => substate.formValues);

export {
  makeInitialValuesSelector,
  makeFormValuesSelector,
  makeClearFormFieldSelector,
  makePageSizeSelector,
  makeRolesListSelector,
  makeKeywordsSelector,
  makeIdSelector,
  makeFormMethodSelector,
  makeIsLoadingSelector,
  makeErrorSelector,
  makePageNumberSelector,
  makeUsersSelector,
};
