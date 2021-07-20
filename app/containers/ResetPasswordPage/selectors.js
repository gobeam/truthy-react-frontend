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
    (substate) => substate.confirmPassword,
  );

const makeIsLoadingSelector = () =>
  createSelector(
    selectResetPasswordPageDomain,
    (substate) => substate.isLoading,
  );

const makeErrorsSelector = () =>
  createSelector(selectResetPasswordPageDomain, (substate) => substate.errors);

const makeCodeSelector = () =>
  createSelector(selectResetPasswordPageDomain, (substate) => substate.code);

const makeFormValuesSelector = () =>
  createSelector(
    selectResetPasswordPageDomain,
    (substate) => substate.formValues,
  );

const makeInitialValuesSelector = () =>
  createSelector(
    selectResetPasswordPageDomain,
    (substate) => substate.initialValues,
  );

export {
  makeFormValuesSelector,
  makeInitialValuesSelector,
  makeIsLoadingSelector,
  makeCodeSelector,
  makePasswordSelector,
  makeConfirmPasswordSelector,
  makeErrorsSelector,
};
