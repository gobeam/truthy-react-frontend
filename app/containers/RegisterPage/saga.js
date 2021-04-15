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
        confirm_password: "Confirm password didn't match with password",
      }),
    );
  }
  return yield put(enterRegisterAction());
}

export function* handleRegister() {
  const api = new ApiEndpoint();
  const email = yield select(makeEmailSelector());
  const password = yield select(makePasswordSelector());
  const confirmPassword = yield select(makeConfirmPasswordSelector());
  const name = yield select(makeNameSelector());
  const requestURL = api.getRegisterPath();
  const requestPayload = api.makeApiPayload('POST', null, {
    email,
    password,
    name,
    confirmPassword,
  });

  try {
    const response = yield call(request, requestURL, requestPayload);
    if (response.error) {
      if (typeof response.error === 'object') {
        return yield put(enterValidationErrorAction(response.error));
      }
      yield put(
        enqueueSnackbarAction({
          message: 'There was some error',
          type: 'error',
        }),
      );
      return yield put(registerErrorAction('There was some error'));
    }
    yield put(asyncEnd());
    yield put(
      enqueueSnackbarAction({
        message: 'Please check your email to activate your account!',
        type: 'success',
      }),
    );
    return yield put(push('/login'));
  } catch (e) {
    return yield put(registerErrorAction('There was some error'));
  }
}

export function* handleLogged() {
  const isLogged = yield select(makeIsLoggedSelector());
  if (isLogged) {
    yield put(push(SUCCESS_REDIRECT));
  }
  return true;
  // const auth = new AuthService();
  // const isTokenAvailable = auth.checkToken();
  // if (isTokenAvailable) return yield put(push(SUCCESS_REDIRECT));
}

export default function* registerPageSaga() {
  yield takeLatest(VALIDATE_FORM, validateForm);
  yield takeLatest(REGISTER_PROCESS, handleRegister);
  yield takeLatest(ENTER_LOGIN, handleLogged);
}
