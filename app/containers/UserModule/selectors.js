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

const makeIsFormPageSelector = () =>
  createSelector(selectUserModuleDomain, (substate) => substate.formPage);

const makeFormMethodSelector = () =>
  createSelector(selectUserModuleDomain, (substate) => substate.formMethod);

const makeUpdateIdSelector = () =>
  createSelector(selectUserModuleDomain, (substate) => substate.updateId);

const makeFormTitleSelector = () =>
  createSelector(selectUserModuleDomain, (substate) => substate.formTitle);

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

const makeLimitSelector = () =>
  createSelector(selectUserModuleDomain, (substate) => substate.limit);

const makeUsersSelector = () =>
  createSelector(selectUserModuleDomain, (substate) => substate.users);

const makeErrorSelector = () =>
  createSelector(selectUserModuleDomain, (substate) => substate.errors);

export {
  makeRoleIdSelector,
  makeStatusSelector,
  makeRolesListSelector,
  makeLimitSelector,
  makeUserNameSelector,
  makePasswordSelector,
  makeConfirmPasswordSelector,
  makeNameSelector,
  makeEmailSelector,
  makeKeywordsSelector,
  makeUpdateIdSelector,
  makeFormTitleSelector,
  makeIsFormPageSelector,
  makeFormMethodSelector,
  makeIsLoadingSelector,
  makeErrorSelector,
  makePageNumberSelector,
  makeUsersSelector,
};
