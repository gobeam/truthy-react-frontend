/*
 * Forgot Password Messages
 *
 * This contains all the text for the Forgot Password container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'containers.ForgotPassword';

export default defineMessages({
  mailSent: {
    id: `${scope}.mailSent`,
    defaultMessage:
      'If your email exists in our system you will be sent a link to reset password!',
  },
  mailSentError: {
    id: `${scope}.mailSentError`,
    defaultMessage: 'Error during process!',
  },
  helmetForgotPwdTitle: {
    id: `${scope}.helmetForgotPwdTitle`,
    defaultMessage: 'Forgot Password Page',
  },
  forgotPassword: {
    id: `${scope}.forgotPassword`,
    defaultMessage: 'Forgot Password',
  },
  forgotPasswordBtn: {
    id: `${scope}.forgotPasswordBtn`,
    defaultMessage: 'Send Reset Link',
  },
  back: {
    id: `${scope}.back`,
    defaultMessage: 'Go Back',
  },
});
