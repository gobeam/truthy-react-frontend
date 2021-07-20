import { createSelector } from 'reselect';
import { initialState } from 'containers/RoleModule/reducer';

/**
 * Direct selector to the RoleModule state domain
 */

const selectRoleModuleDomain = (state) => state.roleModule || initialState;

/**
 * Other specific selectors
 */
const makeInitialValuesSelector = () =>
  createSelector(selectRoleModuleDomain, (substate) => substate.initialValues);

const makeFormValuesSelector = () =>
  createSelector(selectRoleModuleDomain, (substate) => substate.formValues);

const makeIsLoadingSelector = () =>
  createSelector(selectRoleModuleDomain, (substate) => substate.isLoading);

const makeKeywordsSelector = () =>
  createSelector(selectRoleModuleDomain, (substate) => substate.keywords);

const makeFormMethodSelector = () =>
  createSelector(selectRoleModuleDomain, (substate) => substate.formMethod);

const makeIdSelector = () =>
  createSelector(selectRoleModuleDomain, (substate) => substate.id);

const makePermissionListSelector = () =>
  createSelector(selectRoleModuleDomain, (substate) => substate.permissionList);

const makePageNumberSelector = () =>
  createSelector(selectRoleModuleDomain, (substate) => substate.pageNumber);

const makePermissionsSelector = () =>
  createSelector(selectRoleModuleDomain, (substate) => substate.permissions);

const makeRolesSelector = () =>
  createSelector(selectRoleModuleDomain, (substate) => substate.roles);

const makeErrorSelector = () =>
  createSelector(selectRoleModuleDomain, (substate) => substate.errors);

const makeLimitSelector = () =>
  createSelector(selectRoleModuleDomain, (substate) => substate.pageSize);

const makeInitiateCleanFieldSelector = () =>
  createSelector(selectRoleModuleDomain, (substate) => substate.initiateClean);

export {
  makeInitiateCleanFieldSelector,
  makeInitialValuesSelector,
  makeFormValuesSelector,
  makeLimitSelector,
  makeKeywordsSelector,
  makeIdSelector,
  makeFormMethodSelector,
  makeIsLoadingSelector,
  makePermissionListSelector,
  makeErrorSelector,
  makePageNumberSelector,
  makeRolesSelector,
  makePermissionsSelector,
};
