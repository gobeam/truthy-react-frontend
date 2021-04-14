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
  enterValidationErrorAction,
  resetPasswordAction,
} from 'containers/ResetPasswordPage/actions';
import { checkError } from 'helpers/Validation';
import { push } from 'connected-react-router';
import { LOGIN_REDIRECT } from 'containers/LoginPage/constants';

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
        confirmPassword: "Confirm password didn't match with password",
      }),
    );
  }
  return yield put(resetPasswordAction());
}

export function* handleResetPassword() {
  const password = yield select(makePasswordSelector());
  const code = yield select(makeCodeSelector());
  const api = new ApiEndpoint();
  const requestPayload = api.makeApiPayload('PUT', null, { password });
  const requestURL = `${api.getBasePath()}/reset/${code}`;
  try {
    const response = yield call(request, requestURL, requestPayload);
    if (response.error) {
      if (typeof response.error === 'object') {
        return yield put(enterValidationErrorAction(response.error));
      }
      return yield put(
        enqueueSnackbarAction({
          message: response.error,
          type: 'error',
        }),
      );
    }
    yield put(
      enqueueSnackbarAction({
        message: 'Password reset successful',
        type: 'success',
      }),
    );
    return yield put(push(LOGIN_REDIRECT));
  } catch (e) {
    return yield put(
      enqueueSnackbarAction({
        message: 'Error resetting password',
        type: 'error',
      }),
    );
  }
}

export default function* homePageSaga() {
  yield takeLatest(VALIDATE_FORM, validateForm);
  yield takeLatest(RESET_PASSWORD, handleResetPassword);
}
