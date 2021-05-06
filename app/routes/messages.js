/**
 * Common Messages
 */

import { defineMessages } from 'react-intl';

export const scope = 'routes.messages';

export default defineMessages({
  dashboard: {
    id: `${scope}.dashboard`,
    defaultMessage: `Dashboard`,
  },
  rolePage: {
    id: `${scope}.rolePage`,
    defaultMessage: `Role`,
  },
  permissionPage: {
    id: `${scope}.permissionPage`,
    defaultMessage: `Permission`,
  },
});
