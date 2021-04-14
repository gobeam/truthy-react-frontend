import { call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import ApiEndpoint from 'utils/api';
import request from 'utils/request';
import AuthService from 'services/auth.service';
import {
  makeEmailSelector,
  makePasswordSelector,
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
  loginErrorAction,
} from './actions';

export function* validateForm() {
  yield put(asyncStart());
  const email = yield select(makeEmailSelector());
  const password = yield select(makePasswordSelector());
  const model = {
    email: {
      value: email,
      validator: ['isEmail', 'isNotEmpty'],
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
  const api = new ApiEndpoint();
  const auth = new AuthService();
  const email = yield select(makeEmailSelector());
  const password = yield select(makePasswordSelector());
  const requestURL = api.getLoginPath();
  const payload = api.getLoginPayload(email, password);
  const requestPayload = api.makeApiPayload('POST', null, payload);
  try {
    const response = yield call(request, requestURL, requestPayload);
    if (response.error) {
      yield put(
        enqueueSnackbarAction({
          message: 'Invalid Credential',
          type: 'error',
        }),
      );
      return yield put(loginErrorAction('Invalid Credential'));
    }
    yield put(asyncEnd());
    auth.setTokenPayload(response);
    return yield put(getProfileAction());
    // yield put(push(SUCCESS_REDIRECT));
  } catch (error) {
    yield put(loginErrorAction('Login error'));
    return yield put(
      enqueueSnackbarAction({
        message: 'Invalid Credential',
        type: 'error',
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
