import { call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import request from 'utils/request';
import Common from 'utils/common';
import ApiEndpoint, { BASE_URL } from 'utils/api';
import {
  asyncEnd,
  asyncStart,
  getProfileAction,
  getProfileErrorAction,
  getProfileSuccessAction,
  hideHeaderAction,
  isLoggedErrorAction,
  isLoggedSuccessAction,
  logoutErrorAction,
  logoutSuccessAction,
  refreshTokenAction,
} from 'containers/App/actions';
import {
  GET_PROFILE_REQUEST,
  LOGIN_PATH,
  LOGOUT,
  PUBLIC_REDIRECT_LOGGED,
  REFRESH_TOKEN,
} from 'containers/App/constants';
import { makeIsLoggedSelector } from 'containers/App/selectors';
import { SUCCESS_REDIRECT } from 'containers/LoginPage/constants';
import { enqueueSnackbarAction } from 'containers/SnackBar/actions';
import { FormattedMessage } from 'react-intl';
import messages from 'common/messages';
import React from 'react';

/**
 *  query logged in user profile
 * @returns {IterableIterator<*>}
 */
export function* handleProfile() {
  const requestURL = ApiEndpoint.getProfilePath();
  const payload = ApiEndpoint.makeApiPayload('GET');
  try {
    const response = yield call(request, requestURL, payload);
    if (response.error) {
      if (response.message === 'token expired') {
        return yield put(refreshTokenAction());
      }
      yield put(getProfileSuccessAction({}));
      return yield put(isLoggedErrorAction());
    }
    response.image = response.image
      ? `${BASE_URL}/uploads/${response.data.image}`
      : '';
    yield put(isLoggedSuccessAction());
    yield put(hideHeaderAction(false));
    return yield put(getProfileSuccessAction(response));
  } catch (error) {
    if (error.message !== 'Failed to fetch') {
      yield put(isLoggedErrorAction());
    }
    return yield put(getProfileErrorAction('Internal Server Error'));
  }
}

/**
 * logout logged in user
 * @returns {IterableIterator<*>}
 */
export function* handleLogout() {
  const requestURL = ApiEndpoint.getLogoutPath();
  const payload = ApiEndpoint.makeApiPayload('post', true, {});
  try {
    yield call(request, requestURL, payload);
    yield put(logoutSuccessAction());
    return yield put(push(LOGIN_PATH));
  } catch (error) {
    yield put(logoutErrorAction(error));
    return yield put(push(LOGIN_PATH));
  }
}

/**
 * handle refresh token action
 * @returns {IterableIterator<*>}
 */
export function* handleRefreshToken() {
  yield put(asyncStart());
  const requestURL = ApiEndpoint.getRefreshTokenPath();
  const requestPayload = ApiEndpoint.makeApiPayload('POST', {});

  try {
    const response = yield call(request, requestURL, requestPayload);
    if (response.error) {
      yield put(isLoggedErrorAction());
      yield showError('danger', messages.invalidRefresh);
      return yield put(asyncEnd());
    }
    return yield put(getProfileAction());
  } catch (error) {
    yield put(isLoggedErrorAction());
    yield put(asyncEnd());
    return yield showError('danger', messages.invalidRefresh);
  }
}

/**
 *
 * @param type
 * @param message
 * @param autoHide
 * @returns {IterableIterator<*>}
 */
export function* showError(type, message, autoHide = true) {
  return yield put(
    enqueueSnackbarAction({
      message: <FormattedMessage {...message} />,
      type,
      autoHide,
    }),
  );
}

/**
 * handle successful authenticated redirect
 * @returns {IterableIterator<<"SELECT", SelectEffectDescriptor>|<"PUT", PutEffectDescriptor<CallHistoryMethodAction<[, ]>>>|boolean|*>}
 */
export function* handlePublicRedirect() {
  const isLogged = yield select(makeIsLoggedSelector());
  if (isLogged) {
    const redirectUrl = Common.getParameterByName('path') || SUCCESS_REDIRECT;
    return yield put(push(redirectUrl));
  }
  return true;
}

export default function* appPageSaga() {
  yield takeLatest(PUBLIC_REDIRECT_LOGGED, handlePublicRedirect);
  yield takeLatest(LOGOUT, handleLogout);
  yield takeLatest(GET_PROFILE_REQUEST, handleProfile);
  yield takeLatest(REFRESH_TOKEN, handleRefreshToken);
}
