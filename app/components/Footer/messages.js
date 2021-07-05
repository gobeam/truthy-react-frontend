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
  copyright: {
    id: `${scope}.copyright`,
    defaultMessage: 'Copyright',
  },
  settings: {
    id: `${scope}.settings`,
    defaultMessage: 'Settings',
  },
  download: {
    id: `${scope}.download`,
    defaultMessage: 'Download',
  },
  star: {
    id: `${scope}.star`,
    defaultMessage: 'Star',
  },
  language: {
    id: `${scope}.language`,
    defaultMessage: 'Language',
  },
});
