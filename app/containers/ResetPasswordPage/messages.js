/*
 * Reset Password Messages
 *
 * This contains all the text for the Reset Password container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'containers.ForgotPassword';

export default defineMessages({
  helmetResetPasswordTitle: {
    id: `${scope}.helmetResetPasswordTitle`,
    defaultMessage: 'Reset Password Page',
  },
  resetPassword: {
    id: `${scope}.resetPassword`,
    defaultMessage: 'Reset Password',
  },
  resetPasswordBtn: {
    id: `${scope}.forgotPasswordBtn`,
    defaultMessage: 'ResetPassword',
  },
  back: {
    id: `${scope}.back`,
    defaultMessage: 'Go Back',
  },
});
