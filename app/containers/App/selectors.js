import { createSelector } from 'reselect';
import { initialState } from 'containers/App/reducer';

const selectGlobal = (state) => state.global || initialState;

const selectRouter = (state) => state.router;

const makeLoggedInUserSelector = () =>
  createSelector(selectGlobal, (globalState) => globalState.user);

const makeIsLoggedSelector = () =>
  createSelector(selectGlobal, (globalState) => globalState.isLogged);

const makeSelectLocation = () =>
  createSelector(selectRouter, (routerState) => routerState.location);

const makeHideHeaderSelector = () =>
  createSelector(selectGlobal, (globalState) => globalState.hideHeader);

const makeIsLoadingSelector = () =>
  createSelector(selectGlobal, (globalState) => globalState.isLoading);

const makeDeviceSelector = () =>
  createSelector(selectGlobal, (globalState) => globalState.device);

const makeCollapsedSelector = () =>
  createSelector(selectGlobal, (globalState) => globalState.collapsed);

const makeOtpVerificationSelector = () =>
  createSelector(selectGlobal, (globalState) => globalState.otpVerified);

const makeOtpValueSelector = () =>
  createSelector(selectGlobal, (globalState) => globalState.otp);

const makeOtpErrorSelector = () =>
  createSelector(selectGlobal, (globalState) => globalState.otpError);

export {
  makeOtpErrorSelector,
  makeOtpValueSelector,
  makeOtpVerificationSelector,
  makeCollapsedSelector,
  makeDeviceSelector,
  makeIsLoadingSelector,
  makeHideHeaderSelector,
  makeLoggedInUserSelector,
  makeIsLoggedSelector,
  makeSelectLocation,
};
