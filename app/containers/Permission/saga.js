import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  DELETE_ITEM_BY_ID,
  GET_PERMISSION_BY_ID,
  QUERY_PERMISSION,
  SUBMIT_FORM,
  SYNC_PERMISSION,
} from 'containers/Permission/constants';
import ApiEndpoint from 'utils/api';
import commonMessage from 'common/messages';
import request from 'utils/request';
import {
  assignPermissionAction,
  asyncEndAction,
  asyncStartAction,
  enterValidationErrorAction,
  initiateCleanAction,
  queryPermissionAction,
  setInitialValuesAction,
} from 'containers/Permission/actions';
import {
  makeFormMethodSelector,
  makeFormValuesSelector,
  makeKeywordsSelector,
  makeLimitSelector,
  makePageNumberSelector,
  makeUpdateIdSelector,
} from 'containers/Permission/selectors';
import { showAlert, showFormattedAlert } from 'common/saga';
import { DELETE, GET, POST, PUT } from 'utils/constants';
import { buildQueryString } from 'common/helpers';

export function* handleSubmitForm() {
  yield put(asyncStartAction());
  const data = yield select(makeFormValuesSelector());
  const formMethod = yield select(makeFormMethodSelector());
  const id = yield select(makeUpdateIdSelector());
  const requestUrl = `/permissions${formMethod === PUT ? `/${id}` : ''}`;
  const payload = ApiEndpoint.makeApiPayload(requestUrl, formMethod, data);
  try {
    yield call(request, payload);
    yield put(queryPermissionAction());
    yield put(initiateCleanAction());
    yield put(asyncEndAction());
    const message =
      formMethod === PUT
        ? commonMessage.updateSuccess
        : commonMessage.addSuccess;
    return yield showFormattedAlert('success', message);
  } catch (error) {
    yield put(asyncEndAction());
    if (error.data && error.data.statusCode === 422) {
      return yield put(enterValidationErrorAction(error.data.message));
    }
    return yield showAlert('error', error.data.message);
  }
}

export function* handleDeleteItemById(data) {
  yield put(asyncStartAction());
  const requestUrl = `/permissions/${data.id}`;
  const payload = ApiEndpoint.makeApiPayload(requestUrl, DELETE);
  try {
    yield call(request, payload);
    yield put(queryPermissionAction());
    yield put(asyncEndAction());
    return yield showFormattedAlert('success', commonMessage.deleteSuccess);
  } catch (error) {
    yield put(asyncEndAction());
    return yield showFormattedAlert('error', commonMessage.deleteError);
  }
}

export function* handleQueryPermission() {
  yield put(asyncStartAction());
  const pageNumber = yield select(makePageNumberSelector());
  const keywords = yield select(makeKeywordsSelector());
  const limit = yield select(makeLimitSelector());
  const queryString = buildQueryString(keywords, pageNumber, limit);
  const requestUrl = `/permissions?${queryString}`;
  const payload = ApiEndpoint.makeApiPayload(requestUrl, GET);
  try {
    const response = yield call(request, payload);
    return yield put(assignPermissionAction(response));
  } catch (error) {
    return yield put(asyncEndAction());
  }
}

export function* handleGetPermissionById() {
  yield put(asyncStartAction());
  const id = yield select(makeUpdateIdSelector());
  const requestUrl = `/permissions/${id}`;
  const payload = ApiEndpoint.makeApiPayload(requestUrl, GET);
  try {
    const response = yield call(request, payload);
    yield put(setInitialValuesAction(response));
    return yield put(asyncEndAction());
  } catch (error) {
    return yield put(asyncEndAction());
  }
}

export function* handleSyncPermission() {
  yield put(asyncStartAction());
  const requestUrl = `/permissions/sync`;
  const payload = ApiEndpoint.makeApiPayload(requestUrl, POST, {});
  try {
    yield call(request, payload);
    yield put(queryPermissionAction());
    return yield showFormattedAlert('success', commonMessage.syncSuccess);
  } catch (error) {
    return yield put(asyncEndAction());
  }
}

export default function* PermissionSaga() {
  yield takeLatest(SYNC_PERMISSION, handleSyncPermission);
  yield takeLatest(QUERY_PERMISSION, handleQueryPermission);
  yield takeLatest(GET_PERMISSION_BY_ID, handleGetPermissionById);
  yield takeLatest(SUBMIT_FORM, handleSubmitForm);
  yield takeLatest(DELETE_ITEM_BY_ID, handleDeleteItemById);
}
