import {
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
import messages from 'containers/RegisterPage/messages';
import commonMessages from 'common/messages';
import { showFormattedErrorMessage } from 'common/saga';

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
      validator: ['isLowerCase', 'isEmail', 'isNotEmpty'],
    },
    name: {
      value: name,
      validator: ['isString', 'isNotEmpty'],
    },
    password: {
      value: password,
      validator: ['isStrongPassword', 'isNotEmpty'],
    },
    username: {
      value: username,
      validator: ['isLowerCase', 'isString', 'isNotEmpty'],
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
  const email = yield select(makeEmailSelector());
  const username = yield select(makeUsernameSelector());
  const password = yield select(makePasswordSelector());
  const name = yield select(makeNameSelector());
  const requestURL = ApiEndpoint.getRegisterPath();
  const requestPayload = ApiEndpoint.makeApiPayload('POST', {
    name,
    username,
    email,
    password,
  });

  try {
    const response = yield call(request, requestURL, requestPayload);
    if (response && response.error) {
      return yield put(enterValidationErrorAction(response.error));
    }
    yield put(asyncEnd());
    yield showFormattedErrorMessage('success', messages.registerSuccess);
    return yield put(push('/login'));
  } catch (error) {
    yield put(asyncEnd());
    yield put(registerErrorAction('There was some error'));
    const errLabel = error.response
      ? error.response.statusText.toLowerCase()
      : '';
    const errorMessage = commonMessages[errLabel]
      ? commonMessages[errLabel]
      : commonMessages.serverError;
    return yield showFormattedErrorMessage('danger', errorMessage);
  }
}

export default function* registerPageSaga() {
  yield takeLatest(VALIDATE_FORM, validateForm);
  yield takeLatest(REGISTER_PROCESS, handleRegister);
}
