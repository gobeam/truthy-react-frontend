/**
 *
 * HomePage
 *
 */
import React, { useEffect } from 'react';
import { useInjectSaga } from 'utils/injectSaga';

import saga from './saga';

export default function HomePage() {
  useInjectSaga({ key: 'homePage', saga });

  useEffect(() => {
    // isLogged();
  }, []);

  return <div />;
}
