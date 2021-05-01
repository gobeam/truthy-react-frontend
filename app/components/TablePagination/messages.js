/*
 * Table Pagination Messages
 *
 * This contains all the text for the TablePagination component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'components.TablePagination';

export default defineMessages({
  first: {
    id: `${scope}.first`,
    defaultMessage: 'First',
  },
  previous: {
    id: `${scope}.previous`,
    defaultMessage: 'Previous',
  },
  next: {
    id: `${scope}.next`,
    defaultMessage: 'Next',
  },
  last: {
    id: `${scope}.last`,
    defaultMessage: 'Last',
  },
  showing: {
    id: `${scope}.showing`,
    defaultMessage: 'Showing',
  },
  out: {
    id: `${scope}.out`,
    defaultMessage: 'out of',
  },
  entries: {
    id: `${scope}.entries`,
    defaultMessage: 'entries',
  },
});
