import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  DELETE_ITEM_BY_ID,
  GET_USER_BY_ID,
  QUERY_ROLES,
  QUERY_USERS,
  SUBMIT_FORM,
  VALIDATE_FORM,
} from 'containers/UserModule/constants';
import ApiEndpoint from 'utils/api';
import deleteMessage from 'components/DeleteModal/messages';
import commonMessage from 'common/messages';
import request from 'utils/request';
import {
  assignRolesListAction,
  assignUsersAction,
  asyncEndAction,
  asyncStartAction,
  changeFieldAction,
  clearFormAction,
  enterValidationErrorAction,
  queryUsersAction,
  submitFormAction,
} from 'containers/UserModule/actions';
import {
  makeEmailSelector,
  makeFormMethodSelector,
  makeKeywordsSelector,
  makeNameSelector,
  makePageNumberSelector,
  makePageSizeSelector,
  makeRoleIdSelector,
  makeStatusSelector,
  makeUpdateIdSelector,
  makeUserNameSelector,
} from 'containers/UserModule/selectors';
import { checkError } from 'helpers/Validation';
import { showFormattedAlert } from 'common/saga';
import { DELETE, GET, PUT } from 'utils/constants';

export function* handleSubmitForm() {
  const email = yield select(makeEmailSelector());
  const roleId = yield select(makeRoleIdSelector());
  const name = yield select(makeNameSelector());
  const username = yield select(makeUserNameSelector());
  const status = yield select(makeStatusSelector());
  const formMethod = yield select(makeFormMethodSelector());
  const id = yield select(makeUpdateIdSelector());
  const requestUrl = `/users${formMethod === PUT ? `/${id}` : ''}`;
  const payload = ApiEndpoint.makeApiPayload(requestUrl, formMethod, {
    email,
    roleId,
    name,
    username,
    status,
  });
  try {
    const response = yield call(request, payload);
    yield put(asyncEndAction());
    if (response && response.error) {
      return yield put(enterValidationErrorAction(response.error));
    }
    yield put(queryUsersAction());
    yield put(changeFieldAction('formPage', false));
    yield put(clearFormAction());
    const message =
      formMethod === PUT
        ? commonMessage.updateSuccess
        : commonMessage.addSuccess;
    return yield showFormattedAlert('success', message);
  } catch (error) {
    yield put(asyncEndAction());
    return yield showFormattedAlert('error', commonMessage.serverError);
  }
}

export function* handleValidateForm() {
  yield put(asyncStartAction());
  const email = yield select(makeEmailSelector());
  const roleId = yield select(makeRoleIdSelector());
  const name = yield select(makeNameSelector());
  const username = yield select(makeUserNameSelector());
  const status = yield select(makeStatusSelector());
  const model = {
    email: {
      value: email,
      validator: ['isEmail', 'isString', 'isNotEmpty'],
    },
    roleId: {
      value: roleId,
      key: 'role',
      validator: ['isInt', 'isNotEmpty'],
    },
    name: {
      value: name,
      validator: ['isString', 'isNotEmpty'],
    },
    username: {
      value: username,
      validator: ['isString', 'isNotEmpty'],
    },
    status: {
      value: status,
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
  const requestUrl = `/users/${data.id}`;
  const payload = ApiEndpoint.makeApiPayload(requestUrl, DELETE);
  try {
    yield call(request, payload);
    yield put(queryUsersAction());
    yield put(asyncEndAction());
    return yield showFormattedAlert('success', deleteMessage.deleteSuccess);
  } catch (error) {
    yield put(asyncEndAction());
    return yield showFormattedAlert('error', deleteMessage.deleteError);
  }
}

export function* handleQueryUsersList() {
  const pageNumber = yield select(makePageNumberSelector());
  const keywords = yield select(makeKeywordsSelector());
  const limit = yield select(makePageSizeSelector());
  const queryObj = {
    page: pageNumber > 0 ? pageNumber : 1,
    limit: limit > 0 ? limit : 10,
  };
  if (keywords && keywords.trim().length > 0) {
    queryObj.keywords = keywords;
  }
  const queryString = Object.keys(queryObj)
    .map((key) => `${key}=${queryObj[key]}`)
    .join('&');
  yield put(asyncStartAction());
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
  const id = yield select(makeUpdateIdSelector());
  const requestUrl = `/users/${id}`;
  const payload = ApiEndpoint.makeApiPayload(requestUrl, GET);
  try {
    const response = yield call(request, payload);
    yield put(changeFieldAction('name', response.name));
    yield put(changeFieldAction('email', response.email));
    yield put(changeFieldAction('username', response.username));
    yield put(changeFieldAction('status', response.status));
    yield put(
      changeFieldAction('roleId', response.role ? response.role.id : ''),
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

export default function* permissionModuleSaga() {
  yield takeLatest(QUERY_USERS, handleQueryUsersList);
  yield takeLatest(QUERY_ROLES, handleQueryRoles);
  yield takeLatest(GET_USER_BY_ID, handleGetUserById);
  yield takeLatest(SUBMIT_FORM, handleSubmitForm);
  yield takeLatest(VALIDATE_FORM, handleValidateForm);
  yield takeLatest(DELETE_ITEM_BY_ID, handleDeleteItemById);
}
