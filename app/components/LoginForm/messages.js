/*
 * LoginForm Messages
 *
 * This contains all the text for the LoginForm component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'components.LoginForm';

export default defineMessages({
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
  register: {
    id: `${scope}.register`,
    defaultMessage: 'register now!',
  },
});
