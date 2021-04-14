/**
 *
 * VerifyAccountPage
 *
 */

import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/UserAccountPage/saga';
import reducer from 'containers/UserAccountPage/reducer';
import { useInjectReducer } from 'utils/injectReducer';
import {
  changeFieldAction,
  getUserDetailAction,
} from 'containers/UserAccountPage/actions';
import { createStructuredSelector } from 'reselect';
import {
  makeUserIdSelector,
  makeUserInfoSelector,
} from 'containers/UserAccountPage/selectors';
import { BASE_URL } from 'utils/api';

const key = 'userAccount';

const stateSelector = createStructuredSelector({
  userInfo: makeUserInfoSelector(),
  accountId: makeUserIdSelector(),
});

export default function VerifyAccountPage() {
  const dispatch = useDispatch();
  useInjectSaga({ key, saga });
  useInjectReducer({ key, reducer });
  const { accountId, userInfo } = useSelector(stateSelector);

  const { account } = useParams();

  useEffect(() => {
    dispatch(changeFieldAction('accountId', account));
  }, [account]);

  useEffect(() => {
    if (accountId) {
      dispatch(getUserDetailAction());
    }
  }, [accountId]);
  return (
    <>
      <div className="flex">
        <div className="bg-white mt-20 pb-6 w-full justify-center items-center md:max-w-sm rounded-lg shadow-sm mx-auto">
          <div className="relative shadow mx-auto h-24 w-24 border-white rounded-full border-4">
            <img
              alt="user"
              className="object-cover w-full h-full"
              src={
                userInfo.image ? `${BASE_URL}/uploads/${userInfo.image}` : ''
              }
            />
          </div>
          <div className="mt-16">
            <h1 className="text-lg text-center font-semibold">
              {userInfo.name}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
