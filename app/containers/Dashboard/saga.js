import {
  asyncEndAction,
  asyncStartAction,
  setDeviceChartAction,
  setUserStatsAction,
} from 'containers/Dashboard/actions';
import {
  BROWSER,
  QUERY_DEVICE_STATS,
  QUERY_USER_STATS,
} from 'containers/Dashboard/constants';
import { makeDeviceTypeSelector } from 'containers/Dashboard/selectors';
import { call, put, select, takeLatest } from 'redux-saga/effects';
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

export function* handleQueryDeviceStats() {
  yield put(asyncStartAction());
  const deviceType = yield select(makeDeviceTypeSelector());
  const requestUrl = `/dashboard/${deviceType === BROWSER ? 'browser' : 'os'}`;
  const payload = ApiEndpoint.makeApiPayload(requestUrl, GET);
  try {
    const response = yield call(request, payload);
    return yield put(setDeviceChartAction(response));
  } catch (error) {
    return yield put(asyncEndAction());
  }
}

export default function* DashboardSaga() {
  yield takeLatest(QUERY_USER_STATS, handleQueryUserStats);
  yield takeLatest(QUERY_DEVICE_STATS, handleQueryDeviceStats);
}
