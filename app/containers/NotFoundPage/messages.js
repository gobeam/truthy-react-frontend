/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'containers.NotFoundPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Page not found.',
  },
  back: {
    id: `${scope}.back`,
    defaultMessage: 'Go Back Home',
  },
  message: {
    id: `${scope}.message`,
    defaultMessage:
      'Oops! Looks like you followed a bad link. If you think this is a problem with us, please tell us.',
  },
});
