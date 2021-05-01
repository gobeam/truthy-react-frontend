import { createSelector } from 'reselect';
import { initialState } from 'containers/RoleModule/reducer';

/**
 * Direct selector to the RoleModule state domain
 */

const selectRoleModuleDomain = (state) => state.roleModule || initialState;

/**
 * Other specific selectors
 */

const makeNameSelector = () =>
  createSelector(selectRoleModuleDomain, (substate) => substate.name);

const makePageNumberSelector = () =>
  createSelector(selectRoleModuleDomain, (substate) => substate.pageNumber);

const makeDescriptionSelector = () =>
  createSelector(selectRoleModuleDomain, (substate) => substate.description);

const makePermissionsSelector = () =>
  createSelector(selectRoleModuleDomain, (substate) => substate.permissions);

const makeRolesSelector = () =>
  createSelector(selectRoleModuleDomain, (substate) => substate.roles);

export {
  makePageNumberSelector,
  makeRolesSelector,
  makeNameSelector,
  makePermissionsSelector,
  makeDescriptionSelector,
};
