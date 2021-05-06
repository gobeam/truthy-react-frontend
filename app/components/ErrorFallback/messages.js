/*
 * ErrorFallback Messages
 *
 * This contains all the text for the ErrorFallback component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'components.ErrorFallback';

export default defineMessages({
  somethingWrong: {
    id: `${scope}.somethingWrong`,
    defaultMessage: 'Something went wrong:',
  },
  tryAgain: {
    id: `${scope}.tryAgain`,
    defaultMessage: 'Try again',
  },
});
