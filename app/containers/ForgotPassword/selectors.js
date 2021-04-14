import { createSelector } from 'reselect';
import { initialState } from 'containers/ForgotPassword/reducer';
const selectForgotPasswordPageDomain = (state) =>
  state.forgotPassword || initialState;

const makeEmailSelector = () =>
  createSelector(selectForgotPasswordPageDomain, (substate) => substate.email);

const makeErrorsSelector = () =>
  createSelector(selectForgotPasswordPageDomain, (substate) => substate.errors);

export { makeEmailSelector, makeErrorsSelector };