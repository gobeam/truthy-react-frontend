import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  DELETE_ITEM_BY_ID,
  GET_TEMPLATE_BY_ID,
  QUERY_TEMPLATE,
  SUBMIT_FORM,
  VALIDATE_FORM,
} from 'containers/EmailTemplateModule/constants';
import ApiEndpoint from 'utils/api';
import deleteMessage from 'components/DeleteModal/messages';
import commonMessage from 'common/messages';
import request from 'utils/request';
import {
  assignTemplatesAction,
  asyncEndAction,
  asyncStartAction,
  changeFieldAction,
  clearFormAction,
  enterValidationErrorAction,
  queryTemplateAction,
  submitFormAction,
} from 'containers/EmailTemplateModule/actions';
import {
  makeFormMethodSelector,
  makeKeywordsSelector,
  makeLimitSelector,
  makePageNumberSelector,
  makeSenderSelector,
  makeSubjectSelector,
  makeTemplateEditedBodySelector,
  makeTemplateTitleSelector,
  makeUpdateIdSelector,
} from 'containers/EmailTemplateModule/selectors';
import { checkError } from 'helpers/Validation';
import { showFormattedErrorMessage } from 'common/saga';

function* getFormPayload() {
  const title = yield select(makeTemplateTitleSelector());
  const body = yield select(makeTemplateEditedBodySelector());
  const sender = yield select(makeSenderSelector());
  const subject = yield select(makeSubjectSelector());
  return {
    title,
    body,
    sender,
    subject,
  };
}

export function* handleSubmitForm() {
  const { title, body, sender, subject } = yield getFormPayload();
  const formMethod = yield select(makeFormMethodSelector());
  const id = yield select(makeUpdateIdSelector());
  const requestURL = `${ApiEndpoint.getBasePath()}/email-templates${
    formMethod === 'put' ? `/${id}` : ''
  }`;
  const payload = ApiEndpoint.makeApiPayload(formMethod.toUpperCase(), {
    title,
    body,
    sender,
    subject,
  });
  try {
    const response = yield call(request, requestURL, payload);
    yield put(asyncEndAction());
    if (response && response.error) {
      return yield put(enterValidationErrorAction(response.error));
    }
    yield put(queryTemplateAction());
    yield put(changeFieldAction('formPage', false));
    yield put(clearFormAction());
    const message =
      formMethod === 'put'
        ? commonMessage.updateSuccess
        : commonMessage.addSuccess;
    return yield showFormattedErrorMessage('success', message);
  } catch (error) {
    yield put(asyncEndAction());
    return yield showFormattedErrorMessage('danger', commonMessage.serverError);
  }
}

export function* handleValidateForm() {
  yield put(asyncStartAction());
  const { title, body, sender, subject } = yield getFormPayload();
  const model = {
    title: {
      value: title,
      validator: ['isString', 'isNotEmpty'],
    },
    body: {
      value: body,
      validator: ['isString', 'isNotEmpty'],
    },
    sender: {
      value: sender,
      validator: ['isEmail', 'isNotEmpty'],
    },
    subject: {
      value: subject,
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
  const requestURL = `${ApiEndpoint.getBasePath()}/email-templates/${data.id}`;
  const payload = ApiEndpoint.makeApiPayload('DELETE');
  try {
    yield call(request, requestURL, payload);
    yield put(queryTemplateAction());
    yield put(asyncEndAction());
    return yield showFormattedErrorMessage(
      'success',
      deleteMessage.deleteSuccess,
    );
  } catch (error) {
    yield put(asyncEndAction());
    return yield showFormattedErrorMessage('danger', deleteMessage.deleteError);
  }
}

export function* handleQueryTemplate() {
  const pageNumber = yield select(makePageNumberSelector());
  const keywords = yield select(makeKeywordsSelector());
  const limit = yield select(makeLimitSelector());
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
  const requestURL = `${ApiEndpoint.getBasePath()}/email-templates?${queryString}`;
  const payload = ApiEndpoint.makeApiPayload('GET');
  try {
    const response = yield call(request, requestURL, payload);
    return yield put(assignTemplatesAction(response));
  } catch (error) {
    return yield put(asyncEndAction());
  }
}

export function* handleGetTemplateById() {
  yield put(asyncStartAction());
  const id = yield select(makeUpdateIdSelector());
  const requestURL = `${ApiEndpoint.getBasePath()}/email-templates/${id}`;
  const payload = ApiEndpoint.makeApiPayload('GET');
  try {
    const response = yield call(request, requestURL, payload);
    const fields = ['title', 'body', 'sender', 'subject'];
    // eslint-disable-next-line no-restricted-syntax
    for (const field of fields) {
      yield put(changeFieldAction(field, response[field]));
    }
    return yield put(asyncEndAction());
  } catch (error) {
    return yield put(asyncEndAction());
  }
}

export default function* permissionModuleSaga() {
  yield takeLatest(QUERY_TEMPLATE, handleQueryTemplate);
  yield takeLatest(GET_TEMPLATE_BY_ID, handleGetTemplateById);
  yield takeLatest(SUBMIT_FORM, handleSubmitForm);
  yield takeLatest(VALIDATE_FORM, handleValidateForm);
  yield takeLatest(DELETE_ITEM_BY_ID, handleDeleteItemById);
}
