/*
 * LoginForm Messages
 *
 * This contains all the text for the LoginForm component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'components.LoginForm';

export default defineMessages({
  email: {
    id: `${scope}.email`,
    defaultMessage: 'Email',
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
  name: {
    id: `${scope}.name`,
    defaultMessage: 'Name',
  },
  password: {
    id: `${scope}.password`,
    defaultMessage: 'Password',
  },
  submit: {
    id: `${scope}.submit`,
    defaultMessage: 'Sign in',
  },
  lostPassword: {
    id: `${scope}.lostPassword`,
    defaultMessage: 'Lost password?',
  },
  inputLogin: {
    id: `${scope}.inputLogin`,
    defaultMessage: 'Log in',
  },
});
