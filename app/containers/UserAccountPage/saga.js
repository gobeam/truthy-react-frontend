import { call, put, select, takeLatest } from 'redux-saga/effects';
import ApiEndpoint from 'utils/api';
import request from 'utils/request';
import { GET_USER_DETAIL } from 'containers/UserAccountPage/constants';
import { makeUserIdSelector } from 'containers/UserAccountPage/selectors';
import { changeFieldAction } from 'containers/UserAccountPage/actions';

export function* loadUserDetail() {
  const id = yield select(makeUserIdSelector());
  const requestPayload = ApiEndpoint.makeApiPayload('GET');
  const requestURL = `${ApiEndpoint.getBasePath()}/stat/${id}`;
  const response = yield call(request, requestURL, requestPayload);
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
