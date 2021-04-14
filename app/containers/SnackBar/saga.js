import { delay, put, takeLatest } from 'redux-saga/effects';
import { REMOVE_SNACKBAR } from 'containers/SnackBar/constants';
import { clearSnackbarAction } from 'containers/SnackBar/actions';

export function* dismissSnackBarAction() {
  yield delay(5000);
  yield put(clearSnackbarAction());
}

export default function* snackBarSaga() {
  yield takeLatest(REMOVE_SNACKBAR, dismissSnackBarAction);
}
