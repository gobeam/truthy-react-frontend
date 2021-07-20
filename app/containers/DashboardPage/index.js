/**
 *
 * HomePage
 *
 */

import React from 'react';
import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/DashboardPage/saga';

export default function DashboardPage() {
  useInjectSaga({ key: 'homePage', saga });

  return (
    <>
      <div>Dashboard</div>
    </>
  );
}
