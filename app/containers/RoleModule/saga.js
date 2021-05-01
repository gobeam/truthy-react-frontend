import { call, takeLatest, put, select } from 'redux-saga/effects';
import {
  DELETE_ITEM_BY_ID,
  QUERY_ROLES,
} from 'containers/RoleModule/constants';
import ApiEndpoint from 'utils/api';
import AuthService from 'services/auth.service';
import deleteMessage from 'components/DeleteModal/messages';
import request from 'utils/request';
import {
  assignRolesAction,
  queryRolesAction,
} from 'containers/RoleModule/actions';
import { makePageNumberSelector } from 'containers/RoleModule/selectors';
import { enqueueSnackbarAction } from 'containers/SnackBar/actions';
import { FormattedMessage } from 'react-intl';
import React from 'react';

export function* handleDeleteItemById({ id }) {
  const api = new ApiEndpoint();
  const auth = new AuthService();
  const token = auth.getToken();
  const requestURL = `${api.getBasePath()}/roles/${id}`;
  const payload = api.makeApiPayload('DELETE', token);
  try {
    yield call(request, requestURL, payload);
    yield put(queryRolesAction());
    return yield put(
      enqueueSnackbarAction({
        message: <FormattedMessage {...deleteMessage.deleteSuccess} />,
        type: 'success',
        autoHide: true,
      }),
    );
  } catch (error) {
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
  const api = new ApiEndpoint();
  const auth = new AuthService();
  const token = auth.getToken();
  const pageNumber = yield select(makePageNumberSelector());
  const requestURL = `${api.getBasePath()}/roles?page=${
    pageNumber > 0 ? pageNumber : 1
  }`;
  const payload = api.makeApiPayload('GET', token);
  try {
    const response = yield call(request, requestURL, payload);
    return yield put(assignRolesAction(response));
  } catch (error) {
    return false;
  }
}

export default function* roleModuleSaga() {
  yield takeLatest(QUERY_ROLES, handleQueryRole);
  yield takeLatest(DELETE_ITEM_BY_ID, handleDeleteItemById);
}
