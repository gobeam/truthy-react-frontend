import { createSelector } from 'reselect';
import { initialState } from 'containers/RegisterPage/reducer';

/**
 * Direct selector to the RegisterPage state domain
 */

const selectRegisterPageDomain = (state) => state.register || initialState;

/**
 * Other specific selectors
 */

const makeInitialValuesSelector = () =>
  createSelector(
    selectRegisterPageDomain,
    (substate) => substate.initialValues,
  );

const makeFormValuesSelector = () =>
  createSelector(selectRegisterPageDomain, (substate) => substate.formValues);

const makeErrorSelector = () =>
  createSelector(selectRegisterPageDomain, (substate) => substate.errors);

const makeIsLoadingSelector = () =>
  createSelector(selectRegisterPageDomain, (substate) => substate.isLoading);

const makeClearFormValueSelector = () =>
  createSelector(
    selectRegisterPageDomain,
    (substate) => substate.clearFormValue,
  );

export {
  makeClearFormValueSelector,
  makeFormValuesSelector,
  makeErrorSelector,
  makeIsLoadingSelector,
  makeInitialValuesSelector,
};
