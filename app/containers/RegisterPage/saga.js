import React from 'react';
import {
  ENTER_LOGIN,
  REGISTER_PROCESS,
  VALIDATE_FORM,
} from 'containers/RegisterPage/constants';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  asyncEnd,
  asyncStart,
  enterRegisterAction,
  enterValidationErrorAction,
  registerErrorAction,
} from 'containers/RegisterPage/actions';
import { checkError } from 'helpers/Validation';
import {
  makeAcceptSelector,
  makeConfirmPasswordSelector,
  makeEmailSelector,
  makeNameSelector,
  makePasswordSelector,
  makeUsernameSelector,
} from 'containers/RegisterPage/selectors';
import ApiEndpoint from 'utils/api';
import request from 'utils/request';
import { push } from 'connected-react-router';
import { enqueueSnackbarAction } from 'containers/SnackBar/actions';
import { SUCCESS_REDIRECT } from 'containers/LoginPage/constants';
import { makeIsLoggedSelector } from 'containers/App/selectors';
import { FormattedMessage } from 'react-intl';
import messages from 'containers/RegisterPage/messages';
import commonMessages from 'common/messages';

export function* validateForm() {
  yield put(asyncStart());
  const email = yield select(makeEmailSelector());
  const password = yield select(makePasswordSelector());
  const confirmPassword = yield select(makeConfirmPasswordSelector());
  const name = yield select(makeNameSelector());
  const username = yield select(makeUsernameSelector());
  const accept = yield select(makeAcceptSelector());
  const model = {
    email: {
      value: email,
      validator: ['isEmail', 'isNotEmpty'],
    },
    name: {
      value: name,
      validator: ['isNotEmpty'],
    },
    password: {
      value: password,
      validator: ['isNotEmpty'],
    },
    username: {
      value: username,
      validator: ['isNotEmpty'],
    },
    confirmPassword: {
      value: confirmPassword,
      validator: ['isNotEmpty'],
    },
    accept: {
      value: accept,
      validator: ['isTrue'],
    },
  };

  const err = checkError(model);
  if (Object.keys(err).length > 0) {
    return yield put(enterValidationErrorAction(err));
  }
  if (password !== confirmPassword) {
    return yield put(
      enterValidationErrorAction({
        confirmPassword: 'confirmPasswordNotSimilar',
      }),
    );
  }
  return yield put(enterRegisterAction());
}

export function* handleRegister() {
  const api = new ApiEndpoint();
  const email = yield select(makeEmailSelector());
  const username = yield select(makeUsernameSelector());
  const password = yield select(makePasswordSelector());
  const name = yield select(makeNameSelector());
  const requestURL = api.getRegisterPath();
  const requestPayload = api.makeApiPayload('POST', null, {
    name,
    username,
    email,
    password,
  });

  try {
    const response = yield call(request, requestURL, requestPayload);
    if (response.error) {
      return yield put(enterValidationErrorAction(response.error));
    }
    yield put(asyncEnd());
    yield put(
      enqueueSnackbarAction({
        message: <FormattedMessage {...messages.registerSuccess} />,
        type: 'success',
      }),
    );
    return yield put(push('/login'));
  } catch (e) {
    yield put(registerErrorAction('There was some error'));
    return yield put(
      enqueueSnackbarAction({
        message: <FormattedMessage {...commonMessages.internalError} />,
        type: 'error',
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
  return true;
}

export default function* registerPageSaga() {
  yield takeLatest(VALIDATE_FORM, validateForm);
  yield takeLatest(REGISTER_PROCESS, handleRegister);
  yield takeLatest(ENTER_LOGIN, handleLogged);
}
