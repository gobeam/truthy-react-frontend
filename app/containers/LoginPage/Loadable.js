/**
 *
 * Asynchronously loads the component for LoginPage
 *
 */

import loadable from 'utils/loadable';
import LoadingIndicator from 'components/LoadingIndicator';
import React from 'react';

export default loadable(() => import('./index'), {
  fallback: <LoadingIndicator />,
});
