/*
 * RegisterPage Messages
 *
 * This contains all the text for the RegisterPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'containers.Profile';

export default defineMessages({
  helmetTitle: {
    id: `${scope}.helmetTitle`,
    defaultMessage: 'Profile - Page',
  },
  pageHeader: {
    id: `${scope}.pageHeader`,
    defaultMessage: 'Profile',
  },
  na: {
    id: `${scope}.na`,
    defaultMessage: 'Not Available',
  },
  editProfileLabel: {
    id: `${scope}.editProfileLabel`,
    defaultMessage: 'Edit Profile',
  },
});
