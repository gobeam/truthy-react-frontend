import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  DELETE_ITEM_BY_ID,
  GET_TEMPLATE_BY_ID,
  QUERY_TEMPLATE,
  SUBMIT_FORM,
} from 'containers/EmailTemplate/constants';
import ApiEndpoint from 'utils/api';
import commonMessage from 'common/messages';
import request from 'utils/request';
import {
  assignTemplatesAction,
  asyncEndAction,
  asyncStartAction,
  enterValidationErrorAction,
  initiateCleanAction,
  queryTemplateAction,
  setInitialValuesAction,
} from 'containers/EmailTemplate/actions';
import {
  makeFormMethodSelector,
  makeFormValuesSelector,
  makeKeywordsSelector,
  makeLimitSelector,
  makePageNumberSelector,
  makeUpdateIdSelector,
} from 'containers/EmailTemplate/selectors';
import { showAlert, showFormattedAlert } from 'common/saga';
import { DELETE, GET, PUT } from 'utils/constants';
import { buildQueryString } from 'common/helpers';

export function* handleSubmitForm() {
  yield put(asyncEndAction());
  const data = yield select(makeFormValuesSelector());
  const formMethod = yield select(makeFormMethodSelector());
  const id = yield select(makeUpdateIdSelector());
  const requestUrl = `/email-templates${formMethod === PUT ? `/${id}` : ''}`;
  const payload = ApiEndpoint.makeApiPayload(requestUrl, formMethod, data);
  try {
    yield call(request, payload);
    yield put(queryTemplateAction());
    yield put(initiateCleanAction());
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
  const requestUrl = `/email-templates/${data.id}`;
  const payload = ApiEndpoint.makeApiPayload(requestUrl, DELETE);
  try {
    yield call(request, payload);
    yield put(queryTemplateAction());
    yield put(asyncEndAction());
    return yield showFormattedAlert('success', commonMessage.deleteSuccess);
  } catch (error) {
    yield put(asyncEndAction());
    return yield showFormattedAlert('error', commonMessage.deleteError);
  }
}

export function* handleQueryTemplate() {
  yield put(asyncStartAction());
  const pageNumber = yield select(makePageNumberSelector());
  const keywords = yield select(makeKeywordsSelector());
  const limit = yield select(makeLimitSelector());
  const queryString = buildQueryString(keywords, pageNumber, limit);
  const requestUrl = `/email-templates?${queryString}`;
  const payload = ApiEndpoint.makeApiPayload(requestUrl, GET);
  try {
    const response = yield call(request, payload);
    return yield put(assignTemplatesAction(response));
  } catch (error) {
    return yield put(asyncEndAction());
  }
}

export function* handleGetTemplateById() {
  yield put(asyncStartAction());
  const id = yield select(makeUpdateIdSelector());
  const requestUrl = `/email-templates/${id}`;
  const payload = ApiEndpoint.makeApiPayload(requestUrl, GET);
  try {
    const response = yield call(request, payload);
    yield put(setInitialValuesAction(response));
    return yield put(asyncEndAction());
  } catch (error) {
    return yield put(asyncEndAction());
  }
}

export default function* PermissionSaga() {
  yield takeLatest(QUERY_TEMPLATE, handleQueryTemplate);
  yield takeLatest(GET_TEMPLATE_BY_ID, handleGetTemplateById);
  yield takeLatest(SUBMIT_FORM, handleSubmitForm);
  yield takeLatest(DELETE_ITEM_BY_ID, handleDeleteItemById);
}
