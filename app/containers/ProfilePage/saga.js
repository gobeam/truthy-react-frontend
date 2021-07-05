import { call, put, select, takeLatest } from 'redux-saga/effects';
import { makeLoggedInUserSelector } from 'containers/App/selectors';
import {
  changeFieldAction,
  enterValidationErrorAction,
} from 'containers/ProfilePage/actions';
import {
  LOAD_PROFILE,
  SUBMIT_PASSWORD_RESET,
  SUBMIT_PROFILE_UPDATE,
} from 'containers/ProfilePage/constants';
import ApiEndpoint from 'utils/api';
import {
  makeConfirmPasswordSelector,
  makeDobSelector,
  makeEmailSelector,
  makeNameSelector,
  makePasswordSelector,
  makeProfileImageSelector,
} from 'containers/ProfilePage/selectors';
import request from 'utils/request';
import { getProfileAction } from 'containers/App/actions';
import { PUT } from 'utils/constants';

export function* handleProfileLoad() {
  const user = yield select(makeLoggedInUserSelector());
  yield put(changeFieldAction('email', user.email));
  yield put(changeFieldAction('name', user.name));
  yield put(changeFieldAction('image', user.image));
  yield put(
    changeFieldAction('dob', user.dob ? user.dob.substring(0, 10) : ''),
  );
}

export function* handleProfileUpdate() {
  const email = yield select(makeEmailSelector());
  const name = yield select(makeNameSelector());
  const dob = yield select(makeDobSelector());
  const image = yield select(makeProfileImageSelector());
  const formData = new FormData();
  formData.append('email', email);
  formData.append('name', name);
  formData.append('dob', dob);
  if (image) {
    formData.append('image', image);
  }
  const requestUrl = `/profile`;
  const requestPayload = ApiEndpoint.makeApiPayload(
    requestUrl,
    PUT,
    formData,
    'multipart/form-data',
  );
  try {
    const response = yield call(request, requestPayload);
    if (response.error) {
      return yield put(enterValidationErrorAction(response.error));
    }
    return yield put(getProfileAction());
    // return yield put(
    //   enqueueSnackbarAction({
    //     message: 'Profile updated successfully',
    //     type: 'success',
    //   }),
    // );
    // yield put(loadProfileAction());
  } catch (error) {
    return error;
    // return yield put(
    //   enqueueSnackbarAction({
    //     message: 'Error updating profile',
    //     type: 'error',
    //   }),
    // );
  }
}

export function* handlePasswordReset() {
  const password = yield select(makePasswordSelector());
  const confirmPassword = yield select(makeConfirmPasswordSelector());
  const requestUrl = `/reset-password`;
  const requestPayload = ApiEndpoint.makeApiPayload(requestUrl, PUT, {
    password,
    confirmPassword,
  });
  try {
    const response = yield call(request, requestPayload);
    if (response.error) {
      return yield put(enterValidationErrorAction(response.error));
    }
    // yield put(
    //   enqueueSnackbarAction({
    //     message: 'Password changed successfully',
    //     type: 'success',
    //   }),
    // );
    yield put(changeFieldAction('password', ''));
    return yield put(changeFieldAction('confirmPassword', ''));
  } catch (error) {
    return false;
    // return yield put(
    //   enqueueSnackbarAction({
    //     message: 'Error updating password',
    //     type: 'error',
    //   }),
    // );
  }
}

export default function* profilePageSaga() {
  yield takeLatest(LOAD_PROFILE, handleProfileLoad);
  yield takeLatest(SUBMIT_PROFILE_UPDATE, handleProfileUpdate);
  yield takeLatest(SUBMIT_PASSWORD_RESET, handlePasswordReset);
}
