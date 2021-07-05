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
  emailRequired: {
    id: `${scope}.emailRequired`,
    defaultMessage: 'Please input your email!',
  },
  validEmailRequired: {
    id: `${scope}.validEmailRequired`,
    defaultMessage: 'Please input your email!',
  },
  passwordRequired: {
    id: `${scope}.passwordRequired`,
    defaultMessage: 'Please input your password!',
  },
  register: {
    id: `${scope}.register`,
    defaultMessage: 'register now!',
  },
});
