import { call, put, select, takeLatest } from 'redux-saga/effects';
import { FORGOT_PASSWORD } from 'containers/ForgotPassword/constants';
import { makeEmailSelector } from 'containers/ForgotPassword/selectors';
import ApiEndpoint from 'utils/api';
import request from 'utils/request';
import { changeFieldAction } from 'containers/ForgotPassword/actions';
import messages from 'containers/ForgotPassword/messages';
import { showFormattedAlert } from 'common/saga';
import { PUT } from 'utils/constants';

export function* handleForgotPassword() {
  yield put(changeFieldAction('isLoading', true));
  const email = yield select(makeEmailSelector());
  const requestUrl = `/auth/forgot-password`;
  const requestPayload = ApiEndpoint.makeApiPayload(requestUrl, PUT, {
    email,
  });
  try {
    yield call(request, requestPayload);
    yield put(changeFieldAction('isLoading', false));
    return yield showFormattedAlert('success', messages.mailSent);
  } catch (e) {
    yield put(changeFieldAction('isLoading', false));
    return yield showFormattedAlert('error', messages.mailSentError);
  }
}

export default function* homePageSaga() {
  yield takeLatest(FORGOT_PASSWORD, handleForgotPassword);
}
