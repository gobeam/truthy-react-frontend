import { createSelector } from 'reselect';
import { initialState } from 'containers/ForgotPassword/reducer';
const selectForgotPasswordPageDomain = (state) =>
  state.forgotPassword || initialState;

const makeFormValuesSelector = () =>
  createSelector(
    selectForgotPasswordPageDomain,
    (substate) => substate.formValues,
  );

const makeInitialValuesSelector = () =>
  createSelector(
    selectForgotPasswordPageDomain,
    (substate) => substate.initialValues,
  );

const makeErrorsSelector = () =>
  createSelector(selectForgotPasswordPageDomain, (substate) => substate.errors);

const makeIsLoadingSelector = () =>
  createSelector(
    selectForgotPasswordPageDomain,
    (substate) => substate.isLoading,
  );

export {
  makeFormValuesSelector,
  makeErrorsSelector,
  makeIsLoadingSelector,
  makeInitialValuesSelector,
};
