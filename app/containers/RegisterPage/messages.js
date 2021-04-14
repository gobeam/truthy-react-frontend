/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'containers.LoginPage';

export default defineMessages({
  helmetRegisterTitle: {
    id: `${scope}.helmetRegisterTitle`,
    defaultMessage: 'Register - Template',
  },
  registerAttemptError: {
    id: `${scope}.registerAttemptError`,
    defaultMessage: 'There was some error',
  },
  registerSuccess: {
    id: `${scope}.registerSuccess`,
    defaultMessage: 'Successfully Registered',
  },
});
