import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import ApiEndpoint, { BASE_URL } from 'utils/api';
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
  refreshTokenAction,
} from 'containers/App/actions';
import {
  GET_PROFILE_REQUEST,
  LOGOUT,
  REFRESH_TOKEN,
} from 'containers/App/constants';
import messages from 'common/messages';
import { showFormattedAlert } from 'common/saga';
import { GET, POST } from 'utils/constants';

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

export default function* appPageSaga() {
  yield takeLatest(LOGOUT, handleLogout);
  yield takeLatest(GET_PROFILE_REQUEST, handleProfile);
  yield takeLatest(REFRESH_TOKEN, handleRefreshToken);
}
