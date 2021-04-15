/*
 * Reset Password Messages
 *
 * This contains all the text for the Reset Password container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'containers.ForgotPassword';

export default defineMessages({
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
