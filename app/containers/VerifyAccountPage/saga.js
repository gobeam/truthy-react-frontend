import { call, put, select, takeLatest } from 'redux-saga/effects';
import { VERIFY_VERIFY_CODE } from 'containers/VerifyAccountPage/constants';
import { makeVerifyCodeSelector } from 'containers/VerifyAccountPage/selectors';
import ApiEndpoint from 'utils/api';
import request from 'utils/request';
import messages from 'containers/VerifyAccountPage/messages';
import { enqueueSnackbarAction } from 'containers/SnackBar/actions';
import { push } from 'connected-react-router';
import { LOGIN_REDIRECT } from 'containers/LoginPage/constants';
import { FormattedMessage } from 'react-intl';
import React from 'react';

export function* handleVerifyCode() {
  const code = yield select(makeVerifyCodeSelector());
  const requestPayload = ApiEndpoint.makeApiPayload('get');
  const requestURL = `${ApiEndpoint.getBasePath()}/auth/activate-account?token=${code}`;
  try {
    yield call(request, requestURL, requestPayload);
    yield put(
      enqueueSnackbarAction({
        message: <FormattedMessage {...messages.activated} />,
        type: 'success',
        autoHide: true,
      }),
    );
    return yield put(push(LOGIN_REDIRECT));
  } catch (e) {
    yield put(
      enqueueSnackbarAction({
        message: <FormattedMessage {...messages.invalidVerification} />,
        type: 'danger',
        autoHide: true,
      }),
    );
    return yield put(push(LOGIN_REDIRECT));
  }
}

export default function* homePageSaga() {
  yield takeLatest(VERIFY_VERIFY_CODE, handleVerifyCode);
}
