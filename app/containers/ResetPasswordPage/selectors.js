import { createSelector } from 'reselect';
import { initialState } from 'containers/ResetPasswordPage/reducer';

const selectResetPasswordPageDomain = (state) =>
  state.resetPassword || initialState;

const makePasswordSelector = () =>
  createSelector(
    selectResetPasswordPageDomain,
    (substate) => substate.password,
  );
const makeConfirmPasswordSelector = () =>
  createSelector(
    selectResetPasswordPageDomain,
    (substate) => substate.confirm_password,
  );

const makeErrorsSelector = () =>
  createSelector(selectResetPasswordPageDomain, (substate) => substate.errors);

const makeCodeSelector = () =>
  createSelector(selectResetPasswordPageDomain, (substate) => substate.code);

export {
  makeCodeSelector,
  makePasswordSelector,
  makeConfirmPasswordSelector,
  makeErrorsSelector,
};
