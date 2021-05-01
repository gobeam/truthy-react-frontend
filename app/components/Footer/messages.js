/*
 * Footer Messages
 *
 * This contains all the text for the Footer component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'components.Footer';

export default defineMessages({
  licenseMessage: {
    id: `${scope}.license.message`,
    defaultMessage: 'This project is licensed under the MIT license.',
  },
  appName: {
    id: `${scope}.appName`,
    defaultMessage: 'Truthy',
  },
  language: {
    id: `${scope}.language`,
    defaultMessage: 'Language',
  },
  themeMadeBy: {
    id: `${scope}.themeMadeBy`,
    defaultMessage: `
      Theme made by {author}.
    `,
  },
});
