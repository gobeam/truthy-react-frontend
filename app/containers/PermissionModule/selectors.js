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

const makeIsLoadingSelector = () =>
  createSelector(
    selectPermissionModuleDomain,
    (substate) => substate.isLoading,
  );

const makeKeywordsSelector = () =>
  createSelector(selectPermissionModuleDomain, (substate) => substate.keywords);

const makeIsFormPageSelector = () =>
  createSelector(selectPermissionModuleDomain, (substate) => substate.formPage);

const makeFormMethodSelector = () =>
  createSelector(
    selectPermissionModuleDomain,
    (substate) => substate.formMethod,
  );

const makeUpdateIdSelector = () =>
  createSelector(selectPermissionModuleDomain, (substate) => substate.updateId);

const makeFormTitleSelector = () =>
  createSelector(
    selectPermissionModuleDomain,
    (substate) => substate.formTitle,
  );

const makeResourceNameSelector = () =>
  createSelector(selectPermissionModuleDomain, (substate) => substate.resource);

const makeDescriptionSelector = () =>
  createSelector(
    selectPermissionModuleDomain,
    (substate) => substate.description,
  );

const makePathNameSelector = () =>
  createSelector(selectPermissionModuleDomain, (substate) => substate.path);

const makeMethodNameSelector = () =>
  createSelector(selectPermissionModuleDomain, (substate) => substate.method);

const makePageNumberSelector = () =>
  createSelector(
    selectPermissionModuleDomain,
    (substate) => substate.pageNumber,
  );

const makeLimitSelector = () =>
  createSelector(selectPermissionModuleDomain, (substate) => substate.limit);

const makePermissionsSelector = () =>
  createSelector(
    selectPermissionModuleDomain,
    (substate) => substate.permissions,
  );

const makeErrorSelector = () =>
  createSelector(selectPermissionModuleDomain, (substate) => substate.errors);

export {
  makeLimitSelector,
  makePathNameSelector,
  makeMethodNameSelector,
  makeResourceNameSelector,
  makeKeywordsSelector,
  makeUpdateIdSelector,
  makeFormTitleSelector,
  makeIsFormPageSelector,
  makeFormMethodSelector,
  makeIsLoadingSelector,
  makeErrorSelector,
  makePageNumberSelector,
  makePermissionsSelector,
  makeDescriptionSelector,
};
