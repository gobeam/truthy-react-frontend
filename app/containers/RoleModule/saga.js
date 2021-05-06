import { call, takeLatest, put, select } from 'redux-saga/effects';
import {
  DELETE_ITEM_BY_ID,
  GET_ROLE_BY_ID,
  QUERY_PERMISSION_LIST,
  QUERY_ROLES,
  SUBMIT_FORM,
  VALIDATE_FORM,
} from 'containers/RoleModule/constants';
import ApiEndpoint from 'utils/api';
import AuthService from 'services/auth.service';
import deleteMessage from 'components/DeleteModal/messages';
import commonMessage from 'common/messages';
import request from 'utils/request';
import _ from 'lodash';
import {
  assignPermissionListAction,
  assignRolesAction,
  asyncEndAction,
  asyncStartAction,
  submitFormAction,
  enterValidationErrorAction,
  queryRolesAction,
  clearFormAction,
  changeFieldAction,
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
import { enqueueSnackbarAction } from 'containers/SnackBar/actions';
import { FormattedMessage } from 'react-intl';
import React from 'react';
import { checkError } from 'helpers/Validation';

export function* handleSubmitForm() {
  const name = yield select(makeNameSelector());
  const description = yield select(makeDescriptionSelector());
  const permissions = yield select(makePermissionsSelector());
  const method = yield select(makeFormMethodSelector());
  const id = yield select(makeUpdateIdSelector());
  const api = new ApiEndpoint();
  const auth = new AuthService();
  const token = auth.getToken();
  const requestURL = `${api.getBasePath()}/roles${
    method === 'put' ? `/${id}` : ''
  }`;
  const payload = api.makeApiPayload(method.toUpperCase(), token, {
    name,
    description,
    permissions,
  });
  try {
    const response = yield call(request, requestURL, payload);
    yield put(asyncEndAction());
    if (response && response.error) {
      return yield put(enterValidationErrorAction(response.error));
    }
    yield put(queryRolesAction());
    yield put(changeFieldAction('formPage', false));
    yield put(clearFormAction());
    const message =
      method === 'put' ? commonMessage.updateSuccess : commonMessage.addSuccess;
    return yield put(
      enqueueSnackbarAction({
        message: <FormattedMessage {...message} />,
        type: 'success',
        autoHide: true,
      }),
    );
  } catch (error) {
    yield put(asyncEndAction());
    return yield put(
      enqueueSnackbarAction({
        message: <FormattedMessage {...commonMessage.serverError} />,
        type: 'danger',
        autoHide: true,
      }),
    );
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
  const api = new ApiEndpoint();
  const auth = new AuthService();
  const token = auth.getToken();
  const requestURL = `${api.getBasePath()}/roles/${data.id}`;
  const payload = api.makeApiPayload('DELETE', token);
  try {
    yield call(request, requestURL, payload);
    yield put(queryRolesAction());
    yield put(asyncEndAction());
    return yield put(
      enqueueSnackbarAction({
        message: <FormattedMessage {...deleteMessage.deleteSuccess} />,
        type: 'success',
        autoHide: true,
      }),
    );
  } catch (error) {
    yield put(asyncEndAction());
    return yield put(
      enqueueSnackbarAction({
        message: <FormattedMessage {...deleteMessage.deleteError} />,
        type: 'danger',
        autoHide: true,
      }),
    );
  }
}

export function* handleQueryRole() {
  yield put(asyncStartAction());
  const api = new ApiEndpoint();
  const auth = new AuthService();
  const token = auth.getToken();
  const pageNumber = yield select(makePageNumberSelector());
  const limit = yield select(makeLimitSelector());
  const keywords = yield select(makeKeywordsSelector());
  const queryObject = {
    page: pageNumber > 0 ? pageNumber : 1,
    limit: limit > 0 ? limit : 10,
  };
  if (keywords && keywords.trim().length > 0) {
    queryObject.keywords = keywords;
  }
  const queryString = Object.keys(queryObject)
    .map((key) => `${key}=${queryObject[key]}`)
    .join('&');
  const requestURL = `${api.getBasePath()}/roles?${queryString}`;
  const payload = api.makeApiPayload('GET', token);
  try {
    const response = yield call(request, requestURL, payload);
    return yield put(assignRolesAction(response));
  } catch (error) {
    return yield put(asyncEndAction());
  }
}

export function* handleQueryPermission() {
  yield put(asyncStartAction());
  const api = new ApiEndpoint();
  const auth = new AuthService();
  const token = auth.getToken();
  const requestURL = `${api.getBasePath()}/permissions?limit=300`;
  const payload = api.makeApiPayload('GET', token);
  try {
    const response = yield call(request, requestURL, payload);
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
  const api = new ApiEndpoint();
  const auth = new AuthService();
  const token = auth.getToken();
  const id = yield select(makeUpdateIdSelector());
  const requestURL = `${api.getBasePath()}/roles/${id}`;
  const payload = api.makeApiPayload('GET', token);
  try {
    const response = yield call(request, requestURL, payload);
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
