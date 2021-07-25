/*
 * UserAccountPage Messages
 *
 */
import { defineMessages } from 'react-intl';

export const scope = 'containers.UserAccountPage';

export default defineMessages({
  helmetTitle: {
    id: `${scope}.helmetTitle`,
    defaultMessage: 'Role',
  },
  contact: {
    id: `${scope}.contact`,
    defaultMessage: 'Contact',
  },
  contactPlaceholder: {
    id: `${scope}.contactPlaceholder`,
    defaultMessage: 'Input your contact address',
  },
  address: {
    id: `${scope}.address`,
    defaultMessage: 'Address',
  },
  addressPlaceholder: {
    id: `${scope}.addressPlaceholder`,
    defaultMessage: 'Input your address',
  },
  avatarLabel: {
    id: `${scope}.avatarLabel`,
    defaultMessage: 'Avatar',
  },
  editProfile: {
    id: `${scope}.editProfile`,
    defaultMessage: 'Edit Profile',
  },
  accountTab: {
    id: `${scope}.accountTab`,
    defaultMessage: 'Account Setting',
  },
  securityTab: {
    id: `${scope}.securityTab`,
    defaultMessage: 'Security Setting',
  },
  accountPassword: {
    id: `${scope}.accountPassword`,
    defaultMessage: 'Account Password',
  },
  accountPasswordDescription: {
    id: `${scope}.accountPasswordDescription`,
    defaultMessage: 'Change current password',
  },
  changeLabel: {
    id: `${scope}.changeLabel`,
    defaultMessage: 'Change',
  },
  oldPasswordLabel: {
    id: `${scope}.oldPasswordLabel`,
    defaultMessage: 'Old Password',
  },
  oldPasswordRequired: {
    id: `${scope}.oldPasswordRequired`,
    defaultMessage: 'Old Password must be provided!',
  },
  passwordChangeSuccess: {
    id: `${scope}.passwordChangeSuccess`,
    defaultMessage: 'Password changed successfully!',
  },
  profileUpdateSuccess: {
    id: `${scope}.profileUpdateSuccess`,
    defaultMessage: 'Profile updated successfully!',
  },
  loginActivity: {
    id: `${scope}.loginActivity`,
    defaultMessage: 'Login Activity',
  },
  clearToken: {
    id: `${scope}.clearToken`,
    defaultMessage: 'Are you sure you want remove session?',
  },
  sessionClearSuccess: {
    id: `${scope}.sessionClearSuccess`,
    defaultMessage: 'Session cleared successfully!',
  },
  osDetail: {
    id: `${scope}.osDetail`,
    defaultMessage: 'Operating System name: {os}, Version: {version}',
  },
  browserDetail: {
    id: `${scope}.browserDetail`,
    defaultMessage:
      'Logged in from browser: {browser} version: {version}. Login valid till: {ts, date, ::yyyyMMdd}',
  },
});
