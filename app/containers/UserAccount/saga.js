import { call, put, select, takeLatest } from 'redux-saga/effects';
import ApiEndpoint from 'utils/api';
import request from 'utils/request';
import {
  DISABLE_TOKEN,
  QUERY_REFRESH_TOKEN_LIST,
  SUBMIT_CHANGE_PASSWORD_FORM,
  SUBMIT_FORM,
  UPDATE_TWO_FA_STATUS,
} from 'containers/UserAccount/constants';
import {
  makeFormValuesSelector,
  makeLimitSelector,
  makeTokenListSelector,
  makePageSizeSelector,
} from 'containers/UserAccount/selectors';
import {
  assignRefreshTokenListAction,
  asyncEndAction,
  asyncStartAction,
  enterValidationErrorAction,
  initiateCleanAction,
  queryRefreshTokenListAction,
  setPageSizeAction,
} from 'containers/UserAccount/actions';
import { GET, PUT } from 'utils/constants';
import messages from 'containers/UserAccount/messages';
import { showAlert, showFormattedAlert, showMessage } from 'common/saga';
import { getProfileAction } from 'containers/App/actions';
import uuid from 'react-uuid';

export function* updateProfile() {
  yield put(asyncStartAction());
  const data = yield select(makeFormValuesSelector());
  const requestUrl = `/auth/profile`;
  const payload = ApiEndpoint.makeApiPayload(
    requestUrl,
    PUT,
    data,
    'multipart/form-data',
  );
  try {
    yield call(request, payload);
    yield put(getProfileAction());
    yield put(asyncEndAction());
    return yield showFormattedAlert('success', messages.profileUpdateSuccess);
  } catch (error) {
    yield put(asyncEndAction());
    if (error.data && error.data.statusCode === 422) {
      return yield put(enterValidationErrorAction(error.data.message));
    }
    return yield showAlert('error', error.data.message);
  }
}

export function* changePassword() {
  yield put(asyncStartAction());
  const data = yield select(makeFormValuesSelector());
  const requestUrl = `/auth/change-password`;
  const payload = ApiEndpoint.makeApiPayload(requestUrl, PUT, data);
  try {
    yield call(request, payload);
    yield put(asyncEndAction());
    yield put(initiateCleanAction());
    return yield showFormattedAlert('success', messages.passwordChangeSuccess);
  } catch (error) {
    yield put(asyncEndAction());
    if (error.data && error.data.statusCode === 422) {
      return yield put(enterValidationErrorAction(error.data.message));
    }
    return yield showMessage({
      type: 'error',
      message: error.data.message,
      translate: false,
      id: uuid(),
    });
  }
}

export function* queryRefreshToken() {
  yield put(asyncStartAction());
  const tokenList = yield select(makeTokenListSelector());
  const limit = yield select(makeLimitSelector());
  const pageSize = yield select(makePageSizeSelector());
  const pageSizeLimit = tokenList.next > 0 ? pageSize + 1 : pageSize;
  const requestUrl = `/auth/token-info?page=${pageSizeLimit}&limit=${limit}`;
  yield put(setPageSizeAction(pageSizeLimit));
  const payload = ApiEndpoint.makeApiPayload(requestUrl, GET);
  try {
    const response = yield call(request, payload);
    if (response.results?.length > 0) {
      response.results = [...tokenList.results, ...response.results];
      yield put(assignRefreshTokenListAction(response));
    }
    return yield put(asyncEndAction());
  } catch (error) {
    yield put(asyncEndAction());
    return yield showMessage({
      type: 'error',
      message: error.data.message,
      translate: false,
      id: uuid(),
    });
  }
}

export function* disableToken(data) {
  if (!data.id) {
    return false;
  }
  yield put(asyncStartAction());
  const requestUrl = `/revoke/${data.id}`;
  const payload = ApiEndpoint.makeApiPayload(requestUrl, PUT, {});
  try {
    yield call(request, payload);
    yield put(asyncEndAction());
    yield put(queryRefreshTokenListAction());
    return yield showMessage({
      type: 'success',
      message: messages.sessionClearSuccess,
      translate: true,
      id: uuid(),
    });
  } catch (error) {
    yield put(asyncEndAction());
    return yield showMessage({
      type: 'error',
      message: error.data.message,
      translate: false,
      id: uuid(),
    });
  }
}

export function* handleUpdateTwoFactorStatus() {
  yield put(asyncStartAction());
  const data = yield select(makeFormValuesSelector());
  const requestUrl = '/twofa';
  const payload = ApiEndpoint.makeApiPayload(requestUrl, PUT, data);
  try {
    yield call(request, payload);
    yield put(getProfileAction());
    yield put(asyncEndAction());
    return yield showMessage({
      type: 'success',
      message: data.isTwoFAEnabled
        ? messages.twoFaActivateCheck
        : messages.toggleTwoFaSuccess,
      translate: true,
      id: uuid(),
    });
  } catch (error) {
    yield put(asyncEndAction());
    return yield showMessage({
      type: 'error',
      message: error.data.message,
      translate: false,
      id: uuid(),
    });
  }
}

export default function* homePageSaga() {
  yield takeLatest(SUBMIT_FORM, updateProfile);
  yield takeLatest(QUERY_REFRESH_TOKEN_LIST, queryRefreshToken);
  yield takeLatest(SUBMIT_CHANGE_PASSWORD_FORM, changePassword);
  yield takeLatest(DISABLE_TOKEN, disableToken);
  yield takeLatest(UPDATE_TWO_FA_STATUS, handleUpdateTwoFactorStatus);
}
