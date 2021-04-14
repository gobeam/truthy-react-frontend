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
    defaultMessage: 'Submit',
  },
  inputLogin: {
    id: `${scope}.inputLogin`,
    defaultMessage: 'Log in',
  },
});
