/*
 * Dashboard Messages
 *
 * This contains all the text for the LoginPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'containers.Dashboard';

export default defineMessages({
  totalUser: {
    id: `${scope}.totalUser`,
    defaultMessage:
      'Total {count, plural, =0 {user} one { user} other { users}}',
  },
  activeUser: {
    id: `${scope}.activeUser`,
    defaultMessage:
      'Active {count, plural, =0 {user} one { user} other { users}}',
  },
  inActiveUser: {
    id: `${scope}.inActiveUser`,
    defaultMessage:
      'In-active {count, plural, =0 {user} one { user} other { users}}',
  },
  deviceChart: {
    id: `${scope}.deviceChart`,
    defaultMessage: 'Devices',
  },
});
