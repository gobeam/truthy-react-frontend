import { call, put, select, takeLatest } from 'redux-saga/effects';
import { VERIFY_VERIFY_CODE } from 'containers/AuthRedirectPage/constants';
import { makeVerifyCodeSelector } from 'containers/AuthRedirectPage/selectors';
import ApiEndpoint from 'utils/api';
import request from 'utils/request';
import { enqueueSnackbarAction } from 'containers/SnackBar/actions';
import { push } from 'connected-react-router';
import { LOGIN_REDIRECT } from 'containers/LoginPage/constants';

export function* handleVerifyCode() {
  const code = yield select(makeVerifyCodeSelector());
  const api = new ApiEndpoint();
  const requestPayload = api.makeApiPayload('get');
  const requestURL = `${api.getBasePath()}/verify/${code}`;
  try {
    yield call(request, requestURL, requestPayload);
    yield put(
      enqueueSnackbarAction({
        message: 'Account activated successfully',
        type: 'success',
      }),
    );
    yield put(push(LOGIN_REDIRECT));
  } catch (e) {
    yield put(
      enqueueSnackbarAction({
        message: 'Invalid verification code',
        type: 'error',
      }),
    );
    yield put(push(LOGIN_REDIRECT));
  }
}

export default function* homePageSaga() {
  yield takeLatest(VERIFY_VERIFY_CODE, handleVerifyCode);
}
