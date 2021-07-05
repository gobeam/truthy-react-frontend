import { call, put, select, takeLatest } from 'redux-saga/effects';
import ApiEndpoint from 'utils/api';
import request from 'utils/request';
import messages from 'containers/LoginPage/messages';
import {
  makePasswordSelector,
  makeUsernameSelector,
} from 'containers/LoginPage/selectors';
import { LOGIN_PROCESS } from 'containers/LoginPage/constants';
import { getProfileAction } from 'containers/App/actions';
import {
  asyncEnd,
  asyncStart,
  enterValidationErrorAction,
} from 'containers/LoginPage/actions';
import { showAlert, showFormattedAlert } from 'common/saga';
import { POST } from 'utils/constants';
import { clearSnackMessageAction } from 'containers/SnackMessage/actions';

export function* attemptLogin() {
  yield put(asyncStart());
  const email = yield select(makeUsernameSelector());
  const password = yield select(makePasswordSelector());
  const requestUrl = ApiEndpoint.getLoginPath();
  const requestPayload = ApiEndpoint.makeApiPayload(requestUrl, POST, {
    username: email,
    password,
  });
  try {
    const response = yield call(request, requestPayload);
    yield put(asyncEnd());
    if (response.statusCode === 429) {
      return yield showAlert('error', response.message);
    }
    if (response.statusCode === 422) {
      return yield put(enterValidationErrorAction(response.error));
    }
    yield put(clearSnackMessageAction());
    yield put(getProfileAction());
    return yield showFormattedAlert('success', messages.loginSuccess);
  } catch (error) {
    yield put(asyncEnd());
    return yield showAlert(
      'error',
      error.response.data ? error.response.data.message : 'Internal error',
    );
  }
}

export default function* loginPageSaga() {
  // yield takeLatest(ENTER_LOGIN, handleLogged);
  yield takeLatest(LOGIN_PROCESS, attemptLogin);
}
