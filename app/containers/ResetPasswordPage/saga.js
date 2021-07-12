import { call, put, select, takeLatest } from 'redux-saga/effects';
import { RESET_PASSWORD } from 'containers/ResetPasswordPage/constants';
import {
  makeCodeSelector,
  makeFormValuesSelector,
} from 'containers/ResetPasswordPage/selectors';
import ApiEndpoint from 'utils/api';
import request from 'utils/request';
import {
  asyncEndAction,
  asyncStartAction,
  enterValidationErrorAction,
} from 'containers/ResetPasswordPage/actions';
import commonMessages from 'common/messages';
import messages from 'containers/ResetPasswordPage/messages';
import { showFormattedAlert } from 'common/saga';
import { PUT } from 'utils/constants';

export function* handleResetPassword() {
  yield put(asyncStartAction());
  const formValues = yield select(makeFormValuesSelector());
  const code = yield select(makeCodeSelector());
  const requestUrl = `/auth/reset-password`;
  const requestPayload = ApiEndpoint.makeApiPayload(requestUrl, PUT, {
    ...formValues,
    token: code,
  });
  try {
    const response = yield call(request, requestPayload);
    if (response && response.error) {
      yield put(asyncEndAction());
      if (typeof response.error === 'object') {
        return yield put(enterValidationErrorAction(response.error));
      }
    }
    yield showFormattedAlert('success', messages.resetSuccess);
    return yield put(asyncEndAction());
  } catch (error) {
    yield put(asyncEndAction());
    if (error.data && error.data.statusCode === 422) {
      return yield put(enterValidationErrorAction(error.data.message));
    }
    return yield showFormattedAlert('error', commonMessages.serverError);
  }
}

export default function* homePageSaga() {
  yield takeLatest(RESET_PASSWORD, handleResetPassword);
}
