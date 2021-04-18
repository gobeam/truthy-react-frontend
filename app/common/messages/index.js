/**
 * Common Messages
 */

import { defineMessages } from 'react-intl';

export const scope = 'common.messages';

export default defineMessages({
  success: {
    id: `${scope}.success`,
    defaultMessage: `Success`,
  },
  unauthorized: {
    id: `${scope}.unauthorized`,
    defaultMessage: `Invalid credentials`,
  },
  forbidden: {
    id: `${scope}.forbidden`,
    defaultMessage: `You don't have access for this action, please contact admin for further details.`,
  },
  danger: {
    id: `${scope}.danger`,
    defaultMessage: `Error`,
  },
  warning: {
    id: `${scope}.warning`,
    defaultMessage: `Warning`,
  },
  info: {
    id: `${scope}.info`,
    defaultMessage: `Info`,
  },
  primary: {
    id: `${scope}.primary`,
    defaultMessage: `Message`,
  },
});
