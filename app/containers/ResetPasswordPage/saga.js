import React from 'react';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  RESET_PASSWORD,
  VALIDATE_FORM,
} from 'containers/ResetPasswordPage/constants';
import {
  makeCodeSelector,
  makeConfirmPasswordSelector,
  makePasswordSelector,
} from 'containers/ResetPasswordPage/selectors';
import ApiEndpoint from 'utils/api';
import request from 'utils/request';
import { enqueueSnackbarAction } from 'containers/SnackBar/actions';
import {
  asyncEnd,
  enterValidationErrorAction,
  resetPasswordAction,
} from 'containers/ResetPasswordPage/actions';
import { checkError } from 'helpers/Validation';
import { push } from 'connected-react-router';
import { LOGIN_REDIRECT } from 'containers/LoginPage/constants';
import commonMessages from 'common/messages';
import messages from 'containers/ResetPasswordPage/messages';
import { FormattedMessage } from 'react-intl';

export function* validateForm() {
  const password = yield select(makePasswordSelector());
  const confirmPassword = yield select(makeConfirmPasswordSelector());
  const model = {
    password: {
      value: password,
      validator: ['isNotEmpty'],
    },
    confirmPassword: {
      key: 'confirmPassword',
      value: confirmPassword,
      validator: ['isNotEmpty'],
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
  return yield put(resetPasswordAction());
}

export function* handleResetPassword() {
  const password = yield select(makePasswordSelector());
  const confirmPassword = yield select(makeConfirmPasswordSelector());
  const code = yield select(makeCodeSelector());
  const requestPayload = ApiEndpoint.makeApiPayload('PUT', {
    password,
    token: code,
    confirmPassword,
  });
  const requestURL = `${ApiEndpoint.getBasePath()}/auth/reset-password`;
  try {
    const response = yield call(request, requestURL, requestPayload);
    if (response && response.error) {
      if (typeof response.error === 'object') {
        return yield put(enterValidationErrorAction(response.error));
      }
    }
    yield put(
      enqueueSnackbarAction({
        message: <FormattedMessage {...messages.resetSuccess} />,
        type: 'success',
        autoHide: true,
      }),
    );
    return yield put(push(LOGIN_REDIRECT));
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

export default function* homePageSaga() {
  yield takeLatest(VALIDATE_FORM, validateForm);
  yield takeLatest(RESET_PASSWORD, handleResetPassword);
}
