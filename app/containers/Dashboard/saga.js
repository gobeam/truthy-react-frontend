import {
  asyncEndAction,
  asyncStartAction,
  setUserStatsAction,
} from 'containers/Dashboard/actions';
import { QUERY_USER_STATS } from 'containers/Dashboard/constants';
import { call, put, takeLatest } from 'redux-saga/effects';
import ApiEndpoint from 'utils/api';
import { GET } from 'utils/constants';
import request from 'utils/request';

export function* handleQueryUserStats() {
  yield put(asyncStartAction());
  const requestUrl = '/dashboard/users';
  const payload = ApiEndpoint.makeApiPayload(requestUrl, GET);
  try {
    const response = yield call(request, payload);
    return yield put(setUserStatsAction(response));
  } catch (error) {
    return yield put(asyncEndAction());
  }
}

export default function* DashboardSaga() {
  yield takeLatest(QUERY_USER_STATS, handleQueryUserStats);
}
