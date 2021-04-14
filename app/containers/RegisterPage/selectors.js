import { createSelector } from 'reselect';
import { initialState } from 'containers/RegisterPage/reducer';

/**
 * Direct selector to the RegisterPage state domain
 */

const selectRegisterPageDomain = (state) => state.register || initialState;

/**
 * Other specific selectors
 */

const makeEmailSelector = () =>
  createSelector(selectRegisterPageDomain, (substate) => substate.email);

const makeNameSelector = () =>
  createSelector(selectRegisterPageDomain, (substate) => substate.name);

const makePasswordSelector = () =>
  createSelector(selectRegisterPageDomain, (substate) => substate.password);

const makeConfirmPasswordSelector = () =>
  createSelector(
    selectRegisterPageDomain,
    (substate) => substate.confirmPassword,
  );

const makeErrorSelector = () =>
  createSelector(selectRegisterPageDomain, (substate) => substate.errors);

const makeIsLoadingSelector = () =>
  createSelector(selectRegisterPageDomain, (substate) => substate.isLoading);

export {
  makeEmailSelector,
  makeConfirmPasswordSelector,
  makePasswordSelector,
  makeNameSelector,
  makeErrorSelector,
  makeIsLoadingSelector,
};
