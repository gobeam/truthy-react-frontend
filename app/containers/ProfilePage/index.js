/**
 *
 * ProfilePage
 *
 */

import React from 'react';
import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/ProfilePage/saga';
import reducer from 'containers/ProfilePage/reducer';
import { useInjectReducer } from 'utils/injectReducer';
import ViewProfile from 'containers/ProfilePage/viewProfile';

const key = 'profilePage';

export default function ProfilePage() {
  useInjectSaga({ key, saga });
  useInjectReducer({ key, reducer });

  return <ViewProfile />;
}
