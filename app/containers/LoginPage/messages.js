/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'containers.LoginPage';

export default defineMessages({
  back: {
    id: `${scope}.back`,
    defaultMessage: 'Go Back',
  },
  register: {
    id: `${scope}.register`,
    defaultMessage: 'Not registered?',
  },
  createAccount: {
    id: `${scope}.createAccount`,
    defaultMessage: 'Create account',
  },
  name: {
    id: `${scope}.name`,
    defaultMessage: 'Name',
  },
  errorLogin: {
    id: `${scope}.errorLogin`,
    defaultMessage: 'Invalid credentials',
  },
  sessionOut: {
    id: `${scope}.sessionOut`,
    defaultMessage: 'Your session has expired',
  },
  serverError: {
    id: `${scope}.serverError`,
    defaultMessage: 'Please try again in a moment!',
  },
  emailInvalid: {
    id: `${scope}.emailInvalid`,
    defaultMessage: 'Email is Invalid!',
  },
  loginToTheSystem: {
    id: `${scope}.loginToTheSystem`,
    defaultMessage: 'Log in',
  },
  loginSuccess: {
    id: `${scope}.loginSuccess`,
    defaultMessage: 'Successfully logged in!',
  },
  helmetLoginTitle: {
    id: `${scope}.HelmetLoginTitle`,
    defaultMessage: 'Login',
  },
  loginError: {
    id: `${scope}.loginError`,
    defaultMessage: 'Please enter the correct account pin',
  },
  passwordError: {
    id: `${scope}.passwordError`,
    defaultMessage: 'Please enter the correct access code',
  },
  loginEmpty: {
    id: `${scope}.loginEmpty`,
    defaultMessage: 'Please enter the account pin',
  },
  passwordEmpty: {
    id: `${scope}.passwordEmpty`,
    defaultMessage: 'Please enter the access code',
  },
  loginAttemptError: {
    id: `${scope}.loginAttemptError`,
    defaultMessage: 'Please enter the correct account pin or access code',
  },
});
