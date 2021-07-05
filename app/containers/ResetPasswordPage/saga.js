import { call, put, select, takeLatest } from 'redux-saga/effects';
import { RESET_PASSWORD } from 'containers/ResetPasswordPage/constants';
import {
  makeCodeSelector,
  makeConfirmPasswordSelector,
  makePasswordSelector,
} from 'containers/ResetPasswordPage/selectors';
import ApiEndpoint from 'utils/api';
import request from 'utils/request';
import {
  asyncEnd,
  asyncStart,
  enterValidationErrorAction,
} from 'containers/ResetPasswordPage/actions';
import commonMessages from 'common/messages';
import messages from 'containers/ResetPasswordPage/messages';
import { showFormattedAlert } from 'common/saga';
import { PUT } from 'utils/constants';

export function* handleResetPassword() {
  yield put(asyncStart());
  const password = yield select(makePasswordSelector());
  const confirmPassword = yield select(makeConfirmPasswordSelector());
  const code = yield select(makeCodeSelector());
  const requestUrl = `/auth/reset-password`;
  const requestPayload = ApiEndpoint.makeApiPayload(requestUrl, PUT, {
    password,
    token: code,
    confirmPassword,
  });
  try {
    const response = yield call(request, requestPayload);
    if (response && response.error) {
      yield put(asyncEnd());
      if (typeof response.error === 'object') {
        return yield put(enterValidationErrorAction(response.error));
      }
    }
    yield showFormattedAlert('success', messages.resetSuccess);
    return yield put(asyncEnd());
    // return yield put(push(LOGIN_REDIRECT));
  } catch (error) {
    yield put(asyncEnd());
    const errLabel = error.response
      ? error.response.statusText.toLowerCase()
      : '';
    const errorMessage = commonMessages[errLabel]
      ? commonMessages[errLabel]
      : commonMessages.serverError;
    return yield showFormattedAlert('error', errorMessage);
  }
}

export default function* homePageSaga() {
  yield takeLatest(RESET_PASSWORD, handleResetPassword);
}
