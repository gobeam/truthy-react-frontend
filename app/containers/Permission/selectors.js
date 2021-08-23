import { createSelector } from 'reselect';
import { initialState } from 'containers/Permission/reducer';

/**
 * Direct selector to the Permission state domain
 */

const selectPermissionDomain = (state) => state.permission || initialState;

/**
 * Other specific selectors
 */

const makeInitialValuesSelector = () =>
  createSelector(selectPermissionDomain, (substate) => substate.initialValues);

const makeIsLoadingSelector = () =>
  createSelector(selectPermissionDomain, (substate) => substate.isLoading);

const makeKeywordsSelector = () =>
  createSelector(selectPermissionDomain, (substate) => substate.keywords);

const makeFormMethodSelector = () =>
  createSelector(selectPermissionDomain, (substate) => substate.formMethod);

const makeUpdateIdSelector = () =>
  createSelector(selectPermissionDomain, (substate) => substate.id);

const makePageNumberSelector = () =>
  createSelector(selectPermissionDomain, (substate) => substate.pageNumber);

const makeLimitSelector = () =>
  createSelector(selectPermissionDomain, (substate) => substate.pageSize);

const makePermissionsSelector = () =>
  createSelector(selectPermissionDomain, (substate) => substate.permissions);

const makeErrorSelector = () =>
  createSelector(selectPermissionDomain, (substate) => substate.errors);

const makeInitiateCleanFieldSelector = () =>
  createSelector(selectPermissionDomain, (substate) => substate.initiateClean);

const makeFormValuesSelector = () =>
  createSelector(selectPermissionDomain, (substate) => substate.formValues);

export {
  makeInitialValuesSelector,
  makeFormValuesSelector,
  makeInitiateCleanFieldSelector,
  makeLimitSelector,
  makeKeywordsSelector,
  makeUpdateIdSelector,
  makeFormMethodSelector,
  makeIsLoadingSelector,
  makeErrorSelector,
  makePageNumberSelector,
  makePermissionsSelector,
};
