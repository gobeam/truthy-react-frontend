import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  FORGOT_PASSWORD,
  VALIDATE_FORM,
} from 'containers/ForgotPassword/constants';
import { makeEmailSelector } from 'containers/ForgotPassword/selectors';
import ApiEndpoint from 'utils/api';
import request from 'utils/request';
import {
  changeFieldAction,
  enterValidationErrorAction,
  forgotPasswordAction,
} from 'containers/ForgotPassword/actions';
import { checkError } from 'helpers/Validation';
import messages from 'containers/ForgotPassword/messages';
import { showFormattedErrorMessage } from 'common/saga';

export function* validateForm() {
  const email = yield select(makeEmailSelector());
  const model = {
    email: {
      value: email,
      validator: ['isEmail', 'isNotEmpty'],
    },
  };

  const err = checkError(model);
  if (Object.keys(err).length > 0) {
    return yield put(enterValidationErrorAction(err));
  }
  return yield put(forgotPasswordAction());
}

export function* handleForgotPassword() {
  yield put(changeFieldAction('isLoading', true));
  const email = yield select(makeEmailSelector());
  const requestPayload = ApiEndpoint.makeApiPayload('put', { email });
  const requestURL = `${ApiEndpoint.getBasePath()}/auth/forgot-password`;
  try {
    yield call(request, requestURL, requestPayload);
    yield put(changeFieldAction('isLoading', false));
    return yield showFormattedErrorMessage('success', messages.mailSent);
  } catch (e) {
    yield put(changeFieldAction('isLoading', false));
    return yield showFormattedErrorMessage('danger', messages.mailSentError);
  }
}

export default function* homePageSaga() {
  yield takeLatest(VALIDATE_FORM, validateForm);
  yield takeLatest(FORGOT_PASSWORD, handleForgotPassword);
}
