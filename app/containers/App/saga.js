import messages from 'common/messages';
import { showFormattedAlert, showMessage } from 'common/saga';
import {
  asyncEndAction,
  asyncStartAction,
  getProfileAction,
  getProfileSuccessAction,
  hideHeaderAction,
  isLoggedErrorAction,
  isLoggedSuccessAction,
  logoutErrorAction,
  logoutSuccessAction,
  otpCodeErrorAction,
  otpVerifiedAction,
} from 'containers/App/actions';
import {
  AUTHENTICATE_OTP,
  GET_PROFILE_REQUEST,
  LOGOUT,
  REFRESH_TOKEN,
} from 'containers/App/constants';
import { makeOtpValueSelector } from 'containers/App/selectors';
import { call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import ApiEndpoint, { BASE_URL } from 'utils/api';
import { GET, POST } from 'utils/constants';
import request from 'utils/request';
import uuid from 'react-uuid';

/**
 *  query logged in user profile
 * @returns {IterableIterator<*>}
 */
export function* handleProfile() {
  const requestUrl = ApiEndpoint.getProfilePath();
  const payload = ApiEndpoint.makeApiPayload(requestUrl, GET);
  try {
    const response = yield call(request, payload);
    response.image = response.image
      ? `${BASE_URL}/uploads/${response.data.image}`
      : '';
    yield put(isLoggedSuccessAction());
    yield put(hideHeaderAction(false));
    return yield put(getProfileSuccessAction(response));
  } catch (error) {
    return yield put(isLoggedErrorAction());
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
    return yield put(logoutSuccessAction());
  } catch (error) {
    return yield put(logoutErrorAction(error));
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
    yield call(request, requestPayload);
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
    return yield showMessage({
      type: 'success',
      message: messages.otpVerificationSuccess,
      translate: true,
      id: uuid(),
    });
  } catch (error) {
    if (error.data?.message) {
      yield showMessage({
        type: 'error',
        message: error.data?.message,
        translate: false,
        id: uuid(),
      });
    }
    yield put(otpCodeErrorAction());
    return yield put(asyncEndAction());
  }
}

export default function* appPageSaga() {
  yield takeEvery(LOGOUT, handleLogout);
  yield takeLatest(GET_PROFILE_REQUEST, handleProfile);
  yield takeLatest(REFRESH_TOKEN, handleRefreshToken);
  yield takeEvery(AUTHENTICATE_OTP, handleAuthenticateOtp);
}
