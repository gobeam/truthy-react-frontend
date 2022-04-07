import { createSelector } from 'reselect';
import { initialState } from 'containers/ResetPassword/reducer';

const selectResetPasswordDomain = (state) =>
  state.resetPassword || initialState;

const makePasswordSelector = () =>
  createSelector(selectResetPasswordDomain, (substate) => substate.password);
const makeConfirmPasswordSelector = () =>
  createSelector(
    selectResetPasswordDomain,
    (substate) => substate.confirmPassword,
  );

const makeIsLoadingSelector = () =>
  createSelector(selectResetPasswordDomain, (substate) => substate.isLoading);

const makeErrorsSelector = () =>
  createSelector(selectResetPasswordDomain, (substate) => substate.errors);

const makeCodeSelector = () =>
  createSelector(selectResetPasswordDomain, (substate) => substate.code);

const makeFormValuesSelector = () =>
  createSelector(selectResetPasswordDomain, (substate) => substate.formValues);

const makeInitialValuesSelector = () =>
  createSelector(
    selectResetPasswordDomain,
    (substate) => substate.initialValues,
  );

const makeClearFormValueSelector = () =>
  createSelector(
    selectResetPasswordDomain,
    (substate) => substate.clearFormValue,
  );

export {
  makeClearFormValueSelector,
  makeFormValuesSelector,
  makeInitialValuesSelector,
  makeIsLoadingSelector,
  makeCodeSelector,
  makePasswordSelector,
  makeConfirmPasswordSelector,
  makeErrorsSelector,
};
