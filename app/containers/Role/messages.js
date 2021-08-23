/*
 * Role Messages
 *
 */
import { defineMessages } from 'react-intl';

export const scope = 'containers.Role';

export default defineMessages({
  helmetTitle: {
    id: `${scope}.helmetTitle`,
    defaultMessage: 'Role',
  },
  editTitle: {
    id: `${scope}.editTitle`,
    defaultMessage: 'Edit Role',
  },
  addTitle: {
    id: `${scope}.addTitle`,
    defaultMessage: 'Add Role',
  },
  nameLabel: {
    id: `${scope}.nameLabel`,
    defaultMessage: 'Name',
  },
  namePlaceHolder: {
    id: `${scope}.namePlaceHolder`,
    defaultMessage: 'Input role name',
  },
  descriptionPlaceHolder: {
    id: `${scope}.descriptionPlaceHolder`,
    defaultMessage: 'Input description',
  },
  descriptionRequired: {
    id: `${scope}.descriptionRequired`,
    defaultMessage: 'The description should not be empty!',
  },
  nameRequired: {
    id: `${scope}.nameRequired`,
    defaultMessage: 'Role name should not be empty!',
  },
  dateLabel: {
    id: `${scope}.dateLabel`,
    defaultMessage: 'Created At',
  },
  addLabel: {
    id: `${scope}.addLabel`,
    defaultMessage: 'Add New',
  },
  descriptionLabel: {
    id: `${scope}.descriptionLabel`,
    defaultMessage: 'Description',
  },
  permissionLabel: {
    id: `${scope}.permissionLabel`,
    defaultMessage: 'Permission',
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
    defaultMessage: 'Roles',
  },
  dashboardTitle: {
    id: `${scope}.dashboardTitle`,
    defaultMessage: 'Dashboard',
  },
});
