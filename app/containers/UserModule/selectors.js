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

const makeStatusSelector = () =>
  createSelector(selectUserModuleDomain, (substate) => substate.status);

const makeRolesListSelector = () =>
  createSelector(selectUserModuleDomain, (substate) => substate.roles);

const makeRoleIdSelector = () =>
  createSelector(selectUserModuleDomain, (substate) => substate.roleId);

const makeKeywordsSelector = () =>
  createSelector(selectUserModuleDomain, (substate) => substate.keywords);

const makeFormMethodSelector = () =>
  createSelector(selectUserModuleDomain, (substate) => substate.formMethod);

const makeIdSelector = () =>
  createSelector(selectUserModuleDomain, (substate) => substate.id);

const makeUserNameSelector = () =>
  createSelector(selectUserModuleDomain, (substate) => substate.username);

const makeEmailSelector = () =>
  createSelector(selectUserModuleDomain, (substate) => substate.email);

const makeNameSelector = () =>
  createSelector(selectUserModuleDomain, (substate) => substate.name);

const makePasswordSelector = () =>
  createSelector(selectUserModuleDomain, (substate) => substate.password);

const makeConfirmPasswordSelector = () =>
  createSelector(
    selectUserModuleDomain,
    (substate) => substate.confirmPassword,
  );

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

export {
  makeClearFormFieldSelector,
  makePageSizeSelector,
  makeRoleIdSelector,
  makeStatusSelector,
  makeRolesListSelector,
  makeUserNameSelector,
  makePasswordSelector,
  makeConfirmPasswordSelector,
  makeNameSelector,
  makeEmailSelector,
  makeKeywordsSelector,
  makeIdSelector,
  makeFormMethodSelector,
  makeIsLoadingSelector,
  makeErrorSelector,
  makePageNumberSelector,
  makeUsersSelector,
};
