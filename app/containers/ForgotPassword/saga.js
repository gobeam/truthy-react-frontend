import { call, put, select, takeLatest } from 'redux-saga/effects';
import { FORGOT_PASSWORD } from 'containers/ForgotPassword/constants';
import { makeFormValuesSelector } from 'containers/ForgotPassword/selectors';
import ApiEndpoint from 'utils/api';
import request from 'utils/request';
import {
  asyncEndAction,
  asyncStartAction,
} from 'containers/ForgotPassword/actions';
import messages from 'containers/ForgotPassword/messages';
import { showAlert, showFormattedAlert } from 'common/saga';
import { PUT } from 'utils/constants';
import { enterValidationErrorAction } from 'containers/LoginPage/actions';

export function* handleForgotPassword() {
  yield put(asyncStartAction());
  const formValues = yield select(makeFormValuesSelector());
  const requestUrl = `/auth/forgot-password`;
  const requestPayload = ApiEndpoint.makeApiPayload(
    requestUrl,
    PUT,
    formValues,
  );
  try {
    yield call(request, requestPayload);
    yield put(asyncEndAction());
    return yield showFormattedAlert('success', messages.mailSent);
  } catch (error) {
    yield put(asyncEndAction());
    if (error.data && error.data.statusCode === 422) {
      return yield put(enterValidationErrorAction(error.data.message));
    }
    return yield showAlert('error', error.data.message);
  }
}

export default function* forgotPasswordSaga() {
  yield takeLatest(FORGOT_PASSWORD, handleForgotPassword);
}
