import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  DELETE_ITEM_BY_ID,
  GET_USER_BY_ID,
  QUERY_ROLES,
  QUERY_USERS,
  SUBMIT_FORM,
} from 'containers/Users/constants';
import ApiEndpoint from 'utils/api';
import commonMessage from 'common/messages';
import request from 'utils/request';
import {
  assignRolesListAction,
  assignUsersAction,
  asyncEndAction,
  asyncStartAction,
  clearFormFieldAction,
  enterValidationErrorAction,
  queryUsersAction,
  setInitialValuesAction,
} from 'containers/Users/actions';
import {
  makeFormMethodSelector,
  makeFormValuesSelector,
  makeIdSelector,
  makeKeywordsSelector,
  makePageNumberSelector,
  makePageSizeSelector,
} from 'containers/Users/selectors';
import { showAlert, showFormattedAlert } from 'common/saga';
import { DELETE, GET, PUT } from 'utils/constants';
import { buildQueryString } from 'common/helpers';

export function* handleSubmitForm() {
  const formValues = yield select(makeFormValuesSelector());
  const formMethod = yield select(makeFormMethodSelector());
  const id = yield select(makeIdSelector());
  const requestUrl = `/users${formMethod === PUT ? `/${id}` : ''}`;
  const payload = ApiEndpoint.makeApiPayload(
    requestUrl,
    formMethod,
    formValues,
  );
  try {
    yield call(request, payload);
    yield put(queryUsersAction());
    yield put(clearFormFieldAction());
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
  const requestUrl = `/users/${data.id}`;
  const payload = ApiEndpoint.makeApiPayload(requestUrl, DELETE);
  try {
    yield call(request, payload);
    yield put(queryUsersAction());
    yield put(asyncEndAction());
    return yield showFormattedAlert('success', commonMessage.deleteSuccess);
  } catch (error) {
    yield put(asyncEndAction());
    return yield showFormattedAlert('error', commonMessage.deleteError);
  }
}

export function* handleQueryUsersList() {
  yield put(asyncStartAction());
  const pageNumber = yield select(makePageNumberSelector());
  const keywords = yield select(makeKeywordsSelector());
  const limit = yield select(makePageSizeSelector());
  const queryString = buildQueryString(keywords, pageNumber, limit);
  const requestUrl = `/users?${queryString}`;
  const payload = ApiEndpoint.makeApiPayload(requestUrl, GET);
  try {
    const response = yield call(request, payload);
    return yield put(assignUsersAction(response));
  } catch (error) {
    return yield put(asyncEndAction());
  }
}

export function* handleGetUserById() {
  yield put(asyncStartAction());
  const id = yield select(makeIdSelector());
  const requestUrl = `/users/${id}`;
  const payload = ApiEndpoint.makeApiPayload(requestUrl, GET);
  try {
    const response = yield call(request, payload);

    yield put(
      setInitialValuesAction({
        ...response,
        roleId: response.role?.id || '',
      }),
    );
    return yield put(asyncEndAction());
  } catch (error) {
    return yield put(asyncEndAction());
  }
}

export function* handleQueryRoles() {
  yield put(asyncStartAction());
  const requestUrl = `/roles?limit=300`;
  const payload = ApiEndpoint.makeApiPayload(requestUrl, GET);
  try {
    const response = yield call(request, payload);
    if (response.results) {
      return yield put(assignRolesListAction(response.results));
    }
    return yield put(asyncEndAction());
  } catch (error) {
    return yield put(asyncEndAction());
  }
}

export default function* PermissionSaga() {
  yield takeLatest(QUERY_USERS, handleQueryUsersList);
  yield takeLatest(QUERY_ROLES, handleQueryRoles);
  yield takeLatest(GET_USER_BY_ID, handleGetUserById);
  yield takeLatest(SUBMIT_FORM, handleSubmitForm);
  yield takeLatest(DELETE_ITEM_BY_ID, handleDeleteItemById);
}
