/*
 * Reset Password Messages
 *
 * This contains all the text for the Reset Password container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'containers.ResetPassword';

export default defineMessages({
  helmetResetPasswordTitle: {
    id: `${scope}.helmetResetPasswordTitle`,
    defaultMessage: 'Reset Password Page',
  },
  resetPassword: {
    id: `${scope}.resetPassword`,
    defaultMessage: 'Reset Password',
  },
  resetSuccess: {
    id: `${scope}.resetSuccess`,
    defaultMessage: 'Password changed successful!',
  },
  resetPasswordBtn: {
    id: `${scope}.resetPasswordBtn`,
    defaultMessage: 'Reset',
  },
  back: {
    id: `${scope}.back`,
    defaultMessage: 'Go Back',
  },
});
