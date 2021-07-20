import { delay, put, takeLatest } from 'redux-saga/effects';
import { AUTO_DISMISS_ALERT } from 'containers/AlertMessage/constants';
import { clearAlertAction } from 'containers/AlertMessage/actions';

export function* dismissAlertAction() {
  yield delay(5000);
  yield put(clearAlertAction());
}

export default function* snackBarSaga() {
  yield takeLatest(AUTO_DISMISS_ALERT, dismissAlertAction);
}
