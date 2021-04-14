import { call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import request from 'utils/request';
import Common from 'utils/common';
import ApiEndpoint, { BASE_URL } from 'utils/api';
import AuthService from 'services/auth.service';
import {
  getProfileAction,
  getProfileErrorAction,
  getProfileSuccessAction,
  hideHeaderAction,
  isLoggedErrorAction,
  isLoggedSuccessAction,
  logoutErrorAction,
  logoutSuccessAction,
  refreshTokenErrorAction,
} from 'containers/App/actions';
import {
  GET_PROFILE_REQUEST,
  IS_LOGGED,
  LOGIN_PATH,
  LOGOUT,
  PUBLIC_REDIRECT_LOGGED,
} from 'containers/App/constants';
import { makeIsLoggedSelector } from 'containers/App/selectors';
import { SUCCESS_REDIRECT } from 'containers/LoginPage/constants';

export function* handleLogout() {
  const auth = new AuthService();
  const api = new ApiEndpoint();
  const token = auth.getToken();
  const refreshToken = auth.getRefreshToken();
  const requestURL = api.getLogoutPath();
  const payload = api.makeApiPayload('post', token, { token, refreshToken });
  try {
    yield call(request, requestURL, payload);
    yield put(logoutSuccessAction());
    auth.unSetTokenPayload();
    return yield put(push(LOGIN_PATH));
  } catch (error) {
    yield put(logoutErrorAction(error));
    return yield put(push(LOGIN_PATH));
  }
}

export function* handleLogged() {
  const auth = new AuthService();
  const isTokenAvailable = auth.checkToken();
  if (isTokenAvailable) {
    return yield put(getProfileAction());
  }
  auth.unSetTokenPayload();
  return yield put(isLoggedErrorAction());
  // yield put(push(`/?path=${window.location.pathname}`));
}

export function* handleProfile() {
  yield call(checkRefreshTokenExpiry);
  const api = new ApiEndpoint();
  const auth = new AuthService();
  const token = auth.getToken();
  const requestURL = api.getProfilePath();
  const payload = api.makeApiPayload('GET', token);
  try {
    const response = yield call(request, requestURL, payload);
    if (response.error) {
      auth.unSetTokenPayload();
      yield put(isLoggedErrorAction());
      // return yield put(push(`/?path=${window.location.pathname}`));
    }
    response.data.image = response.data.image
      ? `${BASE_URL}/uploads/${response.data.image}`
      : '';
    yield put(getProfileSuccessAction(response.data));
    yield put(isLoggedSuccessAction());
    yield put(hideHeaderAction(false));
    const common = new Common();
    const redirectUrl = common.getParameterByName('path');
    if (redirectUrl) {
      yield put(push(redirectUrl));
    }
    return true;
  } catch (error) {
    if (error.message !== 'Failed to fetch') {
      auth.unSetTokenPayload();
      yield put(isLoggedErrorAction());
    }
    return yield put(getProfileErrorAction('Internal Server Error'));
    // yield put(push(`/?path=${window.location.pathname}`));
  }
}

export function* checkRefreshTokenExpiry() {
  const auth = new AuthService();
  const refreshToken = auth.getRefreshToken();
  const expiryTime = auth.getExpiry();
  // 10 seconds from now
  const refreshThreshold = Date.now() / 1000 + 10;
  if (refreshToken && refreshThreshold > expiryTime) {
    yield call(handleRefreshToken);
  }
  return true;
}

export function* handleRefreshToken() {
  const api = new ApiEndpoint();
  const auth = new AuthService();
  const requestURL = api.getLoginPath();
  const refreshToken = auth.getRefreshToken();
  const payload = api.getLoginPayload('', '', true, refreshToken);
  const requestPayload = api.makeApiPayload('POST', null, payload);
  try {
    const response = yield call(request, requestURL, requestPayload);
    if (response.error) {
      auth.unSetTokenPayload();
      yield put(refreshTokenErrorAction('Session out'));
      // return yield put(push(`/?path=${window.location.pathname}`));
    }
    return auth.setTokenPayload(response.data);
  } catch (error) {
    auth.unSetTokenPayload();
    return yield put(refreshTokenErrorAction('Internal server error'));
  }
}

export function* handlePublicRedirect() {
  const isLogged = yield select(makeIsLoggedSelector());
  if (isLogged) {
    yield put(push(SUCCESS_REDIRECT));
  }
}

export default function* appPageSaga() {
  yield takeLatest(PUBLIC_REDIRECT_LOGGED, handlePublicRedirect);
  yield takeLatest(LOGOUT, handleLogout);
  yield takeLatest(IS_LOGGED, handleLogged);
  yield takeLatest(GET_PROFILE_REQUEST, handleProfile);
}
