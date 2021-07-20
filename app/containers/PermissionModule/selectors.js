import { createSelector } from 'reselect';
import { initialState } from 'containers/PermissionModule/reducer';

/**
 * Direct selector to the PermissionModule state domain
 */

const selectPermissionModuleDomain = (state) =>
  state.permissionModule || initialState;

/**
 * Other specific selectors
 */

const makeInitialValuesSelector = () =>
  createSelector(
    selectPermissionModuleDomain,
    (substate) => substate.initialValues,
  );

const makeIsLoadingSelector = () =>
  createSelector(
    selectPermissionModuleDomain,
    (substate) => substate.isLoading,
  );

const makeKeywordsSelector = () =>
  createSelector(selectPermissionModuleDomain, (substate) => substate.keywords);

const makeFormMethodSelector = () =>
  createSelector(
    selectPermissionModuleDomain,
    (substate) => substate.formMethod,
  );

const makeUpdateIdSelector = () =>
  createSelector(selectPermissionModuleDomain, (substate) => substate.id);

const makePageNumberSelector = () =>
  createSelector(
    selectPermissionModuleDomain,
    (substate) => substate.pageNumber,
  );

const makeLimitSelector = () =>
  createSelector(selectPermissionModuleDomain, (substate) => substate.pageSize);

const makePermissionsSelector = () =>
  createSelector(
    selectPermissionModuleDomain,
    (substate) => substate.permissions,
  );

const makeErrorSelector = () =>
  createSelector(selectPermissionModuleDomain, (substate) => substate.errors);

const makeInitiateCleanFieldSelector = () =>
  createSelector(
    selectPermissionModuleDomain,
    (substate) => substate.initiateClean,
  );

const makeFormValuesSelector = () =>
  createSelector(
    selectPermissionModuleDomain,
    (substate) => substate.formValues,
  );

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
