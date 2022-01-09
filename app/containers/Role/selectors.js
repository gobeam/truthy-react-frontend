import { createSelector } from 'reselect';
import { initialState } from 'containers/Role/reducer';

/**
 * Direct selector to the Role state domain
 */

const selectRoleDomain = (state) => state.role || initialState;

/**
 * Other specific selectors
 */
const makeInitialValuesSelector = () =>
  createSelector(selectRoleDomain, (substate) => substate.initialValues);

const makeFormValuesSelector = () =>
  createSelector(selectRoleDomain, (substate) => substate.formValues);

const makeIsLoadingSelector = () =>
  createSelector(selectRoleDomain, (substate) => substate.isLoading);

const makeKeywordsSelector = () =>
  createSelector(selectRoleDomain, (substate) => substate.keywords);

const makeFormMethodSelector = () =>
  createSelector(selectRoleDomain, (substate) => substate.formMethod);

const makeIdSelector = () =>
  createSelector(selectRoleDomain, (substate) => substate.id);

const makePermissionListSelector = () =>
  createSelector(selectRoleDomain, (substate) => substate.permissionList);

const makePageNumberSelector = () =>
  createSelector(selectRoleDomain, (substate) => substate.pageNumber);

const makePermissionsSelector = () =>
  createSelector(selectRoleDomain, (substate) => substate.permissions);

const makeRolesSelector = () =>
  createSelector(selectRoleDomain, (substate) => substate.roles);

const makeErrorSelector = () =>
  createSelector(selectRoleDomain, (substate) => substate.errors);

const makeLimitSelector = () =>
  createSelector(selectRoleDomain, (substate) => substate.pageSize);

const makeInitiateCleanFieldSelector = () =>
  createSelector(selectRoleDomain, (substate) => substate.initiateClean);

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
