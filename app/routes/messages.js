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
  emailTemplatePage: {
    id: `${scope}.emailTemplatePage`,
    defaultMessage: `Email Template`,
  },
  userPage: {
    id: `${scope}.userPage`,
    defaultMessage: `User Management`,
  },
  permissionPage: {
    id: `${scope}.permissionPage`,
    defaultMessage: `Permission`,
  },

  settingPage: {
    id: `${scope}.settingPage`,
    defaultMessage: `Settings`,
  },
});
