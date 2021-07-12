import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  DELETE_ITEM_BY_ID,
  GET_ROLE_BY_ID,
  QUERY_PERMISSION_LIST,
  QUERY_ROLES,
  SUBMIT_FORM,
  VALIDATE_FORM,
} from 'containers/RoleModule/constants';
import ApiEndpoint from 'utils/api';
import deleteMessage from 'components/DeleteModal/messages';
import commonMessage from 'common/messages';
import request from 'utils/request';
import _ from 'lodash';
import {
  assignPermissionListAction,
  assignRolesAction,
  asyncEndAction,
  asyncStartAction,
  changeFieldAction,
  clearFormAction,
  enterValidationErrorAction,
  queryRolesAction,
  submitFormAction,
} from 'containers/RoleModule/actions';
import {
  makeDescriptionSelector,
  makeFormMethodSelector,
  makeKeywordsSelector,
  makeLimitSelector,
  makeNameSelector,
  makePageNumberSelector,
  makePermissionsSelector,
  makeUpdateIdSelector,
} from 'containers/RoleModule/selectors';
import { checkError } from 'helpers/Validation';
import { showFormattedAlert } from 'common/saga';
import { DELETE, GET, PUT } from 'utils/constants';
import { buildQueryString } from 'common/helpers';

export function* handleSubmitForm() {
  yield put(asyncStartAction());
  const name = yield select(makeNameSelector());
  const description = yield select(makeDescriptionSelector());
  const permissions = yield select(makePermissionsSelector());
  const method = yield select(makeFormMethodSelector());
  const id = yield select(makeUpdateIdSelector());
  const requestUrl = `/roles${method === PUT ? `/${id}` : ''}`;
  const payload = ApiEndpoint.makeApiPayload(requestUrl, method, {
    name,
    description,
    permissions,
  });
  try {
    const response = yield call(request, payload);
    yield put(asyncEndAction());
    if (response && response.error) {
      return yield put(enterValidationErrorAction(response.error));
    }
    yield put(queryRolesAction());
    yield put(changeFieldAction('formPage', false));
    yield put(clearFormAction());
    const message =
      method === PUT ? commonMessage.updateSuccess : commonMessage.addSuccess;
    return yield showFormattedAlert('success', message);
  } catch (error) {
    yield put(asyncEndAction());
    return yield showFormattedAlert('error', commonMessage.serverError);
  }
}

export function* handleValidateForm() {
  yield put(asyncStartAction());
  const name = yield select(makeNameSelector());
  const model = {
    name: {
      value: name,
      validator: ['isString', 'isNotEmpty'],
    },
  };
  const err = checkError(model);
  if (Object.keys(err).length > 0) {
    yield put(asyncEndAction());
    return yield put(enterValidationErrorAction(err));
  }
  return yield put(submitFormAction());
}

export function* handleDeleteItemById(data) {
  yield put(asyncStartAction());
  const requestUrl = `/roles/${data.id}`;
  const payload = ApiEndpoint.makeApiPayload(requestUrl, DELETE);
  try {
    yield call(request, payload);
    yield put(queryRolesAction());
    yield put(asyncEndAction());
    return yield showFormattedAlert('success', deleteMessage.deleteSuccess);
  } catch (error) {
    yield put(asyncEndAction());
    return yield showFormattedAlert('error', deleteMessage.deleteError);
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
      const groupedPermissionByResource = _.groupBy(
        response.results,
        'resource',
      );
      return yield put(assignPermissionListAction(groupedPermissionByResource));
    }
    return yield put(asyncEndAction());
  } catch (error) {
    return yield put(asyncEndAction());
  }
}

export function* handleGetRoleById() {
  yield put(asyncStartAction());
  const id = yield select(makeUpdateIdSelector());
  const requestUrl = `/roles/${id}`;
  const payload = ApiEndpoint.makeApiPayload(requestUrl, GET);
  try {
    const response = yield call(request, payload);
    yield put(changeFieldAction('name', response.name));
    yield put(changeFieldAction('description', response.description));
    const permissions = response.permission.map((permission) => permission.id);
    yield put(changeFieldAction('permissions', permissions));
    return yield put(asyncEndAction());
  } catch (error) {
    return yield put(asyncEndAction());
  }
}

export default function* roleModuleSaga() {
  yield takeLatest(GET_ROLE_BY_ID, handleGetRoleById);
  yield takeLatest(SUBMIT_FORM, handleSubmitForm);
  yield takeLatest(VALIDATE_FORM, handleValidateForm);
  yield takeLatest(QUERY_ROLES, handleQueryRole);
  yield takeLatest(QUERY_PERMISSION_LIST, handleQueryPermission);
  yield takeLatest(DELETE_ITEM_BY_ID, handleDeleteItemById);
}
