/*
 * RegisterPage Messages
 *
 * This contains all the text for the RegisterPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'containers.RegisterPage';

export default defineMessages({
  back: {
    id: `${scope}.back`,
    defaultMessage: 'Go Back',
  },
  internalError: {
    id: `${scope}.internalError`,
    defaultMessage:
      'There was some error during process, please try again later',
  },
  helmetRegisterTitle: {
    id: `${scope}.helmetRegisterTitle`,
    defaultMessage: 'Registration - Page',
  },
  createAccount: {
    id: `${scope}.createAccount`,
    defaultMessage: 'Create an account',
  },
  loginHere: {
    id: `${scope}.createAccount`,
    defaultMessage: 'Login here',
  },
  alreadyAccount: {
    id: `${scope}.alreadyAccount`,
    defaultMessage: 'Already have an account?',
  },
  name: {
    id: `${scope}.name`,
    defaultMessage: 'Name',
  },
  username: {
    id: `${scope}.username`,
    defaultMessage: 'Username',
  },
  agreeTo: {
    id: `${scope}.agreeTo`,
    defaultMessage: 'I agree to the',
  },
  agreeLinkText: {
    id: `${scope}.agreeLinkText`,
    defaultMessage: 'terms and conditions',
  },
  registerAttemptError: {
    id: `${scope}.registerAttemptError`,
    defaultMessage: 'There was some error',
  },
  registerSuccess: {
    id: `${scope}.registerSuccess`,
    defaultMessage:
      'Successfully registered, please check your email to activate your account!',
  },
  signBtn: {
    id: `${scope}.signBtn`,
    defaultMessage: 'Sign up',
  },
});
