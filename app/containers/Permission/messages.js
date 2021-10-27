/*
 * Permission Messages
 *
 */
import { defineMessages } from 'react-intl';

export const scope = 'containers.Permission';

export default defineMessages({
  helmetTitle: {
    id: `${scope}.helmetTitle`,
    defaultMessage: 'Permission',
  },
  editTitle: {
    id: `${scope}.editTitle`,
    defaultMessage: 'Edit Permission',
  },
  addTitle: {
    id: `${scope}.addTitle`,
    defaultMessage: 'Add Permission',
  },
  resourceLabel: {
    id: `${scope}.resourceLabel`,
    defaultMessage: 'Resource',
  },
  resourcePlaceHolder: {
    id: `${scope}.resourcePlaceHolder`,
    defaultMessage: 'Input resource name',
  },
  descriptionLabel: {
    id: `${scope}.descriptionLabel`,
    defaultMessage: 'Description',
  },
  descriptionPlaceHolder: {
    id: `${scope}.descriptionPlaceHolder`,
    defaultMessage: 'Input description',
  },
  pathLabel: {
    id: `${scope}.pathLabel`,
    defaultMessage: 'Path',
  },
  pathPlaceHolder: {
    id: `${scope}.pathPlaceHolder`,
    defaultMessage: 'Input path name',
  },
  methodLabel: {
    id: `${scope}.methodLabel`,
    defaultMessage: 'Method',
  },
  methodPlaceHolder: {
    id: `${scope}.methodPlaceHolder`,
    defaultMessage: 'Input method name',
  },
  dateLabel: {
    id: `${scope}.dateLabel`,
    defaultMessage: 'Created At',
  },
  addLabel: {
    id: `${scope}.addLabel`,
    defaultMessage: 'Add New',
  },
  syncLabel: {
    id: `${scope}.syncLabel`,
    defaultMessage: 'Sync Permissions',
  },
  actionLabel: {
    id: `${scope}.actionLabel`,
    defaultMessage: 'Action',
  },
  createdAt: {
    id: `${scope}.createdAt`,
    defaultMessage: '{ts, date, ::yyyyMMdd}',
  },
  listTitle: {
    id: `${scope}.listTitle`,
    defaultMessage: 'Permissions',
  },
  syncConfirm: {
    id: `${scope}.syncConfirm`,
    defaultMessage: 'Sync Permission Confirmation',
  },
  syncConfirmationMessage: {
    id: `${scope}.syncConfirmationMessage`,
    defaultMessage:
      'Are you sure you want to sync permission from config file?',
  },
  syncOk: {
    id: `${scope}.syncOk`,
    defaultMessage: 'Synchronise',
  },
  cancelBtn: {
    id: `${scope}.cancelBtn`,
    defaultMessage: 'Cancel',
  },
  resourceRequired: {
    id: `${scope}.resourceRequired`,
    defaultMessage: 'Resource name should not be empty!',
  },
  descriptionRequired: {
    id: `${scope}.descriptionRequired`,
    defaultMessage: 'Description should not be empty!',
  },
  methodRequired: {
    id: `${scope}.methodRequired`,
    defaultMessage: 'Cancel',
  },
  pathRequired: {
    id: `${scope}.pathRequired`,
    defaultMessage: 'Cancel',
  },
  dashboardTitle: {
    id: `${scope}.dashboardTitle`,
    defaultMessage: 'Dashboard',
  },
});
