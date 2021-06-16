import React from 'react';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import ApiEndpoint from 'utils/api';
import request from 'utils/request';
import { FormattedMessage } from 'react-intl';
import commonMessages from 'common/messages';
import messages from 'containers/LoginPage/messages';
import {
  makePasswordSelector,
  makeUsernameSelector,
} from 'containers/LoginPage/selectors';
import {
  ENTER_LOGIN,
  LOGIN_PROCESS,
  SUCCESS_REDIRECT,
  VALIDATE_FORM,
} from 'containers/LoginPage/constants';
import { checkError } from 'helpers/Validation';
import { getProfileAction } from 'containers/App/actions';
import { enqueueSnackbarAction } from 'containers/SnackBar/actions';
import { makeIsLoggedSelector } from 'containers/App/selectors';
import {
  asyncEnd,
  asyncStart,
  enterLoginAction,
  enterValidationErrorAction,
} from 'containers/LoginPage/actions';

export function* validateForm() {
  yield put(asyncStart());
  const email = yield select(makeUsernameSelector());
  const password = yield select(makePasswordSelector());
  const model = {
    email: {
      value: email,
      validator: ['isNotEmpty'],
    },
    password: {
      value: password,
      validator: ['isNotEmpty'],
    },
  };

  const err = checkError(model);
  if (Object.keys(err).length > 0) {
    return yield put(enterValidationErrorAction(err));
  }
  return yield put(enterLoginAction());
}

export function* attemptLogin() {
  yield put(asyncStart());
  const email = yield select(makeUsernameSelector());
  const password = yield select(makePasswordSelector());
  const requestURL = ApiEndpoint.getLoginPath();
  const requestPayload = ApiEndpoint.makeApiPayload('POST', {
    username: email,
    password,
  });
  try {
    const response = yield call(request, requestURL, requestPayload);
    if (response && response.error) {
      return yield put(enterValidationErrorAction(response.error));
    }
    yield put(asyncEnd());
    yield put(getProfileAction());
    return yield put(
      enqueueSnackbarAction({
        message: <FormattedMessage {...messages.loginSuccess} />,
        type: 'success',
        autoHide: true,
      }),
    );
  } catch (error) {
    yield put(asyncEnd());
    const errLabel = error.response
      ? error.response.statusText.toLowerCase()
      : '';
    const errorMessage = commonMessages[errLabel]
      ? commonMessages[errLabel]
      : commonMessages.serverError;
    return yield put(
      enqueueSnackbarAction({
        message: <FormattedMessage {...errorMessage} />,
        type: 'danger',
        autoHide: true,
      }),
    );
  }
}

export function* handleLogged() {
  const isLogged = yield select(makeIsLoggedSelector());
  if (isLogged) {
    yield put(push(SUCCESS_REDIRECT));
  }
}

export default function* loginPageSaga() {
  yield takeLatest(ENTER_LOGIN, handleLogged);
  yield takeLatest(VALIDATE_FORM, validateForm);
  yield takeLatest(LOGIN_PROCESS, attemptLogin);
}
