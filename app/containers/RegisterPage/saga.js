import { REGISTER_PROCESS } from 'containers/RegisterPage/constants';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  asyncEndAction,
  asyncStartAction,
  enterValidationErrorAction,
} from 'containers/RegisterPage/actions';
import { makeFormValuesSelector } from 'containers/RegisterPage/selectors';
import ApiEndpoint from 'utils/api';
import request from 'utils/request';
import messages from 'containers/RegisterPage/messages';
import { showAlert, showFormattedAlert } from 'common/saga';
import { POST } from 'utils/constants';

export function* handleRegister() {
  yield put(asyncStartAction());
  const formValues = yield select(makeFormValuesSelector());
  const requestUrl = ApiEndpoint.getRegisterPath();
  delete formValues.confirmPassword;
  delete formValues.accept;
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
    return yield showAlert('error', error.data.message);
  }
}

export default function* registerPageSaga() {
  yield takeLatest(REGISTER_PROCESS, handleRegister);
}
