/**
 *
 * HomePage
 *
 */

import React, { useEffect } from 'react';
import { useInjectSaga } from 'utils/injectSaga';

import saga from 'containers/DashboardPage/saga';

export default function DashboardPage() {
  useInjectSaga({ key: 'homePage', saga });

  useEffect(() => {
    // isLogged();
  }, []);

  return <div>This Is Dashboard!</div>;
}
