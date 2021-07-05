/*
 * Header Messages
 *
 * This contains all the text for the Header component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'components.Header';

export default defineMessages({
  profile: {
    id: `${scope}.profile`,
    defaultMessage: 'My Profile',
  },
  setting: {
    id: `${scope}.setting`,
    defaultMessage: 'Settings',
  },
  logout: {
    id: `${scope}.logout`,
    defaultMessage: 'Logout',
  },

  login: {
    id: `${scope}.login`,
    defaultMessage: 'Login',
  },
});
