import { REGISTER_PROCESS } from 'containers/RegisterPage/constants';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  asyncEnd,
  enterValidationErrorAction,
  registerErrorAction,
} from 'containers/RegisterPage/actions';
import {
  makeEmailSelector,
  makeNameSelector,
  makePasswordSelector,
  makeUsernameSelector,
} from 'containers/RegisterPage/selectors';
import ApiEndpoint from 'utils/api';
import request from 'utils/request';
import messages from 'containers/RegisterPage/messages';
import commonMessages from 'common/messages';
import { showFormattedAlert } from 'common/saga';
import { POST } from 'utils/constants';

export function* handleRegister() {
  const email = yield select(makeEmailSelector());
  const username = yield select(makeUsernameSelector());
  const password = yield select(makePasswordSelector());
  const name = yield select(makeNameSelector());
  const requestUrl = ApiEndpoint.getRegisterPath();
  const requestPayload = ApiEndpoint.makeApiPayload(requestUrl, POST, {
    name,
    username,
    email,
    password,
  });

  try {
    const response = yield call(request, requestPayload);
    if (response && response.error) {
      return yield put(enterValidationErrorAction(response.error));
    }
    yield put(asyncEnd());
    return yield showFormattedAlert('success', messages.registerSuccess);
  } catch (error) {
    yield put(asyncEnd());
    yield put(registerErrorAction('There was some error'));
    const errLabel = error.response
      ? error.response.statusText.toLowerCase()
      : '';
    const errorMessage = commonMessages[errLabel]
      ? commonMessages[errLabel]
      : commonMessages.serverError;
    return yield showFormattedAlert('error', errorMessage);
  }
}

export default function* registerPageSaga() {
  yield takeLatest(REGISTER_PROCESS, handleRegister);
}
