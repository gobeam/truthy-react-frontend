import { call, put, select, takeEvery } from 'redux-saga/effects';
import ApiEndpoint from 'utils/api';
import request from 'utils/request';
// import messages from 'containers/LoginPage/messages';
import { makeFormValuesSelector } from 'containers/LoginPage/selectors';
import { LOGIN_PROCESS } from 'containers/LoginPage/constants';
import { getProfileAction } from 'containers/App/actions';
import {
  asyncEndAction,
  asyncStartAction,
  enterValidationErrorAction,
} from 'containers/LoginPage/actions';
import { showAlert } from 'common/saga';
import { POST } from 'utils/constants';
import { clearSnackMessageAction } from 'containers/SnackMessage/actions';

export function* attemptLogin() {
  yield put(asyncStartAction());
  const formValues = yield select(makeFormValuesSelector());
  const requestUrl = ApiEndpoint.getLoginPath();
  const requestPayload = ApiEndpoint.makeApiPayload(
    requestUrl,
    POST,
    formValues,
  );
  try {
    yield call(request, requestPayload);
    yield put(asyncEndAction());
    yield put(clearSnackMessageAction());
    return yield put(getProfileAction());
    // return yield showFormattedAlert('success', messages.loginSuccess);
  } catch (error) {
    yield put(asyncEndAction());
    if (error.data && error.data.statusCode === 422) {
      return yield put(enterValidationErrorAction(error.data.message));
    }
    return yield showAlert('error', error.data.message);
  }
}

export default function* loginPageSaga() {
  yield takeEvery(LOGIN_PROCESS, attemptLogin);
}
