/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'components.Header';

export default defineMessages({
  home: {
    id: `${scope}.home`,
    defaultMessage: 'Home',
  },
  features: {
    id: `${scope}.features`,
    defaultMessage: 'Features',
  },
  dashboard: {
    id: `${scope}.dashboard`,
    defaultMessage: 'Dashboard',
  },
  about: {
    id: `${scope}.about`,
    defaultMessage: 'About',
  },
  login: {
    id: `${scope}.login`,
    defaultMessage: 'Login',
  },
  register: {
    id: `${scope}.register`,
    defaultMessage: 'Register',
  },
});
