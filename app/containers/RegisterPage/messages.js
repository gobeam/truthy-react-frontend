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
  register: {
    id: `${scope}.register`,
    defaultMessage: 'Register',
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
    id: `${scope}.loginHere`,
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
  email: {
    id: `${scope}.email`,
    defaultMessage: 'Email/Username',
  },
  emailPlaceHolder: {
    id: `${scope}.emailPlaceHolder`,
    defaultMessage: 'user@tryuthy.com',
  },
  confirmPassword: {
    id: `${scope}.confirmPassword`,
    defaultMessage: 'Confirm Password',
  },
  passwordPlaceHolder: {
    id: `${scope}.passwordPlaceHolder`,
    defaultMessage: 'Password',
  },
  emailRequired: {
    id: `${scope}.emailRequired`,
    defaultMessage: 'Please input your email!',
  },
  validEmailRequired: {
    id: `${scope}.validEmailRequired`,
    defaultMessage: 'Invalid email!',
  },
  passwordRequired: {
    id: `${scope}.passwordRequired`,
    defaultMessage: 'Please input your password!',
  },
  usernameRequired: {
    id: `${scope}.usernameRequired`,
    defaultMessage: 'Please input your username!',
  },
  nameRequired: {
    id: `${scope}.nameRequired`,
    defaultMessage: 'Please input your name!',
  },
  confirmPasswordRequired: {
    id: `${scope}.confirmPasswordRequired`,
    defaultMessage: 'Please confirm your password!',
  },
  acceptTerm: {
    id: `${scope}.acceptTerm`,
    defaultMessage: 'Should accept terms and condition!',
  },
  readTerm: {
    id: `${scope}.readTerm`,
    defaultMessage: 'I have read the {TermsAndConditionsLink}',
  },
  termsAndConditions: {
    id: `${scope}.termsAndConditions`,
    defaultMessage: 'Terms and conditions',
  },
  confirmPasswordMatchError: {
    id: `${scope}.confirmPasswordMatchError`,
    defaultMessage: 'Confirm password does not match your password!',
  },
});
