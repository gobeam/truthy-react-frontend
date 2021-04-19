import React from 'react';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  FORGOT_PASSWORD,
  VALIDATE_FORM,
} from 'containers/ForgotPassword/constants';
import { makeEmailSelector } from 'containers/ForgotPassword/selectors';
import ApiEndpoint from 'utils/api';
import request from 'utils/request';
import { enqueueSnackbarAction } from 'containers/SnackBar/actions';
import {
  enterValidationErrorAction,
  forgotPasswordAction,
} from 'containers/ForgotPassword/actions';
import { checkError } from 'helpers/Validation';
import { FormattedMessage } from 'react-intl';
import messages from 'containers/ForgotPassword/messages';

export function* validateForm() {
  const email = yield select(makeEmailSelector());
  const model = {
    email: {
      value: email,
      validator: ['isEmail', 'isNotEmpty'],
    },
  };

  const err = checkError(model);
  if (Object.keys(err).length > 0) {
    return yield put(enterValidationErrorAction(err));
  }
  return yield put(forgotPasswordAction());
}

export function* handleForgotPassword() {
  const email = yield select(makeEmailSelector());
  const api = new ApiEndpoint();
  const requestPayload = api.makeApiPayload('put', null, { email });
  const requestURL = `${api.getBasePath()}/auth/forgot-password`;
  try {
    yield call(request, requestURL, requestPayload);
    return yield put(
      enqueueSnackbarAction({
        message: <FormattedMessage {...messages.mailSent} />,
        type: 'success',
        autoHide: true,
      }),
    );
  } catch (e) {
    return yield put(
      enqueueSnackbarAction({
        message: <FormattedMessage {...messages.mailSentError} />,
        type: 'danger',
        autoHide: true,
      }),
    );
  }
}

export default function* homePageSaga() {
  yield takeLatest(VALIDATE_FORM, validateForm);
  yield takeLatest(FORGOT_PASSWORD, handleForgotPassword);
}
