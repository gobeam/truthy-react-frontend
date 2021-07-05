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
  confirmPassword: {
    id: `${scope}.confirmPassword`,
    defaultMessage: 'Confirm Password',
  },
  passwordPlaceHolder: {
    id: `${scope}.passwordPlaceHolder`,
    defaultMessage: 'Password',
  },
  passwordRequired: {
    id: `${scope}.passwordRequired`,
    defaultMessage: 'Please input your password!',
  },
  confirmPasswordRequired: {
    id: `${scope}.confirmPasswordRequired`,
    defaultMessage: 'Please confirm your password!',
  },
  confirmPasswordMatchError: {
    id: `${scope}.confirmPasswordMatchError`,
    defaultMessage: 'Confirm password does not match your password!',
  },
});
