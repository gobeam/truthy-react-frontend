import { call, select, takeLatest } from 'redux-saga/effects';
import { VERIFY_VERIFY_CODE } from 'containers/VerifyAccount/constants';
import { makeVerifyCodeSelector } from 'containers/VerifyAccount/selectors';
import ApiEndpoint from 'utils/api';
import request from 'utils/request';
import messages from 'containers/VerifyAccount/messages';
import { showFormattedAlert } from 'common/saga';
import { GET } from 'utils/constants';

export function* handleVerifyCode() {
  const code = yield select(makeVerifyCodeSelector());
  const requestUrl = `/auth/activate-account?token=${code}`;
  const requestPayload = ApiEndpoint.makeApiPayload(requestUrl, GET);
  try {
    yield call(request, requestPayload);
    return yield showFormattedAlert('success', messages.activated);
    // return yield put(push(LOGIN_REDIRECT));
  } catch (e) {
    return yield showFormattedAlert('error', messages.invalidVerification);
    // return yield put(push(LOGIN_REDIRECT));
  }
}

export default function* homePageSaga() {
  yield takeLatest(VERIFY_VERIFY_CODE, handleVerifyCode);
}
