/*
 * RoleModule Messages
 *
 */
import { defineMessages } from 'react-intl';

export const scope = 'containers.RoleModule';

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
});
