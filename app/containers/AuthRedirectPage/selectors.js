import { createSelector } from 'reselect';
import { initialState } from 'containers/AuthRedirectPage/reducer';

const selectVerifyPageDomain = (state) => state.verifyPage || initialState;

const makeVerifyCodeSelector = () =>
  createSelector(selectVerifyPageDomain, (substate) => substate.verifyCode);

export { makeVerifyCodeSelector };
