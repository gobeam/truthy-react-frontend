import { createSelector } from 'reselect';
import { initialState } from 'containers/RoleModule/reducer';

/**
 * Direct selector to the RoleModule state domain
 */

const selectRoleModuleDomain = (state) => state.roleModule || initialState;

/**
 * Other specific selectors
 */

const makeIsLoadingSelector = () =>
  createSelector(selectRoleModuleDomain, (substate) => substate.isLoading);

const makeKeywordsSelector = () =>
  createSelector(selectRoleModuleDomain, (substate) => substate.keywords);

const makeIsFormPageSelector = () =>
  createSelector(selectRoleModuleDomain, (substate) => substate.formPage);

const makeFormMethodSelector = () =>
  createSelector(selectRoleModuleDomain, (substate) => substate.formMethod);

const makeUpdateIdSelector = () =>
  createSelector(selectRoleModuleDomain, (substate) => substate.updateId);

const makeFormTitleSelector = () =>
  createSelector(selectRoleModuleDomain, (substate) => substate.formTitle);

const makeNameSelector = () =>
  createSelector(selectRoleModuleDomain, (substate) => substate.name);

const makePermissionListSelector = () =>
  createSelector(selectRoleModuleDomain, (substate) => substate.permissionList);

const makePageNumberSelector = () =>
  createSelector(selectRoleModuleDomain, (substate) => substate.pageNumber);

const makeDescriptionSelector = () =>
  createSelector(selectRoleModuleDomain, (substate) => substate.description);

const makePermissionsSelector = () =>
  createSelector(selectRoleModuleDomain, (substate) => substate.permissions);

const makeRolesSelector = () =>
  createSelector(selectRoleModuleDomain, (substate) => substate.roles);

const makeErrorSelector = () =>
  createSelector(selectRoleModuleDomain, (substate) => substate.errors);

const makeLimitSelector = () =>
  createSelector(selectRoleModuleDomain, (substate) => substate.limit);

export {
  makeLimitSelector,
  makeKeywordsSelector,
  makeUpdateIdSelector,
  makeFormTitleSelector,
  makeIsFormPageSelector,
  makeFormMethodSelector,
  makeIsLoadingSelector,
  makePermissionListSelector,
  makeErrorSelector,
  makePageNumberSelector,
  makeRolesSelector,
  makeNameSelector,
  makePermissionsSelector,
  makeDescriptionSelector,
};
