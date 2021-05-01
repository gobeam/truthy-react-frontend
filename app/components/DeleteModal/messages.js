/*
 * Delete Modal Messages
 *
 * This contains all the text for the Delete Modal component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'components.DeleteModal';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Delete Confirmation',
  },
  confirmationMessage: {
    id: `${scope}.confirmationMessage`,
    defaultMessage: 'Are you sure you want to delete?',
  },
  deleteBtn: {
    id: `${scope}.deleteBtn`,
    defaultMessage: 'Delete',
  },
  cancelBtn: {
    id: `${scope}.cancelBtn`,
    defaultMessage: 'Cancel',
  },
  deleteSuccess: {
    id: `${scope}.deleteSuccess`,
    defaultMessage: 'Data deleted successfully!',
  },
  deleteError: {
    id: `${scope}.deleteError`,
    defaultMessage: 'Could not delete data, try again later!',
  },
});
