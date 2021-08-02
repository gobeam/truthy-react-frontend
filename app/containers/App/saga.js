import messages from 'common/messages';
import { showFormattedAlert, showMessage } from 'common/saga';
import {
  asyncEndAction,
  asyncStartAction,
  getProfileAction,
  getProfileErrorAction,
  getProfileSuccessAction,
  hideHeaderAction,
  isLoggedErrorAction,
  isLoggedSuccessAction,
  logoutErrorAction,
  logoutSuccessAction,
  otpCodeErrorAction,
  otpVerifiedAction,
  refreshTokenAction,
} from 'containers/App/actions';
import {
  AUTHENTICATE_OTP,
  GENERATE_OTP,
  GET_PROFILE_REQUEST,
  LOGOUT,
  REFRESH_TOKEN,
} from 'containers/App/constants';
import { makeOtpValueSelector } from 'containers/App/selectors';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import ApiEndpoint, { BASE_URL } from 'utils/api';
import { GET, POST } from 'utils/constants';
import request from 'utils/request';

/**
 *  query logged in user profile
 * @returns {IterableIterator<*>}
 */
export function* handleProfile() {
  const requestUrl = ApiEndpoint.getProfilePath();
  const payload = ApiEndpoint.makeApiPayload(requestUrl, GET);
  try {
    const response = yield call(request, payload);
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
    yield put(isLoggedErrorAction());
    return yield put(getProfileErrorAction('Internal Server Error'));
  }
}

/**
 * logout logged in user
 * @returns {IterableIterator<*>}
 */
export function* handleLogout() {
  const requestUrl = ApiEndpoint.getLogoutPath();
  const payload = ApiEndpoint.makeApiPayload(requestUrl, POST, true, {});
  try {
    yield call(request, payload);
    yield put(logoutSuccessAction());
  } catch (error) {
    yield put(logoutErrorAction(error));
  }
}

/**
 * handle refresh token action
 * @returns {IterableIterator<*>}
 */
export function* handleRefreshToken() {
  yield put(asyncStartAction());
  const requestUrl = ApiEndpoint.getRefreshTokenPath();
  const requestPayload = ApiEndpoint.makeApiPayload(requestUrl, POST, {});

  try {
    const response = yield call(request, requestPayload);
    if (response.error) {
      yield put(isLoggedErrorAction());
      yield showFormattedAlert('error', messages.invalidRefresh);
      return yield put(asyncEndAction());
    }
    return yield put(getProfileAction());
  } catch (error) {
    yield put(isLoggedErrorAction());
    yield put(asyncEndAction());
    return yield showFormattedAlert('error', messages.invalidRefresh);
  }
}

export function* handleAuthenticateOtp() {
  yield put(asyncStartAction());
  const code = yield select(makeOtpValueSelector());
  const requestUrl = '/twofa/authenticate';
  const payload = ApiEndpoint.makeApiPayload(requestUrl, POST, { code });
  try {
    yield call(request, payload);
    yield put(getProfileAction());
    yield put(otpVerifiedAction());
    yield put(asyncEndAction());
    return yield showMessage('success', messages.otpVerificationSuccess, true);
  } catch (error) {
    yield put(otpCodeErrorAction());
    return yield put(asyncEndAction());
  }
}

export function* handleGenerateOtp() {
  yield put(asyncStartAction());
  const requestUrl = '/twofa/generate';
  const payload = ApiEndpoint.makeApiPayload(requestUrl, POST, {});
  try {
    yield call(request, payload);
    yield put(asyncEndAction());
    return yield showMessage('success', messages.otpGenerateSuccess, true);
  } catch (error) {
    yield put(asyncEndAction());
    return yield showMessage('error', error.data.message);
  }
}

export default function* appPageSaga() {
  yield takeLatest(LOGOUT, handleLogout);
  yield takeLatest(GET_PROFILE_REQUEST, handleProfile);
  yield takeLatest(REFRESH_TOKEN, handleRefreshToken);
  yield takeLatest(AUTHENTICATE_OTP, handleAuthenticateOtp);
  yield takeLatest(GENERATE_OTP, handleGenerateOtp);
}
