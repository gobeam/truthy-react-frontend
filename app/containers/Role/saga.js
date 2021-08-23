import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  DELETE_ITEM_BY_ID,
  GET_ROLE_BY_ID,
  QUERY_PERMISSION_LIST,
  QUERY_ROLES,
  SUBMIT_FORM,
} from 'containers/Role/constants';
import ApiEndpoint from 'utils/api';
import commonMessage from 'common/messages';
import request from 'utils/request';
import _ from 'lodash';
import {
  assignPermissionListAction,
  assignRolesAction,
  asyncEndAction,
  asyncStartAction,
  enterValidationErrorAction,
  initiateCleanAction,
  queryRolesAction,
  setInitialValuesAction,
} from 'containers/Role/actions';
import {
  makeFormMethodSelector,
  makeFormValuesSelector,
  makeIdSelector,
  makeKeywordsSelector,
  makeLimitSelector,
  makePageNumberSelector,
} from 'containers/Role/selectors';
import { showAlert, showFormattedAlert } from 'common/saga';
import { DELETE, GET, PUT } from 'utils/constants';
import { buildQueryString } from 'common/helpers';

export function* handleSubmitForm() {
  yield put(asyncStartAction());
  const data = yield select(makeFormValuesSelector());
  const method = yield select(makeFormMethodSelector());
  const id = yield select(makeIdSelector());
  const requestUrl = `/roles${method === PUT ? `/${id}` : ''}`;
  const payload = ApiEndpoint.makeApiPayload(requestUrl, method, data);
  try {
    yield call(request, payload);
    yield put(queryRolesAction());
    yield put(initiateCleanAction());
    yield put(asyncEndAction());
    const message =
      method === PUT ? commonMessage.updateSuccess : commonMessage.addSuccess;
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
  const requestUrl = `/roles/${data.id}`;
  const payload = ApiEndpoint.makeApiPayload(requestUrl, DELETE);
  try {
    yield call(request, payload);
    yield put(queryRolesAction());
    yield put(asyncEndAction());
    return yield showFormattedAlert('success', commonMessage.deleteSuccess);
  } catch (error) {
    yield put(asyncEndAction());
    return yield showFormattedAlert('error', commonMessage.deleteError);
  }
}

export function* handleQueryRole() {
  yield put(asyncStartAction());
  const pageNumber = yield select(makePageNumberSelector());
  const limit = yield select(makeLimitSelector());
  const keywords = yield select(makeKeywordsSelector());
  const queryString = buildQueryString(keywords, pageNumber, limit);
  const requestUrl = `/roles?${queryString}`;
  const payload = ApiEndpoint.makeApiPayload(requestUrl, GET);
  try {
    const response = yield call(request, payload);
    return yield put(assignRolesAction(response));
  } catch (error) {
    return yield put(asyncEndAction());
  }
}

export function* handleQueryPermission() {
  yield put(asyncStartAction());
  const requestUrl = `/permissions?limit=300`;
  const payload = ApiEndpoint.makeApiPayload(requestUrl, GET);
  try {
    const response = yield call(request, payload);
    if (response.results) {
      const permissionsArray = response.results;
      const permissionCheckBoxArray = [];

      // eslint-disable-next-line no-restricted-syntax
      for (const permission of permissionsArray) {
        permissionCheckBoxArray.push({
          resource: permission.resource,
          title: permission.description,
          key: permission.id,
        });
      }
      const groupedPermissionByResource = _.groupBy(
        permissionCheckBoxArray,
        'resource',
      );
      const treeStructure = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const resourcePermissionTitle of Object.keys(
        groupedPermissionByResource,
      )) {
        treeStructure.push({
          title: resourcePermissionTitle,
          key: resourcePermissionTitle,
          children: groupedPermissionByResource[resourcePermissionTitle],
        });
      }
      return yield put(assignPermissionListAction(treeStructure));
    }
    return yield put(asyncEndAction());
  } catch (error) {
    return yield put(asyncEndAction());
  }
}

export function* handleGetRoleById() {
  yield put(asyncStartAction());
  const id = yield select(makeIdSelector());
  const requestUrl = `/roles/${id}`;
  const payload = ApiEndpoint.makeApiPayload(requestUrl, GET);
  try {
    const response = yield call(request, payload);
    const permissions = response.permission.map((permission) => permission.id);
    yield put(
      setInitialValuesAction({
        name: response.name,
        description: response.description,
        permissions,
      }),
    );
    return yield put(asyncEndAction());
  } catch (error) {
    return yield put(asyncEndAction());
  }
}

export default function* RoleSaga() {
  yield takeLatest(GET_ROLE_BY_ID, handleGetRoleById);
  yield takeLatest(SUBMIT_FORM, handleSubmitForm);
  yield takeLatest(QUERY_ROLES, handleQueryRole);
  yield takeLatest(QUERY_PERMISSION_LIST, handleQueryPermission);
  yield takeLatest(DELETE_ITEM_BY_ID, handleDeleteItemById);
}
