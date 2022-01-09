/*
 * EmailTemplate Messages
 *
 */
import { defineMessages } from 'react-intl';

export const scope = 'containers.EmailTemplate';

export default defineMessages({
  helmetTitle: {
    id: `${scope}.helmetTitle`,
    defaultMessage: 'Email Templates',
  },
  editTitle: {
    id: `${scope}.editTitle`,
    defaultMessage: 'Edit Email Template',
  },
  addTitle: {
    id: `${scope}.addTitle`,
    defaultMessage: 'Add Email Template',
  },
  titleLabel: {
    id: `${scope}.titleLabel`,
    defaultMessage: 'Title',
  },
  titlePlaceHolder: {
    id: `${scope}.titlePlaceHolder`,
    defaultMessage: 'Input title',
  },
  bodyLabel: {
    id: `${scope}.bodyLabel`,
    defaultMessage: 'Body',
  },
  bodyPlaceHolder: {
    id: `${scope}.bodyPlaceHolder`,
    defaultMessage: 'Input body',
  },
  subjectLabel: {
    id: `${scope}.subjectLabel`,
    defaultMessage: 'Subject',
  },
  subjectPlaceHolder: {
    id: `${scope}.subjectPlaceHolder`,
    defaultMessage: 'Input subject',
  },
  senderLabel: {
    id: `${scope}.senderLabel`,
    defaultMessage: 'Sender',
  },
  senderPlaceHolder: {
    id: `${scope}.senderPlaceHolder`,
    defaultMessage: 'Input sender email',
  },
  dateLabel: {
    id: `${scope}.dateLabel`,
    defaultMessage: 'Created At',
  },
  slugLabel: {
    id: `${scope}.slugLabel`,
    defaultMessage: 'Slug',
  },
  addLabel: {
    id: `${scope}.addLabel`,
    defaultMessage: 'Add New',
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
    defaultMessage: 'Email Template',
  },
  dashboardTitle: {
    id: `${scope}.dashboardTitle`,
    defaultMessage: 'Dashboard',
  },
  cancelBtn: {
    id: `${scope}.cancelBtn`,
    defaultMessage: 'Cancel',
  },
});
