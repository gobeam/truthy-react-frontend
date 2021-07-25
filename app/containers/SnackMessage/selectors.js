import { createSelector } from 'reselect';
import { initialState } from 'containers/SnackMessage/reducer';

const selectSnackMessage = (state) => state.snackMessage || initialState;

const makeSnackMessageSelector = () =>
  createSelector(selectSnackMessage, (substate) => substate.message);

const makeSnackMessageTypeSelector = () =>
  createSelector(selectSnackMessage, (substate) => substate.type);

const makeIdSelector = () =>
  createSelector(selectSnackMessage, (substate) => substate.id);

const makeDurationSelector = () =>
  createSelector(selectSnackMessage, (substate) => substate.duration);

const makeTranslateSelector = () =>
  createSelector(selectSnackMessage, (substate) => substate.translate);

export {
  makeTranslateSelector,
  makeDurationSelector,
  makeIdSelector,
  makeSnackMessageSelector,
  makeSnackMessageTypeSelector,
};
