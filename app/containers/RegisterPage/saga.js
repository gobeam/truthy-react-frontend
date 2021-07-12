import { REGISTER_PROCESS } from 'containers/RegisterPage/constants';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  asyncEndAction,
  enterValidationErrorAction,
} from 'containers/RegisterPage/actions';
import { makeFormValuesSelector } from 'containers/RegisterPage/selectors';
import ApiEndpoint from 'utils/api';
import request from 'utils/request';
import messages from 'containers/RegisterPage/messages';
import commonMessages from 'common/messages';
import { showFormattedAlert } from 'common/saga';
import { POST } from 'utils/constants';

export function* handleRegister() {
  const formValues = yield select(makeFormValuesSelector());
  const requestUrl = ApiEndpoint.getRegisterPath();
  const requestPayload = ApiEndpoint.makeApiPayload(
    requestUrl,
    POST,
    formValues,
  );

  try {
    const response = yield call(request, requestPayload);
    if (response && response.error) {
      return yield put(enterValidationErrorAction(response.error));
    }
    yield put(asyncEndAction());
    return yield showFormattedAlert('success', messages.registerSuccess);
  } catch (error) {
    yield put(asyncEndAction());
    if (error.data && error.data.statusCode === 422) {
      return yield put(enterValidationErrorAction(error.data.message));
    }
    return yield showFormattedAlert('error', commonMessages.serverError);
  }
}

export default function* registerPageSaga() {
  yield takeLatest(REGISTER_PROCESS, handleRegister);
}
