import { call, put, select, takeLatest } from 'redux-saga/effects';
import { VERIFY_VERIFY_CODE } from 'containers/VerifyAccountPage/constants';
import { makeVerifyCodeSelector } from 'containers/VerifyAccountPage/selectors';
import ApiEndpoint from 'utils/api';
import request from 'utils/request';
import messages from 'containers/VerifyAccountPage/messages';
import { push } from 'connected-react-router';
import { LOGIN_REDIRECT } from 'containers/LoginPage/constants';
import { showFormattedErrorMessage } from 'common/saga';

export function* handleVerifyCode() {
  const code = yield select(makeVerifyCodeSelector());
  const requestPayload = ApiEndpoint.makeApiPayload('get');
  const requestURL = `${ApiEndpoint.getBasePath()}/auth/activate-account?token=${code}`;
  try {
    yield call(request, requestURL, requestPayload);
    yield showFormattedErrorMessage('success', messages.activated);
    return yield put(push(LOGIN_REDIRECT));
  } catch (e) {
    yield showFormattedErrorMessage('danger', messages.invalidVerification);
    return yield put(push(LOGIN_REDIRECT));
  }
}

export default function* homePageSaga() {
  yield takeLatest(VERIFY_VERIFY_CODE, handleVerifyCode);
}
