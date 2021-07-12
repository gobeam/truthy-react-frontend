import { createSelector } from 'reselect';
import { initialState } from 'containers/UserModule/reducer';

/**
 * Direct selector to the UserModule state domain
 */

const selectUserModuleDomain = (state) => state.userModule || initialState;

/**
 * Other specific selectors
 */

const makeIsLoadingSelector = () =>
  createSelector(selectUserModuleDomain, (substate) => substate.isLoading);

const makeRolesListSelector = () =>
  createSelector(selectUserModuleDomain, (substate) => substate.roles);

const makeKeywordsSelector = () =>
  createSelector(selectUserModuleDomain, (substate) => substate.keywords);

const makeFormMethodSelector = () =>
  createSelector(selectUserModuleDomain, (substate) => substate.formMethod);

const makeIdSelector = () =>
  createSelector(selectUserModuleDomain, (substate) => substate.id);

const makePageNumberSelector = () =>
  createSelector(selectUserModuleDomain, (substate) => substate.pageNumber);

const makePageSizeSelector = () =>
  createSelector(selectUserModuleDomain, (substate) => substate.pageSize);

const makeUsersSelector = () =>
  createSelector(selectUserModuleDomain, (substate) => substate.users);

const makeErrorSelector = () =>
  createSelector(selectUserModuleDomain, (substate) => substate.errors);

const makeClearFormFieldSelector = () =>
  createSelector(selectUserModuleDomain, (substate) => substate.clearFormField);

const makeInitialValuesSelector = () =>
  createSelector(selectUserModuleDomain, (substate) => substate.initialValues);

const makeFormValuesSelector = () =>
  createSelector(selectUserModuleDomain, (substate) => substate.formValues);

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
