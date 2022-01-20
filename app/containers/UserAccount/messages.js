/*
 * UserAccount Messages
 *
 */
import { defineMessages } from 'react-intl';

export const scope = 'containers.UserAccount';

export default defineMessages({
  helmetTitle: {
    id: `${scope}.helmetTitle`,
    defaultMessage: 'User Account Setting',
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
  loadMoreLabel: {
    id: `${scope}.loadMoreLabel`,
    defaultMessage: 'Load More',
  },
  browserDetail: {
    id: `${scope}.browserDetail`,
    defaultMessage:
      'Logged in from browser: {browser} version: {version}. Login valid till: {ts, date, ::yyyyMMdd}',
  },
  otpLabel: {
    id: `${scope}.otpLabel`,
    defaultMessage: 'Two factor Authentication',
  },
  otpDescription: {
    id: `${scope}.otpDescription`,
    defaultMessage: 'Activate or deactivate Two factor Authentication',
  },
  onLabel: {
    id: `${scope}.onLabel`,
    defaultMessage: 'on',
  },
  clear: {
    id: `${scope}.clear`,
    defaultMessage: 'Clear',
  },
  offLabel: {
    id: `${scope}.offLabel`,
    defaultMessage: 'off',
  },
  activateOtpConfirm: {
    id: `${scope}.activateOtpConfirm`,
    defaultMessage:
      'Are you sure you want to activate Two Factor Authentication?',
  },
  deactivateOtpConfirm: {
    id: `${scope}.deactivateOtpConfirm`,
    defaultMessage:
      'Are you sure you want to deactivate Two Factor Authentication?',
  },
  toggleTwoFaSuccess: {
    id: `${scope}.toggleTwoFaSuccess`,
    defaultMessage: 'Two factor authentication setting updated successfully!',
  },
  twoFaActivateCheck: {
    id: `${scope}.twoFaActivateCheck`,
    defaultMessage:
      'Two factor authentication has been enabled, please check your mail for further process to set OTP!',
  },
});
