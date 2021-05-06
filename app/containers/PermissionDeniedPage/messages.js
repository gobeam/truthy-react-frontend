/*
 * PermissionDeniedPage Messages
 *
 */
import { defineMessages } from 'react-intl';

export const scope = 'containers.PermissionDeniedPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Permission Denied',
  },
  back: {
    id: `${scope}.back`,
    defaultMessage: 'Go Back Home',
  },
  message: {
    id: `${scope}.message`,
    defaultMessage: "Oops! You don't have permission to visit this page.",
  },
});
