import { delay, put, takeLatest } from 'redux-saga/effects';
import { AUTO_DISMISS_SNACK } from 'containers/SnackMessage/constants';
import { clearSnackMessageAction } from 'containers/SnackMessage/actions';

export function* dismissSnackMessageAction() {
  yield delay(5000);
  yield put(clearSnackMessageAction());
}

export default function* snackBarSaga() {
  yield takeLatest(AUTO_DISMISS_SNACK, dismissSnackMessageAction);
}
