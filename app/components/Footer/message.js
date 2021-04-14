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
  authorMessage: {
    id: `${scope}.author.message`,
    defaultMessage: `
      Made with love by {author}.
    `,
  },
  authorNameMessage: {
    id: `${scope}.author.name`,
    defaultMessage: `Roshan Ranabhat`,
  },
});
