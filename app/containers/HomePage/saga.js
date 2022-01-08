import { call, put, takeLatest } from 'redux-saga/effects';
import { GET_CONTRIBUTORS } from 'containers/HomePage/constants';
import {
  asyncEndAction,
  asyncStartAction,
  setContributorAction,
} from 'containers/HomePage/actions';
// import messages from 'containers/HomePage/messages';
import { showAlert } from 'common/saga';
import axios from 'axios';

const contribUri =
  'https://gobeam.github.io/truthy-contributors/contributors.json';

async function getContrib() {
  try {
    const response = await axios.get(contribUri);
    return response;
  } catch (error) {
    return [];
  }
}

export function* handleGetContributors() {
  yield put(asyncStartAction());
  try {
    const contributors = yield call(getContrib);
    if (contributors?.data) {
      yield put(setContributorAction(contributors.data));
    }

    return yield put(asyncEndAction());
  } catch (error) {
    yield put(asyncEndAction());
    return yield showAlert('error', error.data.message);
  }
}

export default function* homePageSaga() {
  yield takeLatest(GET_CONTRIBUTORS, handleGetContributors);
}
