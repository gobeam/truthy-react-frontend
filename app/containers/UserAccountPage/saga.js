import { call, put, select, takeLatest } from 'redux-saga/effects';
import ApiEndpoint from 'utils/api';
import request from 'utils/request';
import { GET_USER_DETAIL } from 'containers/UserAccountPage/constants';
import { makeUserIdSelector } from 'containers/UserAccountPage/selectors';
import { changeFieldAction } from 'containers/UserAccountPage/actions';
import { GET } from 'utils/constants';

export function* loadUserDetail() {
  const id = yield select(makeUserIdSelector());
  const requestUrl = `/stat/${id}`;
  const requestPayload = ApiEndpoint.makeApiPayload(requestUrl, GET);
  const response = yield call(request, requestPayload);
  // console.log(response && response.length > 0 ? response[0] : {})
  yield put(
    changeFieldAction(
      'userInfo',
      response && response.length > 0 ? response[0] : {},
    ),
  );
}

export default function* homePageSaga() {
  yield takeLatest(GET_USER_DETAIL, loadUserDetail);
}
